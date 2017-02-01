// -*- Mode: Go; indent-tabs-mode: t -*-

/*
 * Copyright (C) 2017-2018 Canonical Ltd
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

package service

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"net/url"
	"path"
	"strings"

	"github.com/gorilla/mux"
	"github.com/nicksnyder/go-i18n/i18n"

	"gopkg.in/pipe.v2"
)

// VersionResponse is the JSON response from the API Version method
type VersionResponse struct {
	Version string `json:"version"`
}

// StatesResponse is the JSON response from the API State method
type StatesResponse struct {
	Success bool          `json:"success"`
	Code    string        `json:"code"`
	Message string        `json:"message"`
	States  []ActiveState `json:"states"`
}

// VersionHandler is the API method to return the version of the service
func VersionHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)

	response := VersionResponse{Version: Environ.Config.Version}

	// Encode the response as JSON
	if err := json.NewEncoder(w).Encode(response); err != nil {
		message := fmt.Sprintf("Error encoding the version response: %v", err)
		logMessage("VERSION", "get-version", message)
	}
}

// IndexHandler is the front page of the web application
func IndexHandler(w http.ResponseWriter, r *http.Request) {
	page := Page{Title: Environ.Config.Title, Logo: Environ.Config.Logo}

	path := []string{Environ.Config.DocRootAdmin, indexTemplate}
	t, err := template.ParseFiles(strings.Join(path, ""))
	if err != nil {
		log.Printf("Error loading the application template: %v\n", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	err = t.Execute(w, page)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

// StatesHandler returns the active state of the SMB services
func StatesHandler(w http.ResponseWriter, r *http.Request) {

	T, _ := i18n.Tfunc("en-US")
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	states := []ActiveState{}

	// Find the active state of each of the services
	for index, srv := range serviceKeys {

		// This would be the best option, but we don't have permissions to use systemctl
		//out, err := exec.Command("systemctl", "show", "-p", "ActiveState", serviceNames[index]).Output()

		// Use 'ps' and 'grep' to find if the service is running
		p := pipe.Line(
			pipe.Exec("ps", "-eo", "tty,comm"),
			pipe.Exec("grep", serviceNames[index]),
		)

		output, err := pipe.CombinedOutput(p)
		if err != nil {
			log.Printf("Service '%s' is not running: %v\n", serviceNames[index], err)
		}

		// Determine the running state of the service
		var currentState = T("not_running")
		if len(string(output)) > 0 {
			currentState = T("running")
		}

		state := ActiveState{ID: srv, Name: T(srv), Description: T(srv + "_desc"), State: currentState, Configure: serviceConfigure[index]}
		states = append(states, state)
	}

	response := StatesResponse{Success: true, States: states}
	// Encode the response as JSON
	if err := json.NewEncoder(w).Encode(response); err != nil {
		log.Println("Error forming the states response.")
	}
}

// DetailsHandler uses the snapd REST API to retrieve the details of an installed service
func DetailsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	T, _ := i18n.Tfunc("en-US")

	// Get the service name and build the snapd REST API URL
	const serviceDetailsURL = "/v2/snaps/"
	vars := mux.Vars(r)
	urlPrl := path.Join(serviceDetailsURL, vars["name"])

	baseURL := url.URL{Scheme: "http", Host: "localhost", Path: urlPrl}

	tr := &http.Transport{
		Dial: snapdDialer,
	}
	client := &http.Client{Transport: tr}

	resp, err := client.Get(baseURL.String())
	if err != nil {
		logMessage("details", "snapd-url", err.Error())
		response := ErrorResponse{Type: "error", Status: "Internal Error", StatusCode: 404, Result: T("application_error")}
		// Encode the response as JSON
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Println("Error forming the error response.")
		}
		return
	}
	defer resp.Body.Close()

	// If we have a 404, then the service is not installed
	if resp.StatusCode == 404 {
		response := ErrorResponse{Type: "error", Status: "Not Found", StatusCode: 404, Result: T("not_installed")}
		// Encode the response as JSON
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Println("Error forming the error response.")
		}
		return
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		logMessage("details", "snapd-response", err.Error())
		response := ErrorResponse{Type: "error", Status: "Not Found", StatusCode: 404, Result: T("unknown")}
		// Encode the response as JSON
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Println("Error forming the error response.")
		}
		return
	}

	fmt.Fprint(w, string(body))
}

// InterfacesHandler uses the snapd REST API to retrieve the interfaces and return the full list
func InterfacesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	T, _ := i18n.Tfunc("en-US")

	// Build the snapd REST API URL
	const serviceInterfacesURL = "/v2/interfaces"
	baseURL := url.URL{Scheme: "http", Host: "localhost", Path: serviceInterfacesURL}

	tr := &http.Transport{
		Dial: snapdDialer,
	}
	client := &http.Client{Transport: tr}

	resp, err := client.Get(baseURL.String())
	if err != nil {
		logMessage("interfaces", "snapd-url", err.Error())
		response := ErrorResponse{Type: "error", Status: "Internal Error", StatusCode: 404, Result: T("application_error")}
		// Encode the response as JSON
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Println("Error forming the error response.")
		}
		return
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		logMessage("interfaces", "snapd-response", err.Error())
		response := ErrorResponse{Type: "error", Status: "Not Found", StatusCode: 404, Result: T("unknown")}
		// Encode the response as JSON
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Println("Error forming the error response.")
		}
		return
	}

	fmt.Fprint(w, string(body))
}

// ChangesHandler uses the snapd REST API to retrieve the system changes
func ChangesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	T, _ := i18n.Tfunc("en-US")

	// Build the snapd REST API URL
	const serviceChangesURL = "/v2/changes"
	baseURL := url.URL{Scheme: "http", Host: "localhost", Path: serviceChangesURL, RawQuery: "select=all"}

	tr := &http.Transport{
		Dial: snapdDialer,
	}
	client := &http.Client{Transport: tr}

	resp, err := client.Get(baseURL.String())
	if err != nil {
		logMessage("changes", "snapd-url", err.Error())
		response := ErrorResponse{Type: "error", Status: "Internal Error", StatusCode: 404, Result: T("application_error")}
		// Encode the response as JSON
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Println("Error forming the error response.")
		}
		return
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		logMessage("changes", "snapd-response", err.Error())
		response := ErrorResponse{Type: "error", Status: "Not Found", StatusCode: 404, Result: T("unknown")}
		// Encode the response as JSON
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Println("Error forming the error response.")
		}
		return
	}

	fmt.Fprint(w, string(body))
}

func snapdDialer(proto, addr string) (conn net.Conn, err error) {
	return net.Dial("unix", "/run/snapd.socket")
}

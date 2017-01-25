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
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestVersionHandler(t *testing.T) {

	config := ConfigSettings{Version: "1.2.5"}
	Environ = &Env{Config: config}

	w := httptest.NewRecorder()
	r, _ := http.NewRequest("GET", "/v1/version", nil)
	AdminRouter(Environ).ServeHTTP(w, r)

	// Check the JSON response
	result := VersionResponse{}
	err := json.NewDecoder(w.Body).Decode(&result)
	if err != nil {
		t.Errorf("Error decoding the version response: %v", err)
	}

	if result.Version != Environ.Config.Version {
		t.Errorf("Incorrect version returned. Expected '%s' got: %v", Environ.Config.Version, result.Version)
	}

}

func TestVersionHandlerNilEnviron(t *testing.T) {

	config := ConfigSettings{Version: "1.2.5"}
	env := &Env{Config: config}
	Environ = nil

	w := httptest.NewRecorder()
	r, _ := http.NewRequest("GET", "/v1/version", nil)
	AdminRouter(env).ServeHTTP(w, r)

	// Check the JSON response
	result := VersionResponse{}
	err := json.NewDecoder(w.Body).Decode(&result)
	if err != nil {
		t.Errorf("Error decoding the version response: %v", err)
	}

	if result.Version != Environ.Config.Version {
		t.Errorf("Incorrect version returned. Expected '%s' got: %v", Environ.Config.Version, result.Version)
	}

}

func TestIndexHandler(t *testing.T) {

	indexTemplate = "../static/app.html"

	config := ConfigSettings{Title: "Site Title", Logo: "/url"}
	Environ = &Env{Config: config}

	w := httptest.NewRecorder()
	r, _ := http.NewRequest("GET", "/", nil)
	http.HandlerFunc(IndexHandler).ServeHTTP(w, r)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status %d, got: %d", http.StatusOK, w.Code)
	}
}

func TestIndexHandlerInvalidTemplate(t *testing.T) {

	indexTemplate = "../static/does_not_exist.html"

	config := ConfigSettings{Title: "Site Title", Logo: "/url"}
	Environ = &Env{Config: config}

	w := httptest.NewRecorder()
	r, _ := http.NewRequest("GET", "/", nil)
	http.HandlerFunc(IndexHandler).ServeHTTP(w, r)

	if w.Code != http.StatusInternalServerError {
		t.Errorf("Expected status %d, got: %d", http.StatusInternalServerError, w.Code)
	}
}

func TestStatesHandler(t *testing.T) {

	config := ConfigSettings{Version: "1.2.5"}
	Environ = &Env{Config: config}

	w := httptest.NewRecorder()
	r, _ := http.NewRequest("GET", "/v1/servicestates", nil)
	AdminRouter(Environ).ServeHTTP(w, r)

	// Check the JSON response
	result := StatesResponse{}
	err := json.NewDecoder(w.Body).Decode(&result)
	if err != nil {
		t.Errorf("Error decoding the states response: %v", err)
	}

}

func TestInterfacesHandler(t *testing.T) {

	config := ConfigSettings{Version: "1.2.5"}
	Environ = &Env{Config: config}

	w := httptest.NewRecorder()
	r, _ := http.NewRequest("GET", "/v1/interfaces", nil)
	AdminRouter(Environ).ServeHTTP(w, r)

	// Check the response
	if w.Code != 200 {
		t.Errorf("Error fetching the interfaces: %v", w.Code)
	}
}

func TestDetailsHandler(t *testing.T) {

	config := ConfigSettings{Version: "1.2.5"}
	Environ = &Env{Config: config}

	w := httptest.NewRecorder()
	r, _ := http.NewRequest("GET", "/v1/details/ubuntu-core", nil)
	AdminRouter(Environ).ServeHTTP(w, r)

	// Check the response
	if w.Code != 200 {
		t.Errorf("Error fetching the details: %v", w.Code)
	}
}

func TestDetailsHandlerNotFound(t *testing.T) {

	config := ConfigSettings{Version: "1.2.5"}
	Environ = &Env{Config: config}

	w := httptest.NewRecorder()
	r, _ := http.NewRequest("GET", "/v1/details/this-does-not-exist", nil)
	AdminRouter(Environ).ServeHTTP(w, r)

	// Check the response
	result := ErrorResponse{}
	err := json.NewDecoder(w.Body).Decode(&result)
	if err != nil {
		t.Errorf("Error decoding the details response: %v", err)
	}
	if result.StatusCode != 404 {
		t.Errorf("Unexpected result code: %v", result.StatusCode)
	}
}

func TestChangesHandler(t *testing.T) {

	config := ConfigSettings{Version: "1.2.5"}
	Environ = &Env{Config: config}

	w := httptest.NewRecorder()
	r, _ := http.NewRequest("GET", "/v1/changes", nil)
	AdminRouter(Environ).ServeHTTP(w, r)

	// Check the response
	if w.Code != 200 {
		t.Errorf("Error fetching the changes: %v", w.Code)
	}
}

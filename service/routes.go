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
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

// Environ contains the parsed config file settings.
var Environ *Env

const indexTemplate = "/static/app.html"

// Page is the page details for the web application
type Page struct {
	Title string
	Logo  string
}

// AdminRouter returns the application route handler for administrating the services
func AdminRouter(env *Env) *mux.Router {

	// Start the web service router
	router := mux.NewRouter()

	// API routes
	router.Handle("/v1/version", Middleware(http.HandlerFunc(VersionHandler), env)).Methods("GET")

	// Web application routes
	path := []string{env.Config.DocRoot, "/static/"}
	fs := http.StripPrefix("/static/", http.FileServer(http.Dir(strings.Join(path, ""))))
	router.PathPrefix("/static/").Handler(fs)
	router.Handle("/", Middleware(http.HandlerFunc(IndexHandler), env)).Methods("GET")

	return router
}
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

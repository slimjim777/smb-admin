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

// ConfigSettings defines the parsed config file settings.
type ConfigSettings struct {
	Version      string
	Title        string `yaml:"title"`
	Logo         string `yaml:"logo"`
	DocRootAdmin string `yaml:"docRootAdmin"`
	Port         string `yaml:"port"`
}

// Env environment struct that holds the config details.
type Env struct {
	Config ConfigSettings
}

// ActiveState is the current state of a service
type ActiveState struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	State       string `json:"state"`
	Action      string `json:"action"`
	Configure   string `json:"adminPage"`
}

// ErrorResponse is the JSON response when an API call hits an error
type ErrorResponse struct {
	Type       string `json:"type"`
	Status     string `json:"status"`
	StatusCode int    `json:"status-code"`
	Result     string `json:"result"`
}

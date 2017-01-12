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

// Command-line parameter defaults and descriptions
const (
	defaultConfigFile      = ""
	defaultConfigFileUsage = "Path to the config file"
	defaultPort            = "8000"
	defaultPortUsage       = "default server port e.g. '8000'"

	defaultTitle   = "SMB Admin"
	defaultLogo    = "/static/images/logo-ubuntu-white.svg"
	defaultDocRoot = "."
)

// Environment variables that will be checked
const (
	envTitle   = "SMBADMIN_TITLE"
	envLogo    = "SMBADMIN_LOGO"
	envDocRoot = "SMBADMIN_DOCROOT"
	envPort    = "SMBADMIN_PORT"
)

const version = "0.1"

// ConfigSettings defines the parsed config file settings.
type ConfigSettings struct {
	Version string
	Title   string `yaml:"title"`
	Logo    string `yaml:"logo"`
	DocRoot string `yaml:"docRoot"`
	Port    string `yaml:"port"`
}

// Env environment struct that holds the config details.
type Env struct {
	Config ConfigSettings
}

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
	defaultLogo    = "/static/images/logo-ubuntu-orange.svg"
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

// serviceKeys defines the key names of each of the services
var serviceKeys = [...]string{"snapweb", "nextcloud", "wekan", "rocketchat", "gogs", "spreed", "iredmail", "collabora"}

// serviceNames defines the snapped service names of the services
var serviceNames = [...]string{"snapweb", "nextcloud", "wekan", "rocketchat", "gogs", "spreed", "iredmail", "collabora"}

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
	defaultPortAdmin       = "8000"
	defaultPortAdminUsage  = "default server port e.g. '8000'"
	defaultPortUser        = "8001"
	defaultPortUserUsage   = "default server port e.g. '8001'"

	defaultTitle        = "SMB Admin"
	defaultLogo         = "/static/images/logo-ubuntu-orange.svg"
	defaultDocRootAdmin = "./static/build-admin"
	defaultDocRootUser  = "./static/build-enduser"
)

// Environment variables that will be checked
const (
	envTitle        = "SMBADMIN_TITLE"
	envLogo         = "SMBADMIN_LOGO"
	envDocRootAdmin = "SMBADMIN_DOCROOT_ADMIN"
	envDocRootUser  = "SMBADMIN_DOCROOT_USER"
	envPortAdmin    = "SMBADMIN_PORTADMIN"
	envPortUser     = "SMBADMIN_PORTUSER"
)

const version = "0.2"

// The type of interface that will be shown
const (
	InterfaceTypeAdmin = "admin"
	InterfaceTypeUser  = "user"
)

// serviceKeys defines the key names of each of the services
var serviceKeys = [...]string{"nextcloud", "wekan", "rocketchat", "gogs", "spreedme", "iredmail", "collabora"}

// serviceNames defines the snapped service names of the services
var serviceNames = [...]string{"nextcloud", "wekan", "rocketchat", "gogs", "spreed", "iredmail", "collabora"}

// serviceAdmin defines the URL to configure the service.
// The value is appended to protocol://domain_name
var serviceAdmin = [...]string{"/index.php/settings/admin", ":8080", ":3000", "/gogs", ":8084", "/iredmail", "/collabora"}

// servicePage is the end-user URL to access the service
// The value is appended to protocol://domain_name
var servicePage = [...]string{"/index.php", ":8080", ":3000", "/gogs", ":8084", "/iredmail", "/collabora"}

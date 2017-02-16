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
	defaultPortAdmin       = "4301"
	defaultPortAdminUsage  = "default server port e.g. '4301'"
	defaultPortUser        = "4300"
	defaultPortUserUsage   = "default server port e.g. '4300'"

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

const version = "0.4"

// The type of interface that will be shown
const (
	InterfaceTypeAdmin = "admin"
	InterfaceTypeUser  = "user"
)

// serviceKeys defines the key names of each of the snaps
var serviceKeys = [...]string{"nextcloud-nextant", "wekan-ondra", "rocketchat-server", "gogs", "spreed-webrtc-snap", "iredmail", "code"}

// serviceNames defines the snapped service names of the services
var serviceNames = [...]string{"nextcloud", "wekan", "node", "gogs", "spreed", "iredmail", "loolwsd"}

// serviceAdmin defines the URL to configure the service.
// The value is appended to protocol://domain_name
var serviceAdmin = [...]string{"/index.php/settings/admin", ":8080", ":3000", ":3001", ":8084", "/iredmail", ":80"}

// servicePage is the end-user URL to access the service
// The value is appended to protocol://domain_name
var servicePage = [...]string{"/index.php", ":8080", ":3000", ":3001", ":8084", "/iredmail", ":80"}

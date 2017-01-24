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
	defaultDocRoot = "./webapp/build"
)

// Environment variables that will be checked
const (
	envTitle   = "SMBADMIN_TITLE"
	envLogo    = "SMBADMIN_LOGO"
	envDocRoot = "SMBADMIN_DOCROOT"
	envPort    = "SMBADMIN_PORT"
)

const version = "0.2"

// serviceKeys defines the key names of each of the services
var serviceKeys = [...]string{"nextcloud", "wekan", "rocketchat", "gogs", "spreedme", "iredmail", "collabora"}

// serviceNames defines the snapped service names of the services
var serviceNames = [...]string{"nextcloud", "wekan", "rocketchat", "gogs", "spreed", "iredmail", "collabora"}

// serviceConfigure defines the URL to configure the service.
// The value is appended to protocol://domain_name
var serviceConfigure = [...]string{"/index.php/settings/admin", "wekan", "rocketchat", "gogs", ":8084", "iredmail", "collabora"}

// serviceAbout defines the details of a service
var serviceAbout = [...]string{
	"Nextcloud is a safe home for all your data. Access, share and protect your files, calendars, contacts and communication and more. Nextcloud comes with a feature rich set of pre-integrated services and is developed using a fully open source platform designed to give enterprises full control and privacy.",
	"Wekan is an open source Kanban workflow tool that allows you to create boards, on which cards can be moved around between a number of columns. Boards can have many members, allowing for easy collaboration, just add everyone that should be able to work with you on the board to it, and you are good to go!",
	"Rocket.Chat is a dynamic and innovative toolkit providing group messaging and video communication and collaboration. It is a great solution for communities and companies wanting to privately host their own chat service.",
	"Gogs is a easy to use code repository service based on Git designed for self hosted environments. Gogs provides a full code management and distribution and is designed to help developers accelerate projects within a fully private environment.",
	"Spreed is a private video and chat messaging service based on WebRTC and is available through Nextcloud. The service brings you easy to use web conferencing, one to one calls, chat and is designed to give the enterprise full control of its communication.",
	"iRedMail is the complete self-hosted, open source mail server solution for enterprises. With iRedMail, you can deploy a full feature mail server in several minutes.",
	"Collaborative editing with LibreOffice using your own private cloud. Collabora Online is for enterprises that want a powerful self-hosted office suite that protects their privacy and allows them to keep full control of their sensitive corporate data.",
}

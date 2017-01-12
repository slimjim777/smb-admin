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

package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/ubuntu-core/smb-admin/service"
)

func main() {
	env := service.Env{Config: service.DefaultConfig()}

	// Parse the command-line parameters
	service.ParseArgs()

	// Get the config settings from the file or environment variables
	err := service.ReadConfig(&env.Config)
	if err != nil {
		log.Fatalf("Error reading the config: %v", err)
	}

	fmt.Println("server will run on:", env.Config.Port)
	port := ":" + env.Config.Port
	log.Println(env.Config)

	log.Fatal(http.ListenAndServe(port, service.AdminRouter(&env)))
}
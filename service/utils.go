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
	"errors"
	"flag"
	"io/ioutil"
	"log"
	"os"
	"strconv"

	"gopkg.in/yaml.v2"
)

var settingsFile string

// DefaultConfig returns the default config settings
func DefaultConfig() ConfigSettings {
	return ConfigSettings{
		Version: version,
		Title:   defaultTitle,
		Logo:    defaultLogo,
		DocRoot: defaultDocRoot,
		Port:    defaultPort,
	}
}

// ParseArgs checks the command line arguments
func ParseArgs() {
	flag.StringVar(&settingsFile, "config", defaultConfigFile, defaultConfigFileUsage)
	flag.Parse()
}

// ReadConfig parses the config parameters from the command line, environment variables and config file
func ReadConfig(config *ConfigSettings) error {

	// Check if the config file parameter has been provided
	if settingsFile != "" {
		err := readConfigFromFile(config)
		if err != nil {
			return err
		}
	}

	// Override the config from the environment variables
	err := readConfigFromEnvironment(config)
	if err != nil {
		return err
	}

	// Verify the config
	err = verifyConfig(config)
	if err != nil {
		return err
	}

	return nil
}

func readConfigFromFile(config *ConfigSettings) error {
	log.Println("Read config from file")

	source, err := ioutil.ReadFile(settingsFile)
	if err != nil {
		log.Println("Error opening the config file.")
		return err
	}

	err = yaml.Unmarshal(source, &config)
	if err != nil {
		log.Println("Error parsing the config file.")
		return err
	}

	return nil
}

// readConfigFromEnvironment overrides the config file parameters with the environment variables
func readConfigFromEnvironment(config *ConfigSettings) error {
	log.Println("Read config from environment variables")

	// Set the title from the environment variable, if it is set
	if os.Getenv("SMBADMIN_TITLE") != "" {
		config.Title = os.Getenv("SMBADMIN_TITLE")
	}

	// Set the logo from the environment variable, if it is set
	if os.Getenv("SMBADMIN_LOGO") != "" {
		config.Logo = os.Getenv("SMBADMIN_LOGO")
	}

	// Set the document root from the environment variable, if it is set
	if os.Getenv("SMBADMIN_DOCROOT") != "" {
		config.DocRoot = os.Getenv("SMBADMIN_DOCROOT")
	}

	// Set the port from the environment variable, if it is set
	if os.Getenv("SMBADMIN_PORT") != "" {
		config.Port = os.Getenv("SMBADMIN_PORT")
	}

	return nil
}

func verifyConfig(config *ConfigSettings) error {
	// Check that the port is numeric
	if _, err := strconv.Atoi(config.Port); err != nil {
		return errors.New(errorPortNotNumeric)
	}

	return nil
}

// logMessage logs a message in a fixed format so it can be analyzed by log handlers
// e.g. "METHOD CODE descriptive reason"
func logMessage(method, code, reason string) {
	log.Printf("%s %s %s\n", method, code, reason)
}

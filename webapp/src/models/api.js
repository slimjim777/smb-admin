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
import axios from 'axios'
import constants from './constants'

const API_VERSION = constants.baseUrl + '/v1/';

var service = {

    serviceStates: function (query, cancelCallback) {
        return axios.get(API_VERSION + 'servicestates');
    },

    version: function (query, cancelCallback) {
        return axios.get(API_VERSION + 'version');
    },

    serviceDetails: function (query, cancelCallback) {
        return axios.get(API_VERSION + 'details/' + query);
    },

    interfaces: function (query, cancelCallback) {
        return axios.get(API_VERSION + 'interfaces');
    },

    changes: function (query, cancelCallback) {
        return axios.get(API_VERSION + 'changes');
    }
}

export default service

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
'use strict'

var React = require('react');
var Footer = require('./Footer');
var injectIntl = require('react-intl').injectIntl;
var services = require('./constants').SERVICES;
var Vault = require('../models/vault');

var Detail = React.createClass({

    getInitialState: function() {
        return {serviceState: {}, serviceConfigure: {}, message: null};
    },

    componentDidMount: function() {
        this.getStates();
    },

    getStates: function() {
        var self = this;
        Vault.serviceStates().then(function(response) {
            var data = JSON.parse(response.body);

            if (!data.success) {
                message = data.message;
                self.setState({message: data.message});
                return;
            }

            // Pivot the data to make it more accessible
            var serviceState = {};
            var serviceConfigure = {};
            data.states.map(function(srv) {
                serviceState[srv.name] = srv.state;
                serviceConfigure[srv.name] = srv.configure;
            });
            self.setState({serviceState: serviceState, serviceConfigure: serviceConfigure, message: null});

        });
    },

    getBaseUrl: function() {
        return window.location.protocol + '//' + window.location.hostname;
    },

    handleConfigureClick: function() {
        var url =this.getBaseUrl() + this.state.serviceConfigure[this.props.params.name];
        console.log(this.state.serviceConfigure);
        console.log(url);
        window.open(url, '_blank');
    },

    render: function() {
        var M = this.props.intl.formatMessage;
        var self = this

        // Return to the index page if we do not have a recognised service
        if (services.indexOf(self.props.params.name) < 0) {
            window.location = "/";
            return;
        }
        var srv = self.props.params.name;

        // Set the app state
        var state = 'not_running';
        if (self.state.serviceState[srv]) {
            state = M({id: this.state.serviceState[srv]});
        }

        return (
            <div className="inner-wrapper">
                <div className="inner-wrapper">
                    <div className="app-banner twelve-col last-col">
                        <div className="two-col">
                            <div className="app-icon-wrapper">
                                <img className="app-icon" src={'/static/images/' + srv + '.svg'} />
                            </div>
                        </div>
                        <div className="app-meta six-col">
                            <h1 className="app-title">{M({id: srv})}</h1>
                        </div>
                        <div className="app-actions four-col last-col">
                            <div className="app-configure">
                                <button class="app_button button--secondary" onClick={self.handleConfigureClick}>{M({id: 'configure'})}</button>
                            </div>
                            <div className="app-state">
                                <p>{state}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inner-wrapper">
                    <div className="twelve-col last-col">
                        <a href="/">&laquo; {M({id: 'backlink'})}</a>
                    </div>
                </div>

                <div className="inner-wrapper">
                    <div className="eight-col">
                        <div className="app-details">
                            <h3>About</h3>
                            <p>{M({id: srv + 'Desc'})}</p>
                        </div>
                    </div>
                </div>

            <Footer />
            </div>
        );
    }

});

module.exports = injectIntl(Detail);

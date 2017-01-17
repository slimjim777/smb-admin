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
var Navigation = require('./Navigation');
var Footer = require('./Footer');
var injectIntl = require('react-intl').injectIntl;
var services = require('./constants').SERVICES;
var Vault = require('../models/vault');


var Index = React.createClass({

  getInitialState: function() {
    return {serviceState: {}, message: null};
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
      data.states.map(function(srv) {
        serviceState[srv.name] = srv.state;
      });
      self.setState({serviceState: serviceState, message: null});
      
    });
  },

  handleAppClick: function(e) {
    if (e) {
      e.preventDefault();
      window.location = '/app/' + e.target.getAttribute('data-key');
    }

  },

  render: function() {
    var M = this.props.intl.formatMessage;
    var self = this;

    return (
        <div className="inner-wrapper">

          <div className="app-headline twelve-col last-col">
            <h2 className="twelve-col last-col">{TITLE}</h2>
          </div>

          <div className="twelve-col last-col">
            <div className="applist-grid">
              {services.map(function(srv) {
                  var state = 'not_running';
                  if (self.state.serviceState[srv]) {
                    state = M({id: self.state.serviceState[srv]});
                  }
                  return (
                    <div className="applist-item three-col" data-key={srv} onClick={self.handleAppClick}>
                      <div className="applist-icon-wrapper" data-key={srv}>
                        <img className="applist-icon" src={'/static/images/' + srv + '.svg'} data-key={srv} />
                      </div>
                      <div className="applist-meta" data-key={srv}>
                        <h3 className="applist-name" data-key={srv}>{M({id: srv})}</h3>
                        <p className="applist-state" data-key={srv}>{state}</p>
                      </div>
                    </div>
                  );
              })}
            </div>
          </div>


          <Footer />
        </div>
    );
  }
});

module.exports = injectIntl(Index);

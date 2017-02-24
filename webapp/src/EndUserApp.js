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
import React, { Component } from 'react'
import './EndUserApp.css'
import api from './models/api'
import constants from './models/constants'

import 'snapweb-toolkit/lib/bundle.css'
 
import {
  Footer,
} from 'snapweb-toolkit'

import Header from './Header/Header'
import HomePage from './HomePage'

import createHistory from 'history/createBrowserHistory'

const publicUrl = process.env.PUBLIC_URL

const defaultProfileName = 'Lola Chang'
const history = createHistory()

const brandData = {
    name: 'Ubuntu',
    id: 'ubuntu',
    color: '#E95420',
}

const bannerData = {
  photo: 'banner-photo.png', 
  primaryText: 'Ubuntu secure service suite',
  secondaryText: 'Greetings Lola',
}


function openNewTab(url) {
  const win = window.open(url, '_blank'); 
  if (win) {
    //Browser has allowed it to be opened
    win.focus();
  }
}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      installedServices: [],
      location: history.location,
    }

    history.listen(this.handleNavigation.bind(this))

    this.onMenuItemClick = this.onMenuItemClick.bind(this)
    this.onRequestServicePage = this.onRequestServicePage.bind(this)

    this.getServices()
    this.getVersion()
  }

  getServices() {
    // Get the installed services using the API
    api.serviceStates().then(response => {
      var cards = response.data.states.map(srv => {
        return {
          id: srv.id,
          name: srv.name,
          description: srv.description,
          action: 'Sign-in',
          state: srv.state,
          image: srv.id,
          adminPage: constants.baseUrl + srv.adminPage,
          servicePage: constants.baseUrl + srv.servicePage,
        }
      })

      this.setState({ installedServices: cards })
    });
  }

  getVersion() {
    api.version().then(response => {
      this.setState({ version: 'Version: ' + response.data.version})
    })
  }

  findServiceById(id) {
    return this.state.installedServices.find(service => (service.id === id))
  }

  handleNavigation(location) {
    this.setState({ location: location })
    window.scrollTo(0, 0)
  }

  onMenuItemClick(id) {
    if (id === 'home') history.push('/')
  }

  onRequestAdminPage(id) {
    const service = this.findServiceById(id)
    if (service) openNewTab(service.adminPage)
  }

  onRequestServicePage(id) {
    const service = this.findServiceById(id)
    if (service) openNewTab(service.servicePage)
  }

  render() {

    const {
      installedServices,
    } = this.state

    const cardImgRootUrl = `${publicUrl}/icons/cards/`

    return (
      <div className='App'>
        <div className='App-header'>
          <Header
            hasBack={false}
            hasSignIn={true}
            signedIn={true}
            profilename={defaultProfileName}
          />
        </div>

        <main className='App-content'>
          <HomePage
            bannerData={bannerData}
            cardImgRootUrl={cardImgRootUrl}
            services={installedServices}
            onOpenService={this.onRequestServicePage}
          />
        </main>

        <Footer 
          firstLine={this.state.version}
          copyright={`© ${(new Date()).getFullYear()} ${brandData.name}`}
          logo={`${publicUrl}/brands/${brandData.id}/logo.png`}
          termsUrl={'http://www.ubuntu.com'}
          link={'http://www.ubuntu.com'}
        />
      </div>
    )
  }
}

export default App

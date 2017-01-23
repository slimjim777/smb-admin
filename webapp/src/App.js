import React, { Component } from 'react'
import './App.css'

import If from 'toolkit/If'
import Header from 'toolkit/Header/Header'
import Footer from 'toolkit/Footer/Footer'

import api from './models/api'

import HomePage from './HomePage'
import ServicePage from './ServicePage'

import createHistory from 'history/createBrowserHistory'

const publicUrl = process.env.PUBLIC_URL

// @todo: Replace this url with the real snapweb link on the device
const snapwebUrl = 'http://localhost:4200/'
const history = createHistory()
const sections = ['service']

const brandData = {
    name: 'KeyMile',
    id: 'keymile',
    color: '#FF7301',
}

function serviceIdFromPath(path) {
  const parts = path.split('/').slice(1)
  return (parts[0] === 'service' && parts[1]) || ''
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
      version: '',
      location: history.location,
    }

    history.listen(this.handleNavigation.bind(this))

    this.onMenuItemClick = this.onMenuItemClick.bind(this)
    this.onRequestAdminPage = this.onRequestAdminPage.bind(this)

    this.getServices()
    this.getVersion()
  }

  getServices() {
    // Get the installed services using the API
    api.serviceStates().then(response => {
      var cards = response.data.states.map(srv => {
        return {
          id: srv.name,
          name: srv.name,
          description: srv.description,
          action: srv.state,
          image: srv.name,
          configure: srv.configure,
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

  getSectionFromPath(path) {
    return path === '/' ? 'home' : (
      sections.find(section => (
        path.startsWith(`/${section}`)
      )) || ''
    )
  }

  findServiceById(id) {
    return this.state.installedServices.find(service => (service.id === id))
  }

  handleNavigation(location) {
    this.setState({ location: location })
    window.scrollTo(0, 0)
  }

  onMenuItemClick(id) {
    if (id === 'snapweb') {
      openNewTab(snapwebUrl)
    } 
    if (id === 'home') history.push('/')
  }

  onOpenService(id) {
    history.push('/service/' + id)
  }

  onRequestAdminPage(id) {
    console.log(id)
    const service = this.findServiceById(id)
    if (service) openNewTab(this.getBaseUrl() + service.configure)
  }

  getBaseUrl () {
      return location.protocol + '//' + location.hostname;
  }

  handleConfigureClick () {
      var url =this.getBaseUrl() + this.state.serviceConfigure[this.props.params.name];
      console.log(this.state.serviceConfigure);
      console.log(url);
      window.open(url, '_blank');
  }

  render() {

    const {
      location,
      installedServices,
    } = this.state

    // Display loading page if we are waiting for the API call to return
    if (installedServices.length === 0) {
      return <div>Loading...</div>
    }

    const currentSection = this.getSectionFromPath(location.pathname)
    const cardImgRootUrl = `${publicUrl}/icons/cards/`

    return (
      <div className='App'>
        <Header
          menuitems={[
            { id: 'snapweb', name: 'Snapweb' },
          ]}
          currentSection={currentSection}
          onMenuItemClick={this.onMenuItemClick}
          name={brandData.name}
          logo={`${publicUrl}/brands/${brandData.id}/logo.png`}
          customColor={brandData.color}
        />

        <main className='App-content'>
          <If cond={currentSection === 'home'}>
            <HomePage
              cardImgRootUrl={cardImgRootUrl}
              services={installedServices}
              onOpenService={this.onOpenService}
            />
          </If>
          <If cond={currentSection === 'service'}>
            <ServicePage
              cardImgRootUrl={cardImgRootUrl}
              service={installedServices.find(service => (
                  service.id === serviceIdFromPath(location.pathname)
                ))}
              onRequestAdminPage={this.onRequestAdminPage}
            />
          </If>

        </main>

        <Footer 
          firstLine={this.state.version}
          copyright={`© ${(new Date()).getFullYear()} ${brandData.name}`}
          logo={`${publicUrl}/brands/${brandData.id}/logo.png`}
        />
      </div>
    )
  }
}

export default App

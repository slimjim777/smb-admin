import React, { Component } from 'react'
import moment from 'moment'
import filesize from 'filesize'
import './ServicePage.css'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import Details from 'toolkit/SnapPage/SnapPageDetails'
import About from 'toolkit/SnapPage/SnapPageAbout'
import Interfaces from 'toolkit/SnapPage/SnapPageInterfaces'
import Button from 'toolkit/Button/Button'
import Summary from 'toolkit/SnapPage/SnapPageSummary'
import api from './models/api'

import History from './HistoryList'

class ServicePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      service: props.service,
      items: [],
      interfaces: [],
      changes: [],
      details: {},
      icon: `${props.cardImgRootUrl}${props.service.image}.png`,
      runningStatusText: props.service.status,
      isRunning: props.service.status==='running',
      location: history.location,
    }

    this.getDetails()
    this.getInterfaces()
    this.getChanges()
  }

  getDetails () {
    api.serviceDetails(this.state.service.id).then(response => {

      var items = []

      if (response.data.status === 'OK') {
        items = [
          ['Developer', response.data.result.developer],
          ['Channel', response.data.result.channel],
          ['Version', response.data.result.version],
          ['Revision', response.data.result.revision],
          ['Size', filesize(response.data.result['installed-size'])],
          ['Installed', moment(response.data.result['install-date']).format('lll')],
        ]
      } else {
        items = [["Status", response.data.result]]
      }

      this.setState({details: response.data.result, items: items})

    })
  }

  getInterfaces () {
    api.interfaces().then(response => {
      var items = []

      if (response.data.status === 'OK') {
        response.data.result.plugs.map(plug => {
          if (plug.snap === this.state.service.id) {
            // A snap can have multiple apps, and the apps have the interfaces not the snap
            // Summarise the interface list to just include the unique names
            if (!items.find(iface => (iface === plug.interface))) {
              items.push(plug.interface)
            }
          }
        })
      }

      this.setState({interfaces: items})
    })
  }

  getChanges () {
    api.changes().then(response => {

      var items = []

      if (response.data.status === 'OK') {
        response.data.result.map(chg => {
          if (chg.summary.includes(this.state.service.id)) {
            items.push( [chg.summary, moment(chg['spawn-time']).format('lll')] )
          }
        })
      }

      this.setState({changes: items})
    })
  }

  render () {

    return (
      <div className='ServicePage'>

        <ContentWrapper background>
          <div className='ServicePage-header'>

            <div className='ServicePage-headerParts'>
              <div>
                <Summary
                  icon={this.state.icon}
                  name={this.state.service.name}
                  description={this.state.details.description} 
                />
              </div>
              <div className='ServicePage-buttonContainer'>
                <div className='ServicePage-button'>
                  <Button
                    label={'Admin interface'}
                    
                    onClick={() => { this.props.onRequestAdminPage(this.state.service.id) }}
                  />
                </div>
                <div className='ServicePage-button'>
                </div>
              </div>
            </div>
          </div>
        </ContentWrapper>

        <ContentWrapper>
            <div className='ServicePage-content'>

              <div>
                <Details
                  items={this.state.items}
                />
                <div className='ServicePage-ServicePageAbout'>
                  <About
                    content={this.state.service.description}
                  />
                </div>
              </div>

              <div>
                <Interfaces
                  items={this.state.interfaces}
                />
              </div>

            </div>
          </ContentWrapper>
          <ContentWrapper bordered>
            <History 
              items={this.state.changes}
            />
          </ContentWrapper>
      </div>
    )
  }
}

export default ServicePage

import React, { Component } from 'react'
import './ServicePage.css'
import moment from 'moment'
import filesize from 'filesize'
import api from './models/api'

import {
  If,
  ContentWrapper,
  Button,
  SnapPageDetails as Details,
  SnapPageAbout as About,
  SnapPageInterfaces as Interfaces,
  SnapPageSummary as Summary,
} from 'snapweb-toolkit'

import History from './HistoryList'

class ServicePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      interfaces: [],
      changes: [],
      details: {},
    }

    this.getDetails(props.service)
    this.getInterfaces(props.service)
    this.getChanges(props.service)
  }

  onButtonToOpenAdminClicked () {
    const { service, onRequestAdminPage } = this.props
    onRequestAdminPage(service.id)
  }

  onButtonToStopServiceClicked () {
    const { service, onRequestStop, onRequestStart } = this.props
    const callback = service.state === 'running'? onRequestStop : onRequestStart
    callback(service.id)
  }

  onButtonToOpenServiceClicked () {
    const { service, onRequestServicePage } = this.props
    onRequestServicePage(service.id)
  }

  getDetails (service) {

    api.serviceDetails(service.id).then(response => {

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

  getInterfaces (service) {

    api.interfaces().then(response => {
      var items = []

      if (response.data.status === 'OK') {
        response.data.result.plugs.map(plug => {
          if (plug.snap === service.id) {
            // A snap can have multiple apps, and the apps have the interfaces not the snap
            // Summarise the interface list to just include the unique names
            if (!items.find(iface => (iface === plug.interface))) {
              items.push(plug.interface)
            }
          }
          return plug;
        })
      }

      this.setState({interfaces: items})
    })
  }

  getChanges (service) {

    api.changes().then(response => {

      var items = []

      if (response.data.status === 'OK') {
        response.data.result.map(chg => {
          if (chg.summary.includes(service.id)) {
            items.push( [chg.summary, moment(chg['spawn-time']).format('lll')] )
          }
          return chg
        })
      }
      this.setState({changes: items})
    })
  }


  render () {

    const {
      cardImgRootUrl,
      service,
    } = this.props

    if (!service) {
      return <div>Loading...</div>
    }

    const {
      items,
      changes,
      interfaces,
      details,
    } = this.state

    const hasButtonToStopService = false
    const hasButtonToOpenService = false

    const isRunning = service.state === 'running'
    const icon = `${cardImgRootUrl}${service.image}.png`

    return (
      <div className='ServicePage'>

        <ContentWrapper background>
          <div className='ServicePage-header'>

            <div className='ServicePage-headerParts'>
              <div>
                <Summary
                  icon={icon}
                  name={service.name}
                  description={details.description}
                />
              </div>
              <div className='ServicePage-buttonContainer'>
                <div className='ServicePage-button'>
                  <Button
                    label={'Admin interface'}
                    disabled={!isRunning}
                    onClick={this.onButtonToOpenAdminClicked}
                  />
                </div>
                <If cond={hasButtonToOpenService}>
                  <div className='ServicePage-button'>
                    <Button
                      label={'Open'}
                      disabled={!isRunning}
                      onClick={this.onButtonToOpenServiceClicked}
                    />
                  </div>
                </If>
                <If cond={hasButtonToStopService}>
                  <div className='ServicePage-button'>
                    <Button
                      label={isRunning? 'Stop' : 'Start'}
                      disabled={false}
                      onClick={this.onButtonToStopServiceClicked}
                    />
                  </div>
                </If>
              </div>
            </div>
          </div>
        </ContentWrapper>

        <ContentWrapper>
            <div className='ServicePage-content'>

              <div>
                <If cond={items}>
                  <Details
                    items={items}
                  />
                </If>
                <div className='ServicePage-ServicePageAbout'>
                  <About
                    content={service.description}
                  />
                </div>
              </div>

              <div>
                <If cond={interfaces}>
                  <Interfaces
                    items={interfaces}
                  />
                </If>
              </div>

            </div>
          </ContentWrapper>
          <If cond={changes.length > 0}>
            <ContentWrapper bordered>
              <History 
                items={changes}
              />
            </ContentWrapper>
          </If>
      </div>
    )
  }
}

export default ServicePage

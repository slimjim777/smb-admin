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
      details: {},
      icon: `${props.cardImgRootUrl}${props.service.image}.png`,
      runningStatusText: props.service.status,
      isRunning: props.service.status==='running',
      location: history.location,
    }

    this.getDetails()
  }

  getDetails () {

    api.serviceDetails(this.state.service.id).then(response => {

      var items = [
        ['Status', 'not_installed'],
      ]

      if (response.data.status === 'OK') {
        items = [
          ['Developer', response.data.result.developer],
          ['Channel', response.data.result.channel],
          ['Version', response.data.result.version],
          ['Revision', response.data.result.revision],
          ['Size', filesize(response.data.result['installed-size'])],
          ['Installed', moment(response.data.result['install-date']).format('lll')],
        ]

      }

      this.setState({details: response.data.result, items: items})

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
                  items={[
                    'Network',
                    'Network Bind',
                    'Mount Observe',
                  ]}
                />
              </div>

            </div>
          </ContentWrapper>
          <ContentWrapper bordered>
            <History 
              history={this.state.service.history || []}
            />
          </ContentWrapper>
      </div>
    )
  }
}

export default ServicePage

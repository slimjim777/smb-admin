import React, { Component } from 'react'
import './ServicePage.css'

import {
  If,
  ContentWrapper,
  Button,
  SnapPageDetails as Details,
  SnapPageAbout as About,
  SnapPageInterfaces as Interfaces,
  SnapPageSummary as Summary,
} from 'toolkit'

import History from './HistoryList'

class ServicePage extends Component {

  onButtonToOpenAdminClicked = () => {
    const { service, onRequestAdminPage } = this.props
    onRequestAdminPage(service.id)
  }

  onButtonToStopServiceClicked = () => {
    const { service, onRequestStop, onRequestStart } = this.props
    const callback = service.state === 'running'? onRequestStop : onRequestStart
    callback(service.id)
  }

  onButtonToOpenServiceClicked = () => {
    const { service, onRequestServicePage } = this.props
    onRequestServicePage(service.id)
  }

  render () {

    const {
      cardImgRootUrl,
      service,
    } = this.props

    const hasButtonToStopService = false
    const hasButtonToOpenService = false

    const isRunning = service.state === 'running'
    const runningStatusText = service.status
    const icon = `${cardImgRootUrl}${service.image}.png`

    const runningSince = `
      This service has been ${runningStatusText.toLowerCase()}
      since ${service.history[0][1]}
    `

    return (
      <div className='ServicePage'>

        <ContentWrapper background>
          <div className='ServicePage-header'>

            <div className='ServicePage-headerParts'>
              <div>
                <Summary
                  icon={icon}
                  name={service.name}
                  description={runningSince}
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
                <If cond={service.details}>
                  <Details
                    items={service.details}
                  />
                </If>
                <div className='ServicePage-ServicePageAbout'>
                  <About
                    content={service.description}
                  />
                </div>
              </div>

              <div>
                <If cond={service.interfaces}>
                  <Interfaces
                    items={service.interfaces}
                  />
                </If>
              </div>

            </div>
          </ContentWrapper>
          <ContentWrapper bordered>
            <History 
              items={service.history}
            />
          </ContentWrapper>
      </div>
    )
  }
}

export default ServicePage

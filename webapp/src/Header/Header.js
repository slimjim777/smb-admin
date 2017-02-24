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
import './Header.css'

import avatar from './assets/avatar.png'

import {
  ContentWrapper,
  Icon,
  If,
 } from 'toolkit'

const defaultProfileName = 'John Smith'
const backButtonText = 'Services'

class Header extends Component {
  handleBackClick = (event) => {
    if (this.props.hasBack) {
      event.currentTarget.blur()
      this.props.onBackClick()
    }
  }
  handleProfileClick = (event) => {
    event.currentTarget.blur()
    if (this.props.onProfileClick) {
      this.props.onProfileClick()
    }
  }
  handleSignInClick = (event) => {
    event.currentTarget.blur()
    if (this.props.onSignInClick) {
      this.props.onSignInClick()
    }
  }
  
  render() {
    const { props } = this
    const styles = props.customColor? {
      borderColor: props.customColor,
    } : {}
    const signedInText=props.signedIn? 'Logout' : 'Log in'

    const img = (
      <img className='Header-logo'
        src={this.props.logo}
        alt={name}
        height='48'
      />
    )

    return (
      <header
        className='Header'
        style={styles}
      > 
        <div className='Header-in'>
          <If cond={this.props.hasBack}>
            <div
              className='Header-back'
              role='button'
              tabIndex='0'
              onClick={this.handleBackClick}
            >
              <span>
                <Icon name='previous' size='24px' />
              </span>
              <span className='Header-back-text'>{backButtonText}</span>
              <div className='Header-activeOverlay' />
            </div>
          </If>
          <If cond={this.props.signedIn && this.props.hasSignIn}>
            <div
              className='Header-profile'
              role='button'
              tabIndex='0'
              onClick={this.handleProfileClick}
            >
              <img width='24' height='24' src={avatar} alt='' />
              <span>{props.profilename || defaultProfileName}</span>
              <div className='Header-activeOverlay' />
            </div>
          </If>
          <If cond={this.props.hasSignIn}>
            <div
              className='Header-signIn'
              role='button'
              tabIndex='0'
              onClick={this.handleSignInClick}
            >
              <span>{signedInText}</span>
              <div className='Header-activeOverlay' />
            </div>
          </If>
        </div>
        <If cond={this.props.logo}>
          <ContentWrapper>
            {img}
          </ContentWrapper>
        </If>
      </header>
    )
  }
}

export default Header

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
import React from 'react'
import './Banner.css'

import photo from './photo.png'

export default function Banner(props) {
  const primaryStyle = {}
  const secondaryStyle = {}

  if (props.primaryColor) primaryStyle.color = props.primaryColor
  if (props.secondaryColor) secondaryStyle.color = props.secondaryColor

  return (
    <section className='Banner'>
      <div className='Banner-image'>
        <img
          alt=''
          src={props.photo || photo}
          width='140'
        />
      </div>
      <div>
        <h1 className='Banner-primaryText' style={primaryStyle}>{props.primaryText}</h1>
        <p className='Banner-secondaryText' style={secondaryStyle}>{props.secondaryText}</p>
      </div>
    </section>
  )
}


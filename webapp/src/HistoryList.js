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
import './HistoryList.css'

export default function HistoryList(props) {
  return (
    <div className='HistoryList'>
      <h2>History</h2>
      <ul>
        {props.items.map((item, i) => (
          <li key={i}>
            <div>{item[0]}</div>
            <div>{item[1]}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}


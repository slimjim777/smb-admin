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

import Banner from './Banner/Banner'

import {
  ContentWrapper,
  CardsList,
} from 'snapweb-toolkit'

const publicUrl =  process.env.PUBLIC_URL

export default function HomePage({
  bannerData,
  services,
  cardImgRootUrl,
  onOpenService,
}) {

  return (
    <div>
      <ContentWrapper>
        <Banner
          photo={`${publicUrl}/brands/${bannerData.photo}`}
          primaryText={bannerData.primaryText}
          secondaryText={bannerData.secondaryText}
          primaryColor={bannerData.primaryColor}
          secondaryColor={bannerData.secondaryColor}
        />
      </ContentWrapper>
      <ContentWrapper background bordered>
        <CardsList
          title='All Services'
          cards={services}
          cardImgRootUrl={cardImgRootUrl}
          onCardClick={onOpenService}
        />
      </ContentWrapper>
    </div>
  )
}

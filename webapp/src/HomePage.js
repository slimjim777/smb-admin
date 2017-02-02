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

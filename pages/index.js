import React, { useState, useEffect } from 'react'
import matter from 'gray-matter'
import Layout from '../components/Layout.js'
import BlogTitleBox from '../components/BlogTitleBox.js'
import PhotoGrid from '../components/PhotoGrid.js'
import Image from 'next/image'
import { Grid, Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'
import { Element } from 'react-scroll'

import flickrService from '../services/flickr'

function Homepage({ writings, photoData }) {

  return (
    <>
    <Layout isHomePage="true" >
    <div className="homepage-images" id="home-page-galleries">
        <Col xsOffset={1} xs={12}>
          <Row>
            <div className="homepage-section-title txt--gradient-green">
              Galleries
            </div>
            <div className="homepage-section-subtitle">
              Emotions I felt when taking them.
            </div>
          </Row>
            <Element id='home-page-images' name='home-page-images'>
              <PhotoGrid photoData={photoData} isHomePage={true}/>
            </Element>
        </Col>
    </div>
    <div className="writing-list" id="home-page-writings">
      <Col xsOffset={1} xs={12}>
        <Row>
          <div className="homepage-section-title txt--gradient-green">
            Writings
          </div>
          <div className="homepage-section-subtitle">
            Ramblings and Musings.
          </div>
        </Row>
        <Row>
            {writings.map((writing,idx) => {
              return (<BlogTitleBox writing={writing}/>)
            })}
        </Row>
      </Col>
      </div>
    </Layout>
    </>
  )
}

Homepage.getInitialProps = async(context) => {
  const writings = (context => {
      const keys = context.keys()
      const values = keys.map(context)
      const data = keys.map((key, index) => {
        const slug = key
          .replace(/^.*[\\\/]/, '')
          .split('.')
          .slice(0, -1)
          .join('.')
        const value = values[index]
        const document = matter(value.default)
        return { document, slug }
      })

      return data.slice().sort((a, b) => new Date(b.document.data.date) - new Date(a.document.data.date))
    })(require.context('../writings', true, /\.md$/))

    const photoData = await flickrService.getMyPhotosFromPhotoSets()

    return {
      writings,
      photoData
    }
}
export default Homepage

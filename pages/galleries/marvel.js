import React, { useState, useEffect } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'
import NavBar from '../../components/Navbar.js'
import PhotoGrid from '../../components/PhotoGrid.js'

import flickrService from '../../services/flickr'

function Marvel({photoData}) {
  return (
    <>
      <NavBar/>
      <div className="marvel-background">
        <Row center="xs">
          <Col className="marvel-header">
            Marvel
          </Col>
        </Row>
      </div>
      <Col xsOffset={1} xs={12}>
        <PhotoGrid photoData={photoData}/>
      </Col>
     </>
  )
}

Marvel.getInitialProps = async(context) => {
  const photoData = await flickrService.getPhotosFromAlbumName("marvel")
  console.log(photoData)

  return {
    photoData
  }
}

export default Marvel

import React, { useState, useEffect } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'
import NavBar from '../../components/Navbar.js'
import PhotoGrid from '../../components/PhotoGrid.js'

import flickrService from '../../services/flickr'

function Fleeting({photoData}) {

  return (
    <>
      <div className="fleeting-background">
        <NavBar/>
        <Grid className="photo-page">
          <Row top="m">
            <Col xsOffset={1} xs={12}>
              <h1 className="fleeting-header">Fleeting..</h1>
            </Col>
          </Row>
        </Grid>
        <Col xsOffset={1} xs={12}>
          <PhotoGrid photoData={photoData}/>
        </Col>
      </div>
     </>
  )
}

Fleeting.getInitialProps = async(context) => {
    const photoData = await flickrService.getPhotosFromAlbumName("fleeting")
    console.log(photoData)

    return {
      photoData
    }
}

export default Fleeting

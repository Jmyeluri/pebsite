import React from 'react'
import NavBar from './Navbar.js'
import Image from 'next/image'
import { Grid, Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'

const Layout = ({isHomePage, children, galleriesRef, writingsRef}) => {

  return (
    <>
      <div className="scenery">
      <NavBar isHomePage={isHomePage}/>
      <Grid className="homepage-intro">
        <Row top="xs">
          <Col xsOffset={1} xs={3}>
            <p className="homepage-greeting">Hello! I'm</p>
            <h1 className="homepage-name txt--gradient-green">Jayaram</h1>
          </Col>
        </Row>
      </Grid>
      </div>
      {children}
    </>
  )
}


export default Layout

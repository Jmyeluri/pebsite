import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'
import NavBar from '../../components/Navbar.js'
import PhotoGrid from '../../components/PhotoGrid.js'
import styled from "styled-components";

import flickrService from '../../services/flickr'

function Vast({photoData}) {

  const [scrollY, setScrollY] = useState(0)

  useLayoutEffect(() => {
    const onScroll = () => {
        if (window.scrollY < 350 && Math.abs(scrollY - window.scrollY) > 3) {
          console.log(window.scrollY)
          setScrollY(window.scrollY)
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  return (
    <>
      <NavBar/>
      <div className="vast-background">
        <Row center="xs">
          <Col className="vast-header letter-v">
            <VDiv transX={`-${scrollY * 2}px`}>
              V
            </VDiv>
          </Col>
          <Col className="vast-header">
          <ADiv transX={`-${scrollY}px`}>
            A
          </ADiv>
          </Col>
          <Col className="vast-header">
            <SDiv transX={`${scrollY}px`}>
              S
            </SDiv>
          </Col>
          <Col className="vast-header">
          <TDiv transX={`${scrollY * 2}px`}>
            T
          </TDiv>
          </Col>
        </Row>
      </div>
      <Col xsOffset={1} xs={12}>
        <PhotoGrid photoData={photoData}/>
      </Col>
     </>
  )
}

const VDiv = styled.div`
  transform: translateX(${({ transX }) => (transX)});
  transition: transform 0.5s;
`;

const ADiv = styled.div`
  transform: translateX(${({ transX }) => (transX)});
  transition: transform 0.5s;
`;

const SDiv = styled.div`
  transform: translateX(${({ transX }) => (transX)});
  transition: transform 0.5s;
`;

const TDiv = styled.div`
  transform: translateX(${({ transX }) => (transX)});
  transition: transform 0.5s;
`;

Vast.getInitialProps = async(context) => {
  const photoData = await flickrService.getPhotosFromAlbumName("vast")

  return {
    photoData
  }
}

export default Vast

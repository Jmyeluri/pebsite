import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Grid, Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'
import Masonry from "react-masonry-component";

const PhotoGrid = ({photoData, isHomePage}) => {
  const [photos, setPhotos] = useState([])

  const photoUrlHook = () => {
    if (!isHomePage) {
      setPhotos(photoData[0].photos.map(pInfo => {
        return {
            "title": pInfo.title,
            "url": `https://live.staticflickr.com/${pInfo.server}/${pInfo.id}_${pInfo.secret}.jpg`
          }
      }))
    } else {
      setPhotos(
        photoData.map((gallery) => {
          return {
            "title": gallery.photoSet.name,
            "url": gallery.photos.map(pInfo => `https://live.staticflickr.com/${pInfo.server}/${pInfo.id}_${pInfo.secret}.jpg`)[0]
          }
        })
      )
    }
  }

  const masonryOptions = {
    fitWidth: true,
    columnWidth: 100,
    gutter: 1
  };

  useEffect(photoUrlHook, [])

  return (
    <>
        <Masonry
          className={"grid"}
          elementType={"div"}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={true}
          >
          {console.log(photos)}
          {photos.map((photo, i) => {
            return (
              <div key={i}  className="img-hover-zoom">
                <div className="img-wrap">
                  <img src={photo.url} style={{ width: 300 }}/>
                  {isHomePage ? <a href={`/galleries/${photo.title}`} className="centered img-description"> {photo.title} </a> :
                                <p className="bottom-right img-description"> {photo.title} </p>
                  }
                </div>
              </div>
            );
          })}
        </Masonry>
    </>
  )
}

export default PhotoGrid

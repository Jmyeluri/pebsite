import React from 'react'

import { Grid, Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'

const BlogTitleBox = ({writing}) => {
  const {document: {data: {date, title}}, slug} = writing
  return (
    <Col md={6} className="blog-title-box">
        <Row className="title-row">
          <div>
            <a href={"/writings/" + slug} className="title-links">
              {title}
            </a>
          </div>
        </Row>
        <Row className="date-row" start="xs">
          <div className="blog-date">{date}</div>
        </Row>
    </Col>
  )
}

export default BlogTitleBox

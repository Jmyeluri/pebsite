import React from 'react'
import matter from 'gray-matter'
import { Grid, Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'
import ReactMarkdown from 'react-markdown'

function Writing({ content, data }) {

  // This holds the data between `---` from the .md file
  const frontmatter = data

  return (
    <>
      <div className="texture">
        <Col xsOffset={3} xs={7} className="home-button-col">
          <a className="home-button" href="/">
          🏠  Home
          </a>
        </Col>
        <Col>
          <Row className="blog-heading-row" bottom="xs">
              <Col xsOffset={3} xs={7}>
                <span className="blog-heading-title">{frontmatter.title}</span>
              </Col>
          </Row>
          <Row center="xs">
            <Col>
              <hr className="header"/>
            </Col>
          </Row>
          <Row bottom="xs">
            <Col xsOffset={3} xs={2}>
              <span className="blog-subtitle">{frontmatter.subtitle}</span>
            </Col>
            <Col xsOffset={3} xs={3}>
              <span className="blog-heading-date">
                {frontmatter.date}
              </span>
            </Col>
          </Row>
          <Row center="xs">
            <Col>
              <hr className="header"/>
            </Col>
          </Row>
          <Row center="xs">
            <Col xs={6} className="blog-article">
              <ReactMarkdown source={content} />
            </Col>
          </Row>
        </Col>
        </div>
    </>
  )
}

Writing.getInitialProps = async (context) => {
  const { slug } = context.query

  // Import our .md file using the `slug` from the URL
  const content = await import(`../../writings/${slug}.md`)

  // Parse .md data through `matter`
  const data = matter(content.default)

  // Pass data to our component props
  return { ...data }
}

export default Writing

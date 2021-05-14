import Head from 'next/head'

import '../styles/base.css'
import 'react-flexbox-grid/dist/react-flexbox-grid.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

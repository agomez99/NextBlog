import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { TrackingProvider } from '../contexts/trackers'

function MyApp({ Component, pageProps }) {
  return (
  <ThemeProvider>
    {/* <TrackingProvider> */}
      <Component {...pageProps} />
    {/* </TrackingProvider> */}
  </ThemeProvider>
  )
}

export default MyApp

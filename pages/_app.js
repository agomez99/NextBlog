import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { TrackingProvider } from '../contexts/trackers'
import { Provider } from '@lyket/react';
import Nav from '../components/Nav';
function MyApp({ Component, pageProps }) {
  return (
    <Provider apiKey="d3e047b731f001541f0cee799a0a36">

  <ThemeProvider>
    {/* <TrackingProvider> */}
    <Nav/>
      <Component {...pageProps} />
    {/* </TrackingProvider> */}
  </ThemeProvider>
  </Provider>
  )
}

export default MyApp

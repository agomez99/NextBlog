import { Component } from "react"
import Head from "next/head"
import Script from 'next/script'

export default class extends Component {
  render() {
    return (
      <>
        {
          process.env.NODE_ENV === "production" && process.browser ?
          <Head>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-B3BS32ER2W"></Script>
            <Script
              async
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag("js", new Date());

                gtag("config", "YOUR_MEASUREMENT_ID");`
              }}
            />
          </Head> : null
        }
      </>
    )
  }
}
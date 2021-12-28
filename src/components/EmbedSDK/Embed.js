// This is where the magic happens to embed a dashboard.

import React, { useCallback } from 'react'
import styled from "styled-components"
import { LookerEmbedSDK } from '@looker/embed-sdk'
import { Space } from '@looker/components'

const Embed = (props) => {

  const makeDashboard = useCallback((el) => {
    if (el) {
      el.innerHTML = ''
      /* 
        Step 1) call init() pointing the SDK to a looker host, a service to get the iframe URLs from, and passing user identifying information in the header
        no call to the auth service is made at this step
      */
      console.log("props.dashboard_id : ", props.dashboard_id);
      LookerEmbedSDK.init(
        process.env.LOOKERSDK_EMBED_HOST,
        {
          // The location of the service which will privately create a signed URL
          url: '/api/auth'
          , headers: [
            // include some factor which your auth service can use to uniquely identify a user, so that a user specific url can be returned. This could be a token or ID
            { name: 'usertoken', value: 'user1' }
          ]
        }
      )
      /*
        Step 2 Create your dashboard (or other piece of embedded content) through a simple set of chained methods
      */
      LookerEmbedSDK.createDashboardWithId("data_block_acs_bigquery::acs_census_overview")
        // adds the iframe to the DOM as a child of a specific element
        .appendTo(el)
        // this instructs the SDK to point to the /dashboards-next/ version
        .withNext()
        // the .on() method allows us to listen for and respond to events inside the iframe. See here for a list of events: https://docs.looker.com/reference/embedding/embed-javascript-events
        .on('dashboard:loaded', (e) => { alert('Successfully Loaded!') })
        // this line performs the call to the auth service to get the iframe's src='' url, places it in the iframe and the client performs the request to Looker
        .build()
        // this establishes event communication between the iframe and parent page
        .connect()
        // catch various errors which can occur in the process (note: does not catch 404 on content)
        .catch((error) => {
          console.error('An unexpected error occurred', error)
        })
    }
  }, [])


  return (
    <Space>
      <div className={"embed-dashboard-main"}>
        <PageTitle >Embedded Dashboard </PageTitle>
        { /* Step 0) we have a simple container, which performs a callback to our makeDashboard function */}
        <Dashboard ref={makeDashboard}></Dashboard>
      </div>
    </Space>
  )
}

// A little bit of style here for heights and widths.
const Dashboard = styled.div`
  width: 100%;
  height: 95vh;
  & > iframe {
    width: 100%;
    height: 100%;
  }
`

const PageTitle = styled.div`
  font-family: "Google Sans", "Open Sans", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #5F6368;
  font-weight: 200;
  margin-left: 3rem;
  }
`
export default Embed
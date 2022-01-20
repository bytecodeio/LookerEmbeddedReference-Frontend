
// Embedded dashboards let you build an interactive and highly curated data experience within your application
// This file is used to embed a dashboard using LookerEmbedSDK with EmbedBuilder to initialize your connection and help create the iframe element

//  In addition, this demonstrate how to bind events to the embedded dashboard. It uses React to manage references to the dashboard, 
// 


import React, { useCallback } from 'react'
import styled from "styled-components"
import { LookerEmbedSDK } from '@looker/embed-sdk'
import { Space } from '@looker/components'

const EmbedDashboardEvents = () => {

  /*
   Step 1 Initialization of the EmbedSDK happens when the user first access the application
   See App.js for reference
  */

  const makeDashboard = useCallback((el) => {
    if (el) {
      el.innerHTML = ''
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
        .on('dashboard:loaded', (e) => { console.log('On dashboards where the tiles are not set to auto-run, a dashboard and its elements have loaded but queries are not yet running.'); console.log(e)})
        .on('dashboard:run:start', (e) => { console.log('A dashboard has begun loading, and its tiles have started loading and querying for data.'); console.log(e)})
        .on('dashboard:run:complete', (e) => { console.log('A dashboard has finished running and all tiles have finished loading and querying.'); console.log(e)})
        .on('dashboard:download', (e) => { console.log('A PDF of a dashboard has started downloading.'); console.log(e)})
        .on('dashboard:save:complete', (e) => { console.log('A dashboard has been edited and saved.'); console.log(e)})
        .on('dashboard:delete:complete', (e) => { console.log('A dashboard has been deleted.'); console.log(e)})
        .on('dashboard:tile:start', (e) => { console.log('A tile has started loading or querying for data.'); console.log(e)})
        .on('dashboard:tile:complete', (e) => { console.log('A tile has finished running the query.'); console.log(e)})
        .on('dashboard:tile:download', (e) => { console.log('Tile data has started downloading.'); console.log(e)})
        .on('dashboard:tile:explore', (e) => { console.log('A user has clicked the Explore From Here option in a dashboard tile.'); console.log(e)})
        .on('dashboard:tile:view', (e) => { console.log('A user has clicked the View Original Look option in a dashboard tile.'); console.log(e)})
        .on('dashboard:filters:changed', (e) => { console.log('Filters have been applied or changed.'); console.log(e)})
        .on('drillmenu:click', (e) => { console.log('A user has clicked on a drill menu in a dashboard that was created with the link LookML parameter.'); console.log(e)})
        .on('drillmodal:download', (e) => { console.log('ADDED7.20 A user has opened a drill dialog box from a dashboard tile and clicked the Download option.'); console.log(e)})
        .on('drillmodal:explore', (e) => { console.log('A user has clicked the Explore From Here option in a drill dialog box.'); console.log(e)})
        .on('page:changed', (e) => { console.log('A user has navigated to a new page within the iframe.'); console.log(e)})
        .on('page:properties:changed', (e) => { console.log(e,'Page loaded'); console.log(e)})
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
        <PageTitle >Embedded Dashboard with JavaScript Events</PageTitle>
        <div>View the JavaScript event details logged in your browser's developer console!</div>
        { /* Step 0) we have a simple container, which performs a callback to our makeDashboard function */}
        <Dashboard ref={makeDashboard}></Dashboard>
      </div>
    </Space>
  )
}

// A little bit of style here for heights and widths.
const Dashboard = styled.div`
  width: 100%;
  height: 85vh;
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
export default EmbedDashboardEvents
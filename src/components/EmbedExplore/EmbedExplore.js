// Embedded Explore Pages allow you to expose your modeled data to power users and allow users to create and save content in a highly curated experience within your application
// This file is used to embed an explore using LookerEmbedSDK with EmbedBuilder to initialize your connection and help create the iframe element

import React, { useCallback } from 'react'
import styled from "styled-components"
import { LookerEmbedSDK } from '@looker/embed-sdk'

/**
   * First initialized the embed sdk using the endpoint in /backend/routes/api.js
   * Gets explore with ID, can be found in the url by viewing the explore via your looker instance   */


const EmbedExplore = () => {
  const createExplore = useCallback((el) => {
    if (el) {
      el.innerHTML = ''
    /* 
      Step 1 - call init() pointing the SDK to a looker host, a service to get the iframe URLs from, and passing user identifying information in the header
      no call to the auth service is made at this step
    */
    LookerEmbedSDK.init(
      process.env.LOOKERSDK_EMBED_HOST, 
      { 
        // The location of the service which will privately create a signed URL
        url: '/api/auth' ,
        // include some factor which your auth service can use to uniquely identify a user, so that a user specific url can be returned. This could be a token or ID
        headers: [{ name: 'usertoken', value: 'user1' } ]}
      )

    /*
      Step 2 - Create your Explore through a simple set of chained methods
    */
    LookerEmbedSDK.createExploreWithId("data_block_acs_bigquery/acs_census_data")
    // adds the iframe to the DOM as a child of a specific element
    .appendTo(el)
    // this line performs the call to the auth service to get the iframe's src='' url, places it in the iframe and the client performs the request to Looker
    .build()
    // this establishes event communication between the iframe and parent page
    .connect()
    // catch various errors which can occur in the process (note: does not catch 404 on content)
    .catch((error) => {
      console.error('An unexpected error occurred', error)
    })
  }},[])
  return (
    <>
      <div className='stuff' style={{width: '100%', height: '100%'}}>
        <PageTitle>Embedded Explore</PageTitle>
        { /* Step 0 - we have a simple container, which performs a callback to our createExplore function */}
        <Explore ref={createExplore}></Explore>
      </div>
    </>
  )
}

const Explore = styled.div`
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

export default EmbedExplore
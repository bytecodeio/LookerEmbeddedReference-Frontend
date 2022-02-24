import React, { useCallback }  from 'react'
import styled from "styled-components"
import { Accordion2, Accordion, AccordionDisclosure, Space } from '@looker/components'
//Alias an additional import of the embed sdk
import { LookerEmbedSDK, LookerEmbedSDK as LookerEmbedSDK2 } from '@looker/embed-sdk'
import { PageTitle } from '../common/PageTitle'

const EmbedTwoIframes = () => {

  // Create a variable to hold the Embed Host
  const hostUrl = process.env.LOOKERSDK_EMBED_HOST

  /*
   Step 1 Initialization of the EmbedSDK happens when the user first access the application
   See App.js for reference
  */

   /*
      NOTE - You only need to initialize the EmbedSDK once when displaying multiple embeds on a single page
   */

  const showVisualization = useCallback((el) => {
    if (!el) {
      return
    }
    el.innerHTML = ''
      /*
        Step 2a Create your query visualization (or other piece of embedded content) through a simple set of chained methods
          - An embedded query is built by creating an explore with url, and passing in this special pattern:
             /embed/query/<<model>>/<<explore>>?qid=<<qid>> (the qid could be obtained from the API. This is the pattern used in this example)
          - OR the "expanded share url" giving you the ability to affect the vis config or really any attribute of the vis
             /embed/query/<<model>>/<<explore>>?fields=<<my field list with a new field>>&sorts=<<>> limit .... &vis_config=<<my vis config with a different vis type>>.....
          - Just also make sure to append &sdk=2&embed_domain=<<hostUrl>>&sandboxed_host=true to the end of the url too.
      */
      LookerEmbedSDK.createExploreWithUrl(`${hostUrl}/embed/query/data_block_acs_bigquery/acs_census_data?qid=ybtbcpX9SV5bx4HC9Kp1Yw&sdk=2&embed_domain=${hostUrl}&sandboxed_host=true`)
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
    }
  )


  const makeDashboard = useCallback((el) => {
    if (!el) {
      return
    }
    el.innerHTML = ''
    /*
      Step 2b Create your dashboard (or other piece of embedded content) through a simple set of chained methods
    */
    LookerEmbedSDK.createDashboardWithId("data_block_acs_bigquery::acs_census_overview")
      // adds the iframe to the DOM as a child of a specific element
      .appendTo(el)
      // this instructs the SDK to point to the /dashboards-next/ version
      .withNext()
      // this line performs the call to the auth service to get the iframe's src='' url, places it in the iframe and the client performs the request to Looker
      .build()
      // this establishes event communication between the iframe and parent page
      .connect()
      // catch various errors which can occur in the process (note: does not catch 404 on content)
      .catch((error) => {
        console.error('An unexpected error occurred', error)
      })
  }, [])


  return (
    <>
          <PageTitle text={'Multiple Embeds'} />
          <Accordion2 indicatorPosition="left" label='Dashboard'>
          { /* Step 0b - we have a simple container, which performs a callback to our makeDashboard function */}
            <Dashboard ref={makeDashboard}></Dashboard>
          </Accordion2>
          <Accordion2 indicatorPosition="left" defaultOpen label="Query">
          { /* Step 0a - we have a simple container, which performs a callback to our showVisualization function */}
            <Query ref={showVisualization}></Query>
          </Accordion2>

          
    </>
  )
}



const Dashboard = styled.div`
  width: 100%;
  height: 45vh;
  & > iframe {
    width: 100%;
    height: 100%;
  }
` 

const Query = styled.div`
  width: 100%;
  height: 35vh;
  & > iframe {
    width: 100%;
    height: 100%;
  }
` 
export default EmbedTwoIframes
import React, { useCallback, useEffect }  from 'react'
import styled from "styled-components"
//Alias an additional import of the embed sdk
import { LookerEmbedDashboard, LookerEmbedSDK, LookerEmbedSDK as LookerEmbedSDK2 } from '@looker/embed-sdk'
import { Button, ButtonItem, ButtonToggle, ToggleSwitch, Space } from '@looker/components'
import { sdk } from '../../helpers/CorsSessionHelper'

const EmbedDashboardDownload = () => {

  // Function that downloads the Dashboard into a PDF
  const handleDownload =  async () => {
    try {
      // Starts by creating a dashboard render task with the dashboard ID, result format and height/width
      // https://docs.looker.com/reference/api-and-integration/api-reference/v4.0/render-task#create_dashboard_render_task
      let response = await sdk.ok(sdk.create_dashboard_render_task(
        {
          dashboard_id: 'data_block_acs_bigquery::acs_census_overview',
          result_format: 'pdf',
          width: 1200,
          height: 1200,
          body:{}
        }))

      // Initialize a variable for the do while loop
      let rendered = false;

      // A do while loop to check the statuse of the render task
      do {
        // Getting the status of the render task by passing the render task id to the endpoint render_task
        // https://docs.looker.com/reference/api-and-integration/api-reference/v4.0/render-task#get_render_task
        let task = await sdk.ok(sdk.render_task(response.id))

        // Check if the status is success to break out of the loop
        if (task.status === "success") {
          rendered=true;
        }        
      } while (rendered===false)
      
      // The task has finished rendering and can get the result which is returned as a Blob
      let blob = await sdk.ok(sdk.render_task_results(response.id))
      // Create a url to open the blob in another tab
      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.log(error)
    }

  }

  /*
   Step 1 Initialization of the EmbedSDK happens when the user first access the application
   See App.js for reference
  */

  const makeDashboard = useCallback((el) => {
    if (!el) {
      return
    }
    el.innerHTML = ''
    /*
      Step 2 - Create your dashboard (or other piece of embedded content) through a simple set of chained methods
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
          <PageTitle>Dashboard Download</PageTitle>
          <Space>
            {/* Create a button that initializes the function that downloads the Dashboard */}
            <Button onClick={handleDownload}>Download</Button>
          </Space>
          { /* Step 0 - we have a simple container, which performs a callback to our makeDashboard function */}
          <Dashboard ref={makeDashboard}></Dashboard>
    </>
  )
}

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
export default EmbedDashboardDownload
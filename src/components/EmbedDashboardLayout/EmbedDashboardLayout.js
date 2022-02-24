import React, { useCallback, useEffect }  from 'react'
import styled from "styled-components"
//Alias an additional import of the embed sdk
import { LookerEmbedDashboard, LookerEmbedSDK, LookerEmbedSDK as LookerEmbedSDK2 } from '@looker/embed-sdk'
import { Button, ButtonItem, ButtonToggle, ToggleSwitch, Space } from '@looker/components'

// Additional js file that holds static values that will be used in this component
import { newLayoutComponents, bluePallette } from './constant'
import { PageTitle } from '../common/PageTitle'

const EmbedDashboardLayout = () => {
  const [dashboard,setDashboard] = React.useState()
  const [dashboardOptions, setDashboardOptions] = React.useState()
  const [originalLayout, setOriginalLayout] = React.useState()
  const [toggleSelection, setToggleSelection] = React.useState('Show Maps')
  const [toggleColorSelection, setToggleColorSelection] = React.useState('')
  const [dashboardElements, setDashboardElements] = React.useState()

  // Function that runs after the "dashboard:run:complete event that initializes the Dashboard Options
  const initializeDashboardOptions = (event) => {    
    // Checks if this is the initial dashboard load
    if (!originalLayout) {
      // Set original elements
      setDashboardElements(event.dashboard.options.elements);
      // Set original layout
      setOriginalLayout(event.dashboard.options.layouts[0].dashboard_layout_components);
    }  
    // Sets dashboard options for everytime the "dashboard:run:complete" event is triggered
    setDashboardOptions(event.dashboard.options);
  }

  // Sets the dashboard state
  const setupDashboard = (dashboard) => {
    setDashboard(dashboard);
  }

  // Function that hides the elements that have map visualizations in the dashboard layout
  const hideMaps = () => {
    const newOptions = dashboardOptions;
    // Takes the list from the constant.js to update the options
    newOptions.layouts[0].dashboard_layout_components = newLayoutComponents;
    // Updates the dashboard options with the changes
    dashboard.setOptions(newOptions)
  }

  // Function that shows the initial layout
  const showMaps = () => {
    const newOptions = dashboardOptions;
    // Takes from the originalLayout state
    newOptions.layouts[0].dashboard_layout_components = originalLayout;
    // Updates the dashboard options with the changes
    dashboard.setOptions(newOptions)
  }

  const useBluePallete = () => {
    const newOptions = dashboardOptions;
    // Loops through the bluePallete variable and updates the vis_config for each element
    bluePallette.map(b => {
      const keys = Object.keys(b.vis_config);
      keys.map(k => {
        const value = b.vis_config[k];
        newOptions.elements[b.id].vis_config[k] = value;
      })
    })
    // Updates the dashboard options with the changes
    dashboard.setOptions(newOptions)
  }

  const handleColorToggle = (color) => {
    if (color == "") {
      const newOptions = dashboardOptions;
      // Returns the elements to the original values
      newOptions.elements = dashboardElements;
      // Updates the dashboard options with the changes
      dashboard.setOptions(newOptions)
    }
    setToggleColorSelection(color);
  }

  const makeDashboard = useCallback((el) => {
    if (!el) {
      return
    }
    el.innerHTML = ''
    /*
      Step 2 Create your dashboard (or other piece of embedded content) through a simple set of chained methods
    */
    LookerEmbedSDK.createDashboardWithId("data_block_acs_bigquery::acs_census_overview")
    
      // adds the iframe to the DOM as a child of a specific element
      .appendTo(el)
      // this instructs the SDK to point to the /dashboards-next/ version
      .withNext()
      // this is an event listener for when the dashboard is finished running
      .on('dashboard:run:complete', initializeDashboardOptions)
      // this line performs the call to the auth service to get the iframe's src='' url, places it in the iframe and the client performs the request to Looker
      .build()
      // this establishes event communication between the iframe and parent page
      .connect()
      // this line sets up the dashboard after the building is complete
      .then(x => setupDashboard(x))
      // catch various errors which can occur in the process (note: does not catch 404 on content)
      .catch((error) => {
        console.error('An unexpected error occurred', error)
      })
  }, [])


  return (
    <>
          <PageTitle text={'Dashboard Layout'} />
          {/* Elements that contain the toggles for the Layouts and the vis_config color changes*/}
          <ToggleArea>
            <ButtonToggle value={toggleSelection} onChange={setToggleSelection}>
              <ButtonItem onClick={showMaps}>Show Maps</ButtonItem>
              <ButtonItem onClick={hideMaps}>Hide Maps</ButtonItem>
            </ButtonToggle>
            <ButtonToggle style={colorToggleStyle} value={toggleColorSelection} onChange={(color) => handleColorToggle(color)} nullable>
              <ButtonItem onClick={useBluePallete} value="Blue">
                <BlueIcon />
              </ButtonItem>
            </ButtonToggle>
          </ToggleArea>
          { /* Step 0 - we have a simple container, which performs a callback to our makeDashboard function */}
          <Dashboard ref={makeDashboard}></Dashboard>
    </>
  )
}

const colorToggleStyle = {  
  'marginLeft':'auto',
  'marginRight': '40px'
}

const ToggleArea = styled.div
`
  margin-top:20px;
  margin-left:20px;
  display:flex
`

const Dashboard = styled.div`
  width: 100%;
  height: 75vh;
  & > iframe {
    width: 100%;
    height: 100%;
  }
` 
const BlueIcon = styled.span`
  background-color:rgb(87, 128, 205);
  width:25px;
  height:25px;
  border-radius:50%;
`

export default EmbedDashboardLayout
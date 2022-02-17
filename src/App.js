import React, { useEffect } from 'react'
import EmbedDashboard from './components/EmbedDashboard'
import EmbedExplore from './components/EmbedExplore'
import VizComponent from './components/VizComponent/VizComponent'
import VizComponentWFilter from './components/VizComponent/VizComponentWFilter'
import EmbedQuery from './components/EmbedQuery'
import EmbedDashboardEvents from './components/EmbedDashboardEvents'
import './App.css'
import TopBanner from './components/Navigation/TopBanner'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

// import EmbedLookSDK from './components/EmbedLookSDK'
import { ComponentsProvider } from '@looker/components-providers'
import Container from './RouteContainer'
import { Layout, Box, Space } from '@looker/components';
import { NavigationMenu } from './components/Navigation/NavigationMenu';
import { EmbedSDKInit } from './components/common/EmbedInit'
import EmbedTwoIframes from './components/EmbedTwoIframes/EmbedTwoIframes'
import EmbedDashboardLayout from './components/EmbedDashboardLayout/EmbedDashboardLayout'
import EmbedDashboardDownload from './components/EmbedDashboardDownload/EmbedDashboardDownload'

const routes =
{
  title: "Embed Examples",
  examples: [
    {
      url: '/embed-dashboard',
      text: 'Embedded Dashboard',
      component: (<EmbedDashboard />)
    },
    {
      url: '/embed-explore',
      text: 'Embedded Explore',
      component: (<EmbedExplore />)
    },
    {
      url: '/embed-query',
      text: 'Embedded Query',
      component: (<EmbedQuery />)
    },
    {
      url: '/viz-component',
      text: 'Visualization Component',
      component: (<VizComponent />)
    },
    {
      url: '/viz-component-w-filter',
      text: 'Visualization Component + Filter',
      component: (<VizComponentWFilter />)
    },
    {
      url: '/dashboard-events',
      text: 'JavaScript Events',
      component: (<EmbedDashboardEvents />)
    },
    {
      url: '/multiple-embeds',
      text: 'Multiple Embeds',
      component: (<EmbedTwoIframes />)
    },
    {
      url: '/dashboard-layout',
      text: 'Dynamic Dashboard Layout',
      component: (<EmbedDashboardLayout />)
    },
    {
      url: '/dashboard-download',
      text: 'Dashboard Download',
      component: (<EmbedDashboardDownload />)
    },
    // Uncomment the code below to add an additional route to an embedded Look.
    // {
    //   url: '/embed-look',
    //   text: 'Embed Look',
    //   component:(<EmbedLookSDK />)
    // },
  ]
}

function App() {

  const [menuToggle, setMenuToggle] = React.useState(true)
  // This code adds a Components Provider, which allows Looker components to be easily used later
  // It also adds a top banner, which includes navigation
  // It switches 'routes' based on the path and renders a 'Container' with the appropriate content

  /* 
    Calls EmbedSDK init() pointing the SDK to a looker host, a service to get the iframe URLs from, and passing user identifying information in the header
    no call to the auth service is made at this step
  */
  EmbedSDKInit();


  return (
    <ComponentsProvider>
      <Router>
        <TopBanner setMenuToggle={setMenuToggle} menuToggle={menuToggle} />
        <Space>
          <NavigationMenu menuToggle={menuToggle} routes={routes} />
          <Routes>
            <Route exact path='/' element={<Navigate replace to={routes.examples[0].url} />} />

            {routes.examples.map(e => {
              return (
                <Route path={e.url} default element={<Container content={e.component} />} key={e.text} />
              )
            })
            }
          </Routes>
        </Space>

      </Router>
    </ComponentsProvider>
  )
}

export default App

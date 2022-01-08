import React, { useEffect } from 'react'
import EmbedSDK from './components/EmbedSDK'
import EmbedExplore from './components/EmbedExplore'
import VizComponent from './components/VizComponent'
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
import { Layout,Box, Space } from '@looker/components';
import { NavigationMenu } from './components/Navigation/NavigationMenu';

const routes =
{
  title: "Embed Examples",
  examples: [
    {
      url: '/embed-dashboard',
      text: 'Embedded Dashboard',
      component: (<EmbedSDK dashboard_id="data_block_acs_bigquery::acs_census_overview" />)
    },
    {
      url: '/embed-explore',
      text: 'Embedded Explore',
      component: (<EmbedExplore exploreId="data_block_acs_bigquery/acs_census_data" />)
    },
    {
      url: '/viz-component',
      text: 'Visualization Component',
      component: (<VizComponent queryNumber="5742" />)
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
  const [currentRoute, setCurrentRoute] = React.useState()
  // This code adds a Components Provider, which allows Looker components to be easily used later
  // It also adds a top banner, which includes navigation
  // It switches 'routes' based on the path and renders a 'Container' with the appropriate content


  return (
    <ComponentsProvider>
      <Router>
        <TopBanner setMenuToggle={setMenuToggle} menuToggle={menuToggle} />
        <Space>
          <NavigationMenu menuToggle={menuToggle} routes={routes} />      
          <Routes>
            <Route exact path='/'  element={<Navigate replace to={routes.examples[0].url} />} />
      
            {routes.examples.map(e => {
              return (
                <Route path={e.url} default element={<Container content={e.component} />} />
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

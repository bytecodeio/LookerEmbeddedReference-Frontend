import React from 'react'
import EmbedSDK from './components/EmbedSDK'
import './App.css'
import TopBanner from './components/Navigation/TopBanner'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// import EmbedLookSDK from './components/EmbedLookSDK'
import { ComponentsProvider } from '@looker/components-providers'
import Container from './RouteContainer'

const routes =
{
  title: "Embed Examples",
  examples: [
    {
      url: '/embed-dashboard',
      text: 'Dashboard',
      component: (<EmbedSDK dashboard_id="data_block_acs_bigquery::acs_census_overview" />)
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
  // This code adds a Components Provider, which allows Looker components to be easily used later
  // It also adds a top banner, which includes navigation
  // It switches 'routes' based on the path and renders a 'Container' with the appropriate content

  return (
    <ComponentsProvider>
      <Router>
        <TopBanner routes={routes} />
        <Routes>
          <Route exact path='/' element={< Container content={routes.examples[0].component} />} />
    
          {routes.examples.map(e => {
            return (
              <Route path={e.url} default element={<Container content={e.component} />} />
            )
          })
          }
        </Routes>
      </Router>
    </ComponentsProvider>
  )
}

export default App

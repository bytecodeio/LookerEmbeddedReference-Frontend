import React, { useEffect, useState } from 'react'
import EmbedSDK from './components/EmbedSDK'
import EmbedWithApi from './components/EmbedWithApi'
import APIDataContainer from './components/ApiDataBackend'
import ApiQueryFrontend from './components/ApiQueryFrontend'
import CorsExample from './components/CorsExample'
import DashboardExternalFilters from './components/DashboardExternalFilters'
import D3CustomVis from './components/D3CustomVis'
import EmbedTwoInstances from './components/EmbedTwoInstances'
import EmbedExplore from './components/EmbedExplore'
import DashFilters from './components/DashFilters'
import Navigation from './components/Navigation/Navigation'
import './App.css'
import {Layout, Space} from '@looker/components'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ReactDOMServer from 'react-dom/server'
import EmbedLookSDK from './components/EmbedLookSDK'
import { ComponentsProvider } from '@looker/components-providers'
import Container from './RouteContainer'

const routes = 
    [
      {
        title: "Embed Examples",
        examples: [
          {
            url: '/embed-dashboard',
            text: 'Dashboard',
            component:(<EmbedSDK dashboard_id={"data_block_acs_bigquery::acs_census_overview"} />)
          },
          // {
          //   url: '/embed-look',
          //   text: 'Embed Look',
          //   component:(<EmbedLookSDK />)
          // },
        ]
      }      
    ]


const params = {
  examples: [
    {
      url: '/examples/embed-sdk',
      text: 'Basic Embed with SDK'
    },
    {
      text: 'API Data fetched from backend',
      url: '/examples/api-data-backend'
    },
    {
      text: 'Frontend Data Query',
      url: '/examples/api-query-frontend'
    },
    {
      text: 'Embed With API Example',
      url: '/examples/embed-api'
    },
    {
      text: 'Cors',
      url: '/examples/cors'
    },
    {
      text: 'Embed A Look',
      url: '/examples/embed-look'
    },
    {
      text: 'Embed A Dashboard with External Page Filters',
      url: '/examples/embed-dashboard-external-filters'
    },
    {
      text: 'D3.js Custom Vis',
      url: '/examples/d3-custom-vis'
    },
    {
      text: 'Embed Two',
      url: '/examples/embed-two'
    },
    {
      text: 'Embed Explore',
      url: '/examples/embed-explore'
    },
    {
      text: 'Dashboard w External Filters',
      url: '/examples/dash-filters'
    }
  ]
} 


function App() {

  return (
    <ComponentsProvider>
      <Space className='top-banner'>
      </Space>
        <Router>  
          <Layout hasAside>      
          <Navigation 
            routes={routes}
            />
          <div>
            <Switch>
              {/* <Route path='/' component={SelectExample} exact /> */}
              {routes.map((r) => {
                console.log(routes);
                return (
                r.examples.map(e => {
                  return(
                    <Route path={e.url} component={() => <Container content={e.component} />} />
                  )                  
                }))
              })}
            </Switch>
          </div>
          </Layout>
        </Router>      
    </ComponentsProvider>
  )
}
export default App

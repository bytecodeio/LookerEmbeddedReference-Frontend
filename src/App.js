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
  Navigate,
  useLocation
} from "react-router-dom";

// import EmbedLookSDK from './components/EmbedLookSDK'
import { ComponentsProvider } from '@looker/components-providers'
import Container from './RouteContainer'
import { Layout, Box, Space } from '@looker/components';
import { NavigationMenu } from './components/Navigation/NavigationMenu';
import { CodeView } from './components/Navigation/CodeView';
import { EmbedSDKInit } from './components/common/EmbedInit'

const routes =
{
  title: "Embed Examples",
  examples: [
    {
      url: '/embed-dashboard',
      text: 'Embedded Dashboard',
      component: (<EmbedDashboard />),
      github: 'https://raw.githubusercontent.com/bytecodeio/LookerEmbeddedReference-Frontend/main/src/components/EmbedDashboard/EmbedDashboard.js?token=GHSAT0AAAAAABOZLN3Q6TE76IQEKAZV6ZV2YQX2MUQ'
    },
    {
      url: '/embed-explore',
      text: 'Embedded Explore',
      component: (<EmbedExplore />),
      github: 'https://raw.githubusercontent.com/bytecodeio/LookerEmbeddedReference-Frontend/main/src/components/EmbedExplore/EmbedExplore.js?token=GHSAT0AAAAAABOZLN3R4SOM3VOXH7QL7RCKYQX2NKQ'
    },
    {
      url: '/embed-query',
      text: 'Embedded Query',
      component: (<EmbedQuery />),
      github: 'https://raw.githubusercontent.com/bytecodeio/LookerEmbeddedReference-Frontend/main/src/components/EmbedQuery/EmbedQuery.js?token=GHSAT0AAAAAABOZLN3QLGSSBC3QSJIQZSQ2YQX2N4A'
    },
    {
      url: '/viz-component',
      text: 'Visualization Component',
      component: (<VizComponent />),
      github: 'https://raw.githubusercontent.com/bytecodeio/LookerEmbeddedReference-Frontend/main/src/components/VizComponent/VizComponent.js?token=GHSAT0AAAAAABOZLN3RH5FOANCWWDDJNZAIYQX2OJQ'
    },
    {
      url: '/viz-component-w-filter',
      text: 'Visualization Component + Filter',
      component: (<VizComponentWFilter />),
      github: 'https://raw.githubusercontent.com/bytecodeio/LookerEmbeddedReference-Frontend/main/src/components/VizComponent/VizComponentWFilter.js?token=GHSAT0AAAAAABOZLN3RH5FOANCWWDDJNZAIYQX2OJQ'
    },
    {
      url: '/dashboard-events',
      text: 'JavaScript Events',
      component: (<EmbedDashboardEvents />),
      github: 'https://raw.githubusercontent.com/bytecodeio/LookerEmbeddedReference-Frontend/main/src/components/EmbedDashboardEvents/EmbedDashboardEvents.js?token=GHSAT0AAAAAABOZLN3QK3X54CT4TQEM7IP2YQX2O6A'
    },
    // Uncomment the code below to add an additional route to an embedded Look.
    // {
    //   url: '/embed-look',
    //   text: 'Embed Look',
    //   component:(<EmbedLookSDK />),
    //   github: ''
    // },
  ]
}

function App() {

  const [menuToggle, setMenuToggle] = React.useState(true)
  const [codeToggle, setCodeToggle] = React.useState(false)
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
        <TopBanner setMenuToggle={setMenuToggle} menuToggle={menuToggle} setCodeToggle={setCodeToggle} codeToggle={codeToggle} />
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
          <CodeView codeToggle={codeToggle} routes={routes}/>
        </Space>

      </Router>
    </ComponentsProvider>
  )
}

export default App

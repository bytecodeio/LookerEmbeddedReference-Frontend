// This is where the magic happens to embed a dashboard.

import React from 'react'


import { sdk } from "../../helpers/CorsSessionHelper"
import { Query, Visualization, QueryFormatter } from '@looker/visualizations'

const EmbedComponent = (props) => {
  return (
    <Query sdk={sdk} query={props.queryNumber}>
      <Visualization />
    </Query>
  )
}

export default EmbedComponent
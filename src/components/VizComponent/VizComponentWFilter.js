/* This displays a visualization from the Visualization Components library.
 This only supports a limited number of visualization types. Find them here:
 https://docs.looker.com/data-modeling/extension-framework/vis-components
 It renders much faster than an Iframe embed!

 This example includes query creation, where it generates a new query. 

 The minimal example for a visualization component is just: 
  <Query sdk={sdk} query={123}>
    <Visualization>
  </Query
*/

import React, { useState, useEffect } from 'react'
import { sdk } from "../../helpers/CorsSessionHelper"
import { Query, Visualization } from '@looker/visualizations'
import { Space, SpaceVertical, FieldRangeSlider } from '@looker/components'
import { sampleQuery } from './sampleQuery'
import styled from 'styled-components'

const EmbedComponent = (props) => {
  // Add 2 variables to state, so that the user controls the population passed in the query
  const [queryId, updateQueryId] = useState()
  const [populationFilter, updatePopulationFilter] = useState([0, 500000000])

  // This creates a sample query to display.
  // This works well on any looker instance with the necessary lookML model (from the census block).
  // If you have a static query ID, you can use that instead of doing this extra step.
  useEffect(() => {
    sampleQuery.filters["blockgroup.total_pop"] = JSON.stringify(populationFilter)
    sdk.ok(sdk.create_query(JSON.stringify(sampleQuery), 'id'))
      .then(res => updateQueryId(res.id))
    // The second argument to the effect is an array of elements to 'watch'. 
    // A single variable makes the effect run when the populationFilter changes.
  }, [populationFilter])


  return (
    <Space>
      <div className={"embed-dashboard-main"}>
        <SpaceVertical gap={'large'}>
          <PageTitle>Visualization Component With Filter</PageTitle>
          <FieldRangeSlider 
            label={"Population Filter:"} 
            min={0} 
            max={50000000} 
            step={500000} 
            width={500} 
            onChange={updatePopulationFilter} />
          <Query sdk={sdk} query={queryId}>
            <Visualization />
          </Query>
        </SpaceVertical>
      </div>
    </Space>
  )
}

const PageTitle = styled.div`
  font-family: "Google Sans", "Open Sans", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #5F6368;
  font-weight: 200;
  margin-left: 3rem;
  }
`

export default EmbedComponent
/* This displays a visualization from the Visualization Components library.
 This only supports a limited number of visualization types. Find them here:
 https://docs.looker.com/data-modeling/extension-framework/vis-components
 It renders much faster than an Iframe embed!

 This example includes a query picker, where it allows the user to choose a query. 

 The minimal example for a visualization component is just: 
  <Query sdk={sdk} query={123}>
    <Visualization>
  </Query
*/

import React, { useState } from 'react'
import { sdk } from "../../helpers/CorsSessionHelper"
import { Query, Visualization, QueryFormatter } from '@looker/visualizations'
import { Button, InputText, Link, Space, SpaceVertical } from '@looker/components'
import { Settings } from '@styled-icons/material-outlined'

const EmbedComponent = (props) => {
  // Add 2 variables to state, so that the user controls when the input is complete
  const [queryId, updateQueryId] = useState()
  const [confirmedId, confirm] = useState(props.queryNumber)

  // Add two helper functions to handle the state updates
  const updateFromInput = (event) => { updateQueryId(event.currentTarget.value) }
  const confirmId = () => confirm(queryId)

  return (
    <SpaceVertical>
      <Space><InputText
        autoResize
        name="queryIdorSlug"
        placeholder="Query ID or Slug"
        iconBefore={<Settings />}
        onChange={updateFromInput}
      />
        <Button onClick={confirmId}>Go</Button>
        <Link href={`${process.env.LOOKER_API_HOST}/admin/queries`}>Look up Query ID</Link>
      </Space>
      <Query sdk={sdk} query={confirmedId}>
        <Visualization />
      </Query>
    </SpaceVertical>
  )
}

export default EmbedComponent
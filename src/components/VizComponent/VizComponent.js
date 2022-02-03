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
import { InputText, Link, Space, SpaceVertical } from '@looker/components'
import { Settings } from '@styled-icons/material-outlined'
import styled from "styled-components"

const EmbedComponent = (props) => {
  // Add 2 variables to state, so that the user controls when the input is complete
  const [queryId, updateQueryId] = useState()
  const [confirmedId, confirm] = useState(props.queryNumber)

  // Add two helper functions to handle the state updates
  const updateFromInput = (event) => { updateQueryId(event.currentTarget.value) }
  const confirmId = () => confirm(queryId)

  return (
    <SpaceVertical>
      <Space>
      <InputText
        autoResize
        name="queryIdorSlug"
        placeholder="Query ID or Slug"
        iconBefore={<Settings />}
        onChange={updateFromInput}
      />
      <Button onClick={confirmId} >Go</Button>
      <Link href={`${process.env.LOOKER_API_HOST}/admin/queries`}>Look up Query ID</Link>
    </Space>
      <Query sdk={sdk} query={confirmedId}>
        <Visualization />
      </Query>
    </SpaceVertical>
  )
}

const Button = styled.button`
background: rgb(66, 133, 244); 
border: 1px solid rgb(66, 133, 244);
padding: 0px 1.5rem;
-webkit-box-align: center;
align-items: center;
border-radius: 5px; 
cursor: pointer;
font-weight: 500;
-webkit-box-pack: center;
justify-content: center;
line-height: 1;
font-size: 0.875rem;
height: 36px
`
export default EmbedComponent
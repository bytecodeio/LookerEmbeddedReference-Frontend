// Not yet implemented in the App.js file
// To use this functionality, add a Route to this content

import React from 'react'
import APIData from './APIData'

import { ComponentsProvider } from '@looker/components'

const APIDataContainer = (() => {
  return (
    <ComponentsProvider>
      <APIData />
    </ComponentsProvider>
  )
})

export default APIDataContainer
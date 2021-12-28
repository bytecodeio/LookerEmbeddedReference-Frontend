// Not yet implemented in the App.js file
// To use this functionality, add a Route to this content

import React from 'react'

import { ComponentsProvider } from '@looker/components'

import D3CustomVisComponent from './D3CustomVis'


const D3CustomVis = (() => {
  return(
    <ComponentsProvider>
        <D3CustomVisComponent />
    </ComponentsProvider>
  )
})

export default D3CustomVis
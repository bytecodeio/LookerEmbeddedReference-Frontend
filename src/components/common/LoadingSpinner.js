import styled from "styled-components"
import React from "react"
import { Spinner } from "@looker/components"

  export const LoadingSpinner = ({loading}) => {
    return (
      <>
      {loading && <Spinner size={60} color="rgb(26, 115, 232)"/>}
      </>
    )      
  }



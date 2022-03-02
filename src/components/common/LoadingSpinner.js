import styled from "styled-components"
import React from "react"
import { Spinner } from "@looker/components"

  export const LoadingSpinner = ({loading}) => {
    return (
      <>
      {loading && <Spinner size={60} color="6C43E0"/>}
      </>
    )      
  }

  const PageTitleDiv = styled.div`
  font-family: "Google Sans", "Open Sans", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #5F6368;
  font-weight: 200;
  }
`


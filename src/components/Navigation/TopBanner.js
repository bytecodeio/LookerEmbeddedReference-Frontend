// This component wraps the menu button, Looker icon and page title together
// To modify the menu, pass a different 'routes' object in the App.js file
// To modify styles, edit the Image and Header constants here.

import React from 'react'
import { Space } from '@looker/components'
import styled from "styled-components"
import { MenuButton } from './MenuButton'
import { CodeButton } from './CodeButton'

function TopBanner({setMenuToggle,menuToggle,setCodeToggle,codeToggle}) {
    return (
        <>
            <Space className='top-banner' paddingLeft="20px">
                <MenuButton setMenuToggle={setMenuToggle} menuToggle={menuToggle} />
                <Image src="https://looker.com/assets/img/images/logos/looker.svg" alt="Looker" />
                <Header>
                    Embedded Reference Application
                </Header>
                <CodeButton setCodeToggle={setCodeToggle} codeToggle={codeToggle} />
            </Space>
        </>
    )
}

const Image = styled.img`
  width: 100px;
  height: 27px;
  padding-left: 1 rem;
`
const Header = styled.h1`
  font-family: "Google Sans", "Open Sans", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #5F6368;
  font-weight: 200;
  padding-bottom: -6px;
`

export default TopBanner

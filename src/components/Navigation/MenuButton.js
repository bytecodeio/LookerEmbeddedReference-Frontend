// This is simply the hamburger navigation menu
import React from 'react'
import { Menu, MenuItem, IconButton } from '@looker/components'
import { Menu as MenuIcon} from '@styled-icons/material/Menu'
import { Link } from 'react-router-dom';

export const MenuButton = ({routes}) => {
    console.dir(routes)
    return (
        <Menu
        density={1}
        content={
          <>
            {routes.examples.map(e => {
                    return(
                      <MenuItem key={e.text}>
                         <Link to={e.url}>{e.text}</Link>
                       </MenuItem>                   
                     )
                   })}
          </>
        }
      >
        <IconButton icon={<MenuIcon />}/>
      </Menu>
    )
}
// This is simply the hamburger navigation menu
import React from 'react'
import { IconButton } from '@looker/components'
import { Code as CodeIcon} from '@styled-icons/material/Code'

export const CodeButton = ({setCodeToggle, codeToggle}) => {
    const handleCodeToggle = () => {
      setCodeToggle(!codeToggle);
    }
    return (
      <IconButton onClick={handleCodeToggle} size='large'  icon={<CodeIcon />}/>
    )
}
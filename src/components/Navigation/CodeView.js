import { Space } from '@looker/components';
import React from 'react'
import { useLocation } from "react-router-dom";

export const CodeView = ({codeToggle, routes}) => {
   
    var path = useLocation().pathname
    const github = routes.examples.filter(x => x.url === path)[0].github
    console.log(github)

    return (
        <>
         <div className={codeToggle?"code open":"code collapse"}>
          {routes.examples.length > 0 &&
            <iframe src={github}/>
            
        }
        </div>
    </>)
}

export default CodeView
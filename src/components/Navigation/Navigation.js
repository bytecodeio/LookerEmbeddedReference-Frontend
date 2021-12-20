import React, { useState, useEffect } from 'react'
import { Accordion, AccordionContent, AccordionDisclosure, Space, Button } from '@looker/components'
import { Link } from 'react-router-dom';
import { Menu } from '@styled-icons/material-outlined'
import './Navigation.css'

function Navigation(routes) {

  const [menuOpen, isMenuOpen] = React.useState(false)

  function handleCollapse() {
    isMenuOpen(!menuOpen)
  }
  console.log(routes);
  return (
    <>
      <div className={menuOpen?"embed-dashboard-left collapse":"embed-dashboard-left"}>
        <Space className="collapse-button-container dashboard-nav-item">   
          <Button className="custom-button collapse-button"  onClick={() => handleCollapse()}>
          {(() => {
            if (menuOpen){
              return(
                <Menu />
              ) 
            } else {
              return(
                <Menu />
              )
            }
          })()} 
          </Button>
        </Space>  
        <div className={menuOpen?"dashboard-nav-items collapse": "dashboard-nav-items"}>
          { routes.routes.map((r) => {
            return(
              <Accordion defaultOpen>
                <AccordionDisclosure>{r.title}</AccordionDisclosure>
                <AccordionContent>
                  {r.examples.map(e => {
                    return(
                      <div className='accordion-link'>
                        <Link to={e.url}>{e.text}</Link>
                      </div>                   
                    )
                  })}
                </AccordionContent>
              </Accordion>
              // <li key={idx}>
              //   <Link to={example.url}>{example.text}</Link>
              // </li>
            )
          })}
        </div>
      </div>
    </>
  )

}

export default Navigation
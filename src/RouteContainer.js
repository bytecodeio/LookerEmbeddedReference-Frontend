import React, {ReactNode} from 'react'

export default function Container({content}) {
    return(
        <div className='main-container'>
            {content}
        </div>
    )
}
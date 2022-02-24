import { Button, Space } from '@looker/components';
import React, {ReactNode, useEffect} from 'react'
import styled from 'styled-components';
import CodeDrawer from './components/common/CodeDrawer';

export default function Container({content, path}) {
    const [drawerToggle, setDrawerToggle] = React.useState(false)

    const handleDrawer = () => {
        setDrawerToggle(!drawerToggle);
    }
    return(
        <div className='main-container'>            
            <CodePanel>
                <Space>
                    <Button marginLeft={"auto"} onClick={handleDrawer}>Code</Button>
                </Space>
            </CodePanel>
            {content}
            <CodeDrawer content={content} path={path} drawerToggle={drawerToggle} setDrawerToggle={setDrawerToggle} />
        </div>
    )
}

const CodePanel = styled.div`
    bottom:0;
    background-color:white;
    height:45px;
    z-index:999;
    width:85vw;
`
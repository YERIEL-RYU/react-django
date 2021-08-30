import React, { useState } from 'react';
import { ListItem, Collapse, List } from '@material-ui/core';

const Tab = () => {
    const [open, setOpen] = useState(false)
    const onMouseOver = () => {
        // console.log('mouse over test : ', e.target.style.backgroundColor)
        // var title = e.target
        // title.style.backgroundColor = "#006888"
        setOpen(true)
    }
    const onMouseLeave = (e) => {
        // console.log('mouse over test : ', e.target.style.backgroundColor)
        // var title = e.target
        // title.style.backgroundColor = ""
        setOpen(false)
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>menu1</div>
            <div onMouseOver={onMouseOver}>
                <ListItem>
                    munu2
                </ListItem>
                <Collapse in={open}>
                    <List>
                        <ListItem onClick={onMouseLeave}>
                            dashboard
                        </ListItem>
                        <ListItem>
                            configuration
                        </ListItem>
                    </List>
                </Collapse>
            </div>
            <div>menu3</div>
        </div>
    );
};

export default Tab;
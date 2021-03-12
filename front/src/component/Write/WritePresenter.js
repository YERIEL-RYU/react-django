import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { Button, Checkbox, Input } from '@material-ui/core';

import ReactQill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

const WritePresenter = () => {
    const [value, setValue] = useState('')
    const [title, setTitle] = useState('')
    const [important, setImportant] = useState(false)
    return (
        <div>
            <Input fullWidth placeholder="TITEL" value={title}/>
            <ReactQill style={{height:'400px', margin:'30px', padding:'10px'}} value={value}/>
            <div>
                <Checkbox value={important}/> 중요
            </div>
            <div>
                <Button variant='contained' >cancel</Button>
                <Button variant='contained' >post</Button>
            </div>
        </div>
    );
};

export default WritePresenter;
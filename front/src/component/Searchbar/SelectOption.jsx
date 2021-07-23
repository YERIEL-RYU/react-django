import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

import styled from 'styled-components';

const SelectBar = styled(FormControl)`
  && {  
    min-width : 120px;
    margin-right : 10px;
  }
`

const SelectOption = (props) => {
    const { selectLabel, selectValue, onSelectValueChange, selectItem } = props

    return (
        <>
            <SelectBar>
                {
                    selectLabel !== undefined &&
                    <InputLabel id="select-label">{selectLabel}</InputLabel>
                }
                <Select
                    labelId="select-label"
                    value={selectValue}
                    onChange={onSelectValueChange}
                    name="search-select"
                    inputProps={{ 'aria-label': 'search-select' }}
                >
                    {selectItem !== undefined && (
                        selectItem.map(item => (
                            <MenuItem value={item.value} key={item.name}>{item.name}</MenuItem>
                        ))
                    )}
                </Select>
            </SelectBar>
        </>
    );
};

export default SelectOption;
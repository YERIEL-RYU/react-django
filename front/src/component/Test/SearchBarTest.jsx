import React, { useState, useCallback } from 'react';
import { ToolbarContainer, SearchContainer, ListCount } from '../Searchbar/SearchBar';
import SearchToolbar from '../Searchbar/SearchToolbar';
import SelectOption from '../Searchbar/SelectOption';
import { CustomSqureButton } from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const SearchBarTest = () => {
    const data = [
        {
            id: 1,
            name: 'test'
        },
        {
            id: 2,
            name: 'ddd'
        }
    ];
    const selectItem = [
        {
            name: 'aaa',
            value: 'aaa'
        },
        {
            name: 'bbb',
            value: 'bbb'
        }
    ]
    // 검색 value
    const [searchValue, setSearchValue] = useState('');
    //select bar value
    const [selectValue, setSelectValue] = useState('all');
    // 검색 value change event
    const onSearchValueChange = (e) => {
        setSearchValue(e.target.value)
    };
    //select value change event
    const onSelectValueChange = (e) => {
        setSelectValue(e.target.value);
    };
    //검색 api 호출 event
    const onSearch = useCallback((e) => {
        if (e.key === 'Enter' || e.target.id === 'search') console.log('search bar');
    }, [searchValue]);

    //검색 value reset
    const onSearchReset = () => {
        setSearchValue('')
    }
    return (
        <ToolbarContainer>
            <ListCount count={data.length} />
            <SearchToolbar
                searchValue={searchValue}
                onSearchValueChange={onSearchValueChange}
                onSearch={onSearch}
                onSearchValueReset={onSearchReset}
            />
        </ToolbarContainer>
    );
};

export default SearchBarTest;
//SortTablePresenter.jsx
import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel } from '@material-ui/core';

const heads = [
  {
    id: 'menu',
    name: '메뉴',
  },
  {
    id: 'price',
    name: '가격'
  },
]
const datas = [
  {
    menu: '아메리카노',
    price: '2500',
  },
  {
    menu: '카페라떼',
    price: '3000'
  },
  {
    menu: '카푸치노',
    price: '3200'
  }
]
const SortTablePresenter = (props) => {
  const { order, orderBy, handleRequestSort, stableSort, getSorting } = props;
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  }

  return (
    // <Table>
    //   <TableHead>
    //     <TableRow>
    //       {heads.map((head)=>(
    //         <TableCell
    //           key={head.id}
    //           sortDirection={orderBy === head.id ? order : false}
    //         >
    //           <TableSortLabel
    //             active={orderBy === head.id}
    //             direction={orderBy === head.id ? order : 'asc'}
    //             onClick={createSortHandler(head.id)}
    //           >
    //             {head.name}
    //           </TableSortLabel>
    //         </TableCell>
    //       ))}
    //     </TableRow>
    //   </TableHead>
    //   <TableBody>
    //     {datas !== undefined && (
    //     stableSort(datas, getSorting(order, orderBy))
    //     .map((data)=> (
    //       <TableRow key={data.menu}>
    //         <TableCell>
    //         	{data.menu}
    //         </TableCell>
    //         <TableCell>
    //         	{data.price}
    //         </TableCell>
    //       </TableRow>
    //     ))
    //     )}
    //   </TableBody>
    // </Table>
    <Table>
      <TableBody>
        <TableRow>
          <TableCell style={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}>파일명</TableCell>
          <TableCell style={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}>1</TableCell>
          <TableCell style={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}>등록일자</TableCell>
          <TableCell style={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}>1</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>파일크기</TableCell>
          <TableCell>1</TableCell>
          <TableCell>다운로드 수</TableCell>
          <TableCell>1</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default SortTablePresenter
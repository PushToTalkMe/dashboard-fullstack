import React from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Skeleton } from '../../components/skeleton/skeleton';
import { Publisher } from '../../components/tables/publishers';
import { Boardgames } from '../../components/tables/boardgames';

export const Tables = () => {
  const LoadingCellRenderer = (params, width) => {
    if (params.value === undefined || params.value === null) {
      return <Skeleton width={width} />;
    } else {
      return params.value;
    }
  };

  const columnDefsForPublisher = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: false,
      cellRenderer: (params) => LoadingCellRenderer(params, 50),
    },
    {
      headerName: 'Издатель',
      field: 'name',
      sortable: false,
      cellRenderer: (params) => LoadingCellRenderer(params, 180),
    },
    {
      headerName: 'Дата основания',
      field: 'foundation_date',
      sortable: false,
      cellRenderer: (params) => LoadingCellRenderer(params, 100),
    },
    {
      headerName: 'ИНН',
      field: 'tin',
      sortable: false,
      cellRenderer: (params) => LoadingCellRenderer(params, 120),
    },
    {
      headerName: 'Рейтинг',
      field: 'rating',
      sortable: false,
      cellRenderer: (params) => LoadingCellRenderer(params, 80),
    },
  ];

  const columnDefsForBoardgames = [
    {
      headerName: 'ID',
      field: 'id',
    },
    {
      headerName: 'Название',
      field: 'title',
    },
    {
      headerName: 'Дата релиза',
      field: 'release_date',
    },
    {
      headerName: 'Цена',
      field: 'price',
    },
    {
      headerName: 'ID издателя',
      field: 'publishers_id',
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: '20px',
      }}
    >
      <Publisher columnDefs={columnDefsForPublisher} />
      <Boardgames columnDefs={columnDefsForBoardgames} />
    </div>
  );
};

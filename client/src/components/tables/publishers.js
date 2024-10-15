import React from 'react';
import styles from './tables.module.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getPublishers } from '../../services/api';

export const Publisher = ({ columnDefs }) => {
  return (
    <div className={styles.publishers}>
      <span className={styles.titlePublishers}>Издатели</span>
      <div
        className="ag-theme-alpine"
        style={{ height: '100%', width: '100%' }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowHeight={40}
          rowModelType="infinite"
          cacheBlockSize={20}
          maxBlocksInCache={5}
          onGridReady={(params) => params.api.sizeColumnsToFit()}
          datasource={{
            getRows: getPublishers,
          }}
        />
      </div>
    </div>
  );
};

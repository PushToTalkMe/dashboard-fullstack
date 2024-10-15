import React, { useEffect, useState } from 'react';
import styles from './tables.module.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
  deleteBoardgame,
  getBoardgames,
  getBoardgameById,
} from '../../services/api';
import {
  FETCH_ERROR,
  OVERLAY_LOADING_TEMPLATE,
  OVERLAY_NO_ROWS_TEMPLATE,
} from '../../constants';
import { Popup } from '../popup/popup';

export const Boardgames = ({ columnDefs }) => {
  const [boardgames, setBoardgames] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [statePopup, setStatePopup] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [paginationPageSize, setPaginationPageSize] = useState(10);
  const [paginationPageSizeSelector] = useState([10, 25, 50, 100]);
  const [gridApi, setGridApi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentBoardgame, setCurrentBoardgame] = useState(null);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await getBoardgames(
          currentPage * paginationPageSize - paginationPageSize,
          paginationPageSize,
        );
        const boardgames = data.boardgames;
        const total = data.total;
        const totalPage = Math.ceil(total / paginationPageSize);
        setTotalPage(totalPage);
        if (currentPage > totalPage) {
          setCurrentPage(totalPage);
        }
        setBoardgames(boardgames);

        if (gridApi) {
          if (boardgames.length === 0) {
            gridApi.showNoRowsOverlay();
          } else {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error(FETCH_ERROR, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paginationPageSize, currentPage, gridApi]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  const goToNextPage = () => {
    if (currentPage === totalPage) {
      setCurrentPage(1);
    } else {
      setCurrentPage((state) => ++state);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage === 1) {
      setCurrentPage(totalPage);
    } else {
      setCurrentPage((state) => --state);
    }
  };

  const changePageSize = (e) => {
    setPaginationPageSize(e.target.value);
  };

  const onSelectionChanged = (event) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    setCurrentBoardgame(selectedData[0] || null);
  };

  const handleAdd = () => {
    setStatePopup({ type: 'add' });
    togglePopup();
  };

  const handleChange = () => {
    setStatePopup({ type: 'change', currentBoardgame });
    togglePopup();
  };

  const handleDelete = async () => {
    await deleteBoardgame(currentBoardgame.id);
    const { total, boardgame } = await getBoardgameById(
      boardgames[boardgames.length - 1].id + 1,
    );
    setBoardgames((state) => {
      const newState = state.filter((item) => item.id !== currentBoardgame.id);
      if (
        boardgames.length === paginationPageSize &&
        boardgames.length + paginationPageSize * (currentPage - 1) < total
      ) {
        return [...newState, boardgame[0]];
      }
      if (boardgames.length <= paginationPageSize) {
        return newState;
      }
    });
  };

  return (
    <div className={styles.boardgames}>
      {isPopupVisible && (
        <Popup
          togglePopup={togglePopup}
          statePopup={statePopup}
          boardgames={boardgames}
          setBoardgames={setBoardgames}
          currentPage={currentPage}
          totalPage={totalPage}
          setTotalPage={setTotalPage}
          paginationPageSize={paginationPageSize}
        />
      )}
      <div className={styles.header}>
        <span className={styles.titleBoardgames}>Настольные игры</span>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleAdd}>
            Добавить
          </button>
          <button
            className={styles.button}
            disabled={!currentBoardgame}
            onClick={handleChange}
          >
            Изменить
          </button>
          <button
            className={styles.button}
            disabled={!currentBoardgame}
            onClick={handleDelete}
          >
            Удалить
          </button>
        </div>
      </div>

      <div
        className="ag-theme-alpine"
        style={{ height: '100%', width: '100%' }}
      >
        <AgGridReact
          rowData={boardgames}
          columnDefs={columnDefs}
          rowSelection={{
            mode: 'single',
          }}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={paginationPageSize}
          suppressPaginationPanel={true}
          onSelectionChanged={onSelectionChanged}
          loading={loading}
          overlayLoadingTemplate={OVERLAY_LOADING_TEMPLATE}
          overlayNoRowsTemplate={OVERLAY_NO_ROWS_TEMPLATE}
        />
      </div>
      <div className={styles.paginationControls}>
        <button className={styles.arrow} onClick={goToPreviousPage}>
          ←
        </button>
        <span className={styles.count}>
          {currentPage}/{totalPage}
        </span>
        <button className={styles.arrow} onClick={goToNextPage}>
          →
        </button>
      </div>
      <select onChange={changePageSize} className={styles.pageSizeControls}>
        {paginationPageSizeSelector.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

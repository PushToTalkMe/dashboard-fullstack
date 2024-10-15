import styles from './popup.module.css';
import { FormAddBoardgame } from '../forms/add-boardgame';
import { FormChangeBoardgame } from '../forms/change-boardgame';

export const Popup = ({
  togglePopup,
  statePopup,
  boardgames,
  setBoardgames,
  setTotalPage,
  paginationPageSize,
}) => {
  return (
    <div>
      <div className={styles.popupOverlay} onClick={togglePopup} />
      <div className={styles.popup}>
        {statePopup.type === 'add' && (
          <FormAddBoardgame
            boardgames={boardgames}
            setBoardgames={setBoardgames}
            setTotalPage={setTotalPage}
            paginationPageSize={paginationPageSize}
          />
        )}
        {statePopup.type === 'change' && (
          <FormChangeBoardgame
            statePopup={statePopup}
            setBoardgames={setBoardgames}
          />
        )}
      </div>
    </div>
  );
};

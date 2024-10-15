import { useEffect, useState } from 'react';
import styles from './forms.module.css';
import { getAllPublisherIds, updateBoardgame } from '../../services/api';
import { isNumber } from '../../helpers/is-number';
import { validatePrice } from '../../helpers/validate-price';
import { trimSpaces } from '../../helpers/trim-spaces';
import {
  FETCH_ERROR,
  FORM_ERROR_PRICE,
  FORM_ERROR_NUMBER,
  FORM_PLACEHOLDER_TITLE,
  FORM_PLACEHOLDER_PRICE,
  FORM_ERROR_ZERO,
  FORM_ERROR_SPACE,
  FETCH_SUCCESS_PUT_BOARDGAMES,
} from '../../constants';

export const FormChangeBoardgame = ({ statePopup, setBoardgames }) => {
  const [publisherIds, setPublisherIds] = useState([]);
  const [formState, setFormState] = useState({
    title: statePopup.currentBoardgame.title,
    release_date: statePopup.currentBoardgame.release_date,
    price: statePopup.currentBoardgame.price,
    publishers_id: statePopup.currentBoardgame.publishers_id,
  });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getAllPublisherIds();
        setPublisherIds(data);
      } catch (error) {
        console.error(FETCH_ERROR, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangeTitle = (e) => {
    const newValue = e.target.value;
    if (newValue[0] === ' ') {
      setError((state) => {
        return {
          ...state,
          title: FORM_ERROR_SPACE,
        };
      });
      return;
    }
    setFormState((state) => {
      return { ...state, title: e.target.value };
    });
    setError((state) => {
      return {
        ...state,
        title: '',
      };
    });
  };

  const handleChangePrice = (e) => {
    const newValue = e.target.value;
    if (newValue.includes('.')) {
      setFormState((state) => {
        return { ...state, price: newValue };
      });
      setError((state) => {
        return {
          ...state,
          price: '',
        };
      });
      return;
    }
    if (newValue[0] === '0') {
      setError((state) => {
        return {
          ...state,
          price: FORM_ERROR_ZERO,
        };
      });
      return;
    }
    if (!isNumber(newValue) && newValue.length > 0) {
      setError((state) => {
        return {
          ...state,
          price: FORM_ERROR_NUMBER,
        };
      });
      return;
    }
    setFormState((state) => {
      return { ...state, price: newValue };
    });
    setError((state) => {
      return {
        ...state,
        price: '',
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePrice(formState.price)) {
      setError((state) => {
        return {
          ...state,
          price: FORM_ERROR_PRICE,
        };
      });
      return;
    }
    const fetchData = async () => {
      try {
        const boardgame = await updateBoardgame(
          statePopup.currentBoardgame.id,
          {
            ...formState,
            title: trimSpaces(formState.title),
          },
        );

        if (boardgame.id) {
          setBoardgames((state) =>
            state.map((item) => {
              if (item.id === boardgame.id) {
                return boardgame;
              }
              return item;
            }),
          );
          setFail(false);
          setSuccess(true);
          setError((state) => {
            return {
              ...state,
              price: '',
              title: '',
            };
          });
        }
      } catch (error) {
        setFail(true);
        setSuccess(false);
      }
    };

    fetchData();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.box}>
        <div className={styles.inputForm}>
          <span className={styles.inputTitle}>Название игры</span>
          <input
            type="text"
            placeholder={FORM_PLACEHOLDER_TITLE}
            maxLength={150}
            value={formState.title}
            onChange={handleChangeTitle}
          />
          {error.title && <span className={styles.error}>{error.title}</span>}
        </div>
        <div className={styles.inputForm}>
          <span className={styles.inputTitle}>Дата релиза игры</span>
          <input
            type="date"
            value={formState.release_date}
            onChange={(e) => {
              setFormState((state) => {
                return { ...state, release_date: e.target.value };
              });
            }}
          />
        </div>
        <div className={styles.inputForm}>
          <span className={styles.inputTitle}>Стоимость</span>
          <input
            type="text"
            maxLength={11}
            placeholder={FORM_PLACEHOLDER_PRICE}
            value={formState.price}
            onChange={handleChangePrice}
          />
          {error.price && <span className={styles.error}>{error.price}</span>}
        </div>
        <div className={styles.inputForm}>
          <span className={styles.inputTitle}>ID Издателя</span>
          {isLoading ? (
            <p>Загрузка</p>
          ) : (
            <select
              defaultValue={formState.publishers_id}
              onChange={(e) => {
                setFormState((state) => {
                  return { ...state, publishers_id: +e.target.value };
                });
              }}
            >
              {publisherIds.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.id}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <button
        className={styles.button}
        type="submit"
        disabled={
          !formState.title ||
          !formState.release_date ||
          !formState.price ||
          !formState.publishers_id
        }
      >
        Изменить
      </button>
      {success && (
        <span className={styles.success}>{FETCH_SUCCESS_PUT_BOARDGAMES}</span>
      )}
      {fail && <span className={styles.error}>{FETCH_ERROR}</span>}
    </form>
  );
};

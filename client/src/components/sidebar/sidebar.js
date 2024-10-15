import React from 'react';
import styles from './sidebar.module.css';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as TableIcon } from '../../assets/icons/table-column.svg';
import { ReactComponent as QuestionIcon } from '../../assets/icons/question-circle.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/info-circle.svg';

export const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className={styles.sidebar}>
      <h1>Dashboard</h1>
      <Link
        to="/tables"
        className={cn(styles.link, {
          [styles.active]: location.pathname === '/tables',
        })}
      >
        <TableIcon className={cn(styles.icon)} />
        <span>Таблицы</span>
      </Link>
      <Link
        to="/info"
        className={cn(styles.link, {
          [styles.active]: location.pathname === '/info',
        })}
      >
        <InfoIcon className={cn(styles.icon)} />
        <span>Информация</span>
      </Link>
      <Link
        to="/help"
        className={cn(styles.link, {
          [styles.active]: location.pathname === '/help',
        })}
      >
        <QuestionIcon className={cn(styles.icon)} />
        <span>Помощь</span>
      </Link>
    </nav>
  );
};

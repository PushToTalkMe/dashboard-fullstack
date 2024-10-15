import React from 'react';
import styles from './app.module.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Tables } from '../pages/tables/tables';
import { Info } from '../pages/info/info';
import { Help } from '../pages/help/help';
import { Sidebar } from './sidebar/sidebar';

function App() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Navigate to="/tables" />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/info" element={<Info />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

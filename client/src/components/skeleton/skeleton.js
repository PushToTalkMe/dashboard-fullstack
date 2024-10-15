import React from 'react';
import cn from 'classnames';
import styles from './skeleton.module.css';

export const Skeleton = ({ width }) => {
  return (
    <div className={cn(styles.skeleton)} style={{ width: `${width}px` }} />
  );
};

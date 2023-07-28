import React from 'react';
import styles from './HashTag.module.css';

//@ts-ignore
export default function HashTag({text}) {
  return (
    <li className={styles.tag}>#{text}</li>
  );
}


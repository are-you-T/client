import React from 'react';
import HashTag from '../components/test-result/HashTag';
import styles from './TestResult.module.css';

export default function TestResult() {
  return (
    <section className={styles.container}>
        <header className={styles.header}>
          <h3 className={styles.mbti}>INTJ</h3>
          <button className={styles.resultBtn}>결과 공유하기</button>
        </header>
        <section className={styles.result}>
          <main className={styles.text}>
            <h5 className={styles.textTitle}>당신은 계획적인 INTJ입니다</h5>
            <div className={styles.textContents}>INTJ 유형이란? INTJ 성격 유형을 가진 사람들은 행동에 있어 자신감 있고 분석적이며 야심찬 경향이 있습니다. 그들은 지식 추구를 좋아하고 매우 논리적인 경향이 있습니다. 그들은 세상의 문제를 해결하는 데 초점을 맞춘 독립적인 사상가입니다.</div>
            <ul className={styles.tags}>
              <HashTag text='사람 분석 전문가'/>
              <HashTag text='작은것도 계획함'/>
              <HashTag text='스케줄러 필수'/>
              <HashTag text='성적 좋은편'/>
            </ul>
          </main>
        </section>
    </section>
  );
}


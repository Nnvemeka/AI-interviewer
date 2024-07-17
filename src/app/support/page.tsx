import React from "react";
import styles from "./page.module.css";

const Support = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Contact Support</h1>

        <section className={styles.section}>
          <input className={styles.input} placeholder="Enter name" />
          <input className={styles.input} placeholder="Enter email" />
          <input className={styles.textArea} placeholder="Enter message" />
          <button className={styles.button}>Send</button>
        </section>
      </div>
    </div>
  );
};

export default Support;

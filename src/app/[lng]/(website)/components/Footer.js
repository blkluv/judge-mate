import React from 'react';
import styles from './Footer.module.css'; // Assuming you're using CSS modules

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <div className={styles.column}>
            <h3 className={styles.title}>OFERTA</h3>
            <a href="/link1">Link 1</a>
            <a href="/link2">Link 2</a>
            <a href="/link3">Link 3</a>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>O FIRMIE</h3>
            <a href="/link4">Link 4</a>
            <a href="/link5">Link 5</a>
            <a href="/link6">Link 6</a>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>KONTAKT</h3>
            <a href="/link7">Link 7</a>
            <a href="/link8">Link 8</a>
            <a href="/link9">Link 9</a>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>INFORMACJE</h3>
            <a href="/link10">Link 10</a>
            <a href="/link11">Link 11</a>
            <a href="/link12">Link 12</a>
          </div>
        </div>
        <div className={styles.copy}>
          <p>&copy; {new Date().getFullYear()} Grupa Tree</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

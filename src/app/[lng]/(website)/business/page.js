import styles from "./page.module.css";

function Business() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Nasza oferta</h1>
      </header>

      <section className={styles.offers}>
        <h2>Grupa Tree – Oferta</h2>
        <ul>
          <li>Roboty ziemne</li>
          <li>Rozbiórki i wyburzenia</li>
          <li>Wykopy</li>
          <li>Rekultywacja terenu</li>
          <li>Sprzedaż kruszyw</li>
          <li>Ochrona budowy</li>
        </ul>
      </section>

      <footer className={styles.footer}>
        <p>
          Skontaktuj się z nami, aby dowiedzieć się więcej o naszej ofercie!
        </p>
      </footer>
    </div>
  );
}

export default Business;

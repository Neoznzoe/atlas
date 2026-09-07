import styles from "./Card.module.css";

function Card({ children, favori = false, cliquable = false, onClick }) {
  const classes = `${styles.card} ${favori ? styles.favorite : ""} ${cliquable ? styles.cliquable : ""}`.trim();

  return (
    <article className={classes} onClick={onClick}>
      {children}
    </article>
  );
}

export default Card;

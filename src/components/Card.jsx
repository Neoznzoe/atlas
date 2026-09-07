function Card({ children, favori = false, className = "", onClick }) {
  const classes = `card ${favori ? "card--favorite" : ""} ${className}`.trim();

  return (
    <article className={classes} onClick={onClick}>
      {children}
    </article>
  );
}

export default Card;

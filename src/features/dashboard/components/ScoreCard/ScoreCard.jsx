import styles from "./ScoreCard.module.css";

export default function ScoreCard({ team, place }) {
  return (
    <div className={styles.card_info}>
      <h2 className={styles.card_title}>{place}°</h2>
      <div className={styles.card_content}>
        <img src={team.teamShirt} alt="camiseta azul" className={styles.card_camiseta} />
        <h3 className={styles.card_teamName}>{team.teamName.split(" ")[1]}</h3>
        <div className={styles.divider}></div>
        <p className={styles.card_goals}>Gols:</p>
        <p className={styles.score}>{team.goals}</p>
      </div>
    </div>
  );
}

import styles from "./RankingItem.module.css";

export default function RankingItem({ item, position }) {
  return (
    <section className={styles.ranking_item}>
      <p className={styles.position}>{position}º</p>
      <div className={styles.image_container}>
        <img src={item.imageUrl} alt="" className={styles.image} />
      </div>

      <p className={styles.person_name}>
        {item.name} <span className={styles.person_job}>{item.job}</span>
      </p>
      <p className={styles.person_goals}>{item.goals}</p>
    </section>
  );
}

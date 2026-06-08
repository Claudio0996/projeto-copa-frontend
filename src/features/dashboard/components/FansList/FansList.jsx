import styles from "./FansList.module.css";
import useFans from "../../hooks/useFans";

export default function FansList() {
  const { fans } = useFans();
  const fansNames = fans.map((fan) => fan.name);

  const fansArray = [...fansNames, ...fansNames];

  return (
    <div className={styles.info_torcedores}>
      <h2 className={styles.torcedores_title}>Na torcida:</h2>
      <div className={styles.scroll_wrapper}>
        <div className={styles.nomes}>
          {fansArray.map((fan, index) => {
            return (
              <span key={`${fan}+${index}`} className={styles.fanName}>
                {fan} -
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

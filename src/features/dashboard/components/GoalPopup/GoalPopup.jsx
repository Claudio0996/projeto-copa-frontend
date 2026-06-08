import { useState, useEffect } from "react";

import styles from "./GoalPopup.module.css";

export default function GoalPopup({ event, onClose }) {
  const [statePopup, setStatePopup] = useState("video");
  let content;
  console.log(event);

  function setPopupType() {
    setStatePopup("info");
  }

  function resetPopup() {
    setStatePopup("video");
    onClose();
  }

  useEffect(() => {
    const audio = new Audio("/vinheta.mp3");
    if (event) {
      setStatePopup("video");
      audio.play();
    }
  }, [event]);

  useEffect(() => {
    let timer;
    if (statePopup === "info") {
      timer = setTimeout(() => {
        resetPopup();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [statePopup]);

  if (!event) {
    return;
  }

  if (statePopup === "video") {
    content = <video autoPlay muted src="./gol.mp4" onEnded={setPopupType} className={styles.video} />;
  } else {
    content = (
      <div className={styles.container}>
        <div className={styles.info_container}>
          <h3 className={styles.vendor_name}>
            {event.vendor.name}
            <span className={styles.vendor_job}> ({event.vendor.job})</span>
          </h3>
          <div className={styles.assist_container}>
            <div className={styles.image_container}>
              <img src={event.sdrId.imageUrl} className={styles.image} />
            </div>

            <div className={styles.assist_info}>
              <p className={styles.assist_title}>Assitência</p>
              <h5 className={styles.assist_name}>
                {event.sdrId.name}
                <span className={styles.assist_job}> ({event.sdrId.job})</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className={styles.modal_bg}>{content}</div>;
}

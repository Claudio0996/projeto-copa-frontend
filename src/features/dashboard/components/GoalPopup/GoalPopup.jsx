import { useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import { TvAudioContext } from "../../../../shared/TvAudioContext";

import styles from "./GoalPopup.module.css";

export default function GoalPopup({ event, onClose }) {
  const AudioContext = useContext(TvAudioContext);
  const [statePopup, setStatePopup] = useState("video");
  let content;

  function setPopupType() {
    setStatePopup("info");
  }

  function resetPopup() {
    setStatePopup("video");
    onClose();
  }

  useEffect(() => {
    if (event) {
      AudioContext.current.currentTime = 0;
      AudioContext.current.play();
      setStatePopup("video");
      
    }
  }, [event]);

  useEffect(() => {
    let timer;
    if (statePopup === "info") {
      timer = setTimeout(() => {
        resetPopup();
      }, 10000);
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
          {event.sdrId && (
            <div className={styles.assist_container}>
              <div className={styles.image_container}>
                <img src={event.sdrId.imageUrl} className={styles.image} />
              </div>

              <div className={styles.assist_info}>
                <p className={styles.assist_title}>Assistência</p>
                <h5 className={styles.assist_name}>
                  {event.sdrId.name}
                  <span className={styles.assist_job}> ({event.sdrId.job})</span>
                </h5>
              </div>
            </div>
          )}
        </div>
        <div className={styles.video_container}>
          <video src={event?.vendor?.videoGol} autoPlay muted loop className={styles.video_comemoracao}></video>
        </div>
      </div>
    );
  }

  return createPortal(
    <div className={styles.modal_bg}>{content}</div>,
    document.body
  );
}


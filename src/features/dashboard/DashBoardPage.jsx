import { useReducer, useEffect } from "react";
import dashboardReducer from "./dashboardReducer";
import RankingScreen from "./components/RankingScreen/RankingScreen";
import ScoreScreen from "./components/ScoreScreen/ScoreScreen";
import TeamScreen from "./components/TeamScreen/TeamScreen";
import GoalPopup from "./components/GoalPopup/GoalPopup";

import styles from "./DashBoardPage.module.css";

const initialState = {
  currentIndex: 0,
  queue: [],
  currentEvent: null,
};

export default function DashboardPage() {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const screens = [
    { component: ScoreScreen, props: {}, duration: 20000 },
    { component: RankingScreen, props: {}, duration: 15000 },
    // { component: TeamScreen, props: { teamId: "6a26bfcf5e11d9941410af8d" }, duration: 60000 },
    // { component: TeamScreen, props: { teamId: "6a26bfcf5e11d9941410af8e" }, duration: 60000 },
    // { component: TeamScreen, props: { teamId: "6a26bfcf5e11d9941410af8f" }, duration: 60000 },
  ];

  const CurrentScreen = screens[state.currentIndex].component;
  const currentProps = screens[state.currentIndex].props;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "NEXT_SCREEN", payload: { total: screens.length } });
    }, screens[state.currentIndex].duration ?? 10000);

    return () => clearTimeout(timer);
  }, [state.currentIndex]);

  useEffect(() => {
    const source = new EventSource("http://localhost:3000/sales/events");
    source.onmessage = (e) => {
      const event = JSON.parse(e.data);
      dispatch({ type: "ENQUEUE_EVENT", payload: { event } });
    };
    return () => source.close();
  }, []);

  return (
    <div className={styles.dashboard}>
      <CurrentScreen {...currentProps} />

      {state.currentEvent && (
        <GoalPopup event={state.currentEvent} onClose={() => dispatch({ type: "DEQUEUE_EVENT" })} />
      )}
    </div>
  );
}

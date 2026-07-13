import { useReducer, useEffect } from "react";
import dashboardReducer from "./dashboardReducer";
import RankingScreen from "./components/RankingScreen/RankingScreen";
import ScoreScreen from "./components/ScoreScreen/ScoreScreen";
import TotalScoreScreen from "./components/TotalScoreScreen/TotalScoreScreen";
import RankingTotalScreen from "./components/RankingTotalScreen/RankingTotalScreen";
import SdrRankingTotalScreen from "./components/SdrRankingTotalScreen/SdrRankingTotalScreen";
import TeamScreen from "./components/TeamScreen/TeamScreen";
import GoalPopup from "./components/GoalPopup/GoalPopup";

import styles from "./DashBoardPage.module.css";
import ImageScreen from "./components/imageScreen/ImageScreen";

const initialState = {
  currentIndex: 0,
  queue: [],
  currentEvent: null,
};

export default function DashboardPage() {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const screens = [
    { component: ImageScreen, props: {}, duration: 10000 },
    { component: TotalScoreScreen, props: {}, duration: 20000 },
    { component: RankingTotalScreen, props: {}, duration: 15000},
    {component: SdrRankingTotalScreen, props: {}, duration: 2000},
    { component: TeamScreen, props: { teamId: "6a28354e6ca8b599604b2bc4" }, duration: 45000 },
    { component: ScoreScreen, props: {}, duration: 20000 },
    { component: RankingScreen, props: {}, duration: 15000 },    
    { component: TeamScreen, props: { teamId: "6a28354e6ca8b599604b2bc5" }, duration: 45000 },
    { component: ScoreScreen, props: {}, duration: 20000 },
    { component: RankingScreen, props: {}, duration: 15000 },
    { component: TeamScreen, props: { teamId: "6a28354e6ca8b599604b2bc6" }, duration: 45000 },
   ];

  const CurrentScreen = screens[state.currentIndex].component;
  const currentProps = screens[state.currentIndex].props;

  useEffect(() => {
    if (state.currentEvent) return;
    const timer = setTimeout(() => {
      dispatch({ type: "NEXT_SCREEN", payload: { total: screens.length } });
    }, screens[state.currentIndex].duration ?? 10000);

    return () => clearTimeout(timer);
  }, [state.currentIndex, state.currentEvent]);

  useEffect(() => {
    const source = new EventSource("http://192.168.1.22:3000/sales/events");
    source.onmessage = (e) => {
      const event = JSON.parse(e.data);
      dispatch({ type: "ENQUEUE_EVENT", payload: { event } });
    };
    return () => source.close();
  }, []);

  return (
    <div className={styles.dashboard}>
      {!state.currentEvent && <CurrentScreen key={currentProps.teamId} {...currentProps} />}

      {state.currentEvent && (
        <GoalPopup event={state.currentEvent} onClose={() => dispatch({ type: "DEQUEUE_EVENT" })} />
      )}
    </div>
  );
}

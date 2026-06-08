const dashboardReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_SCREEN": {
      const nextIndex = (state.currentIndex + 1) % action.payload.total;
      return { ...state, currentIndex: nextIndex };
    }
    case "ENQUEUE_EVENT": {
      const newQueue = [...state.queue, action.payload.event];
      const currentEvent = state.currentEvent ?? newQueue[0];
      const queue = state.currentEvent ? newQueue : newQueue.slice(1);
      return { ...state, queue, currentEvent };
    }
    case "DEQUEUE_EVENT": {
      const queue = state.queue.slice(1);
      const currentEvent = queue.length > 0 ? queue[0] : null;
      return { ...state, queue, currentEvent };
    }
    default:
      return state;
  }
};

export default dashboardReducer;

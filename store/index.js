// store/index.js
import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      tasks: [],
    };
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks = [
        { content: task, done: false },
        ...state.tasks,
      ];
    },
  },
});

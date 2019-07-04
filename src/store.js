import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import api from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({ paths: ["activitiesList"] })],
  state: {
    activity: {},
    activitiesList: []
  },
  mutations: {
    setActivity(state, activity) {
      state.activity = activity;
    },
    addToList(state) {
      state.activitiesList.push(state.activity);
    },
    removeFromList(state, activity) {
      state.activitiesList = state.activitiesList.filter(
        ({ key }) => key !== activity.key
      );
    },
    clearAll(state) {
      state.activitiesList = [];
    }
  },
  actions: {
    async loadActivity({ commit }, params = {}) {
      const { data: activity } = await api.getActivity(params);
      commit("setActivity", activity);
    },
    async saveActivityToList({ state, commit }) {
      if (
        state.activitiesList.some(
          ({ key }) => state.activity.key && key === state.activity.key
        )
      ) {
        return Promise.reject("You already saved this activity");
      }
      commit("addToList");
    }
  }
});

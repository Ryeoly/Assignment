import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    apply_list: [],
    friend_list: []
  },
  getters: {
    user: (state) => { return state.user; },
    apply_list: (state) => { return state.apply_list },
    friend_list: (state) => { return state.friend_list }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    updatePW(state, pw) {
      state.user.pwd = pw;
    },
    set_apply(state, apply) {
      state.apply_list = apply;
    },
    set_friend(state, friend) {
      state.friend_list = friend;
    },
    del_apply(state, pid) {
      const idx = state.apply_list.findIndex(function(item) {return item.friend_pid === pid})
      state.apply_list.splice(idx, 1);
    },
    add_friend(state, data) {
      state.friend_list.push({name: data.name, pid : data.pid});
    }
  },
  plugins: [createPersistedState()]
});

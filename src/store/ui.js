export default {
  name: 'ui',
  namespaced: true,

  state: {
    loading: true,
    sidebar: true,
    navbar: true,
    levelbar: true,
    menu: []
  },

  actions: {
    hideLoading ({ commit }) {
      commit('ui/SHOW_LOADING', false)
    },
    toggleSidebar ({ commit }) {
      commit('SHOW_SIDEBAR', !this.state.ui.sidebar)
    },
    toggleFullPage ({ commit }) {
      commit('SHOW_FULLPAGE', (this.state.ui.sidebar || this.state.ui.navbar))
    },
    setFullPage ({ commit }) {
      commit('SHOW_FULLPAGE', true)
    }
  },

  getters: {
    fullpage (state) {
      return !state.sidebar && !state.navbar
    }
  },

  mutations: {
    SHOW_LOADING (state, show) {
      state.loading = show
    },
    SHOW_SIDEBAR (state, show) {
      state.sidebar = show
    },
    SHOW_NAVBAR (state, show) {
      state.navbar = show
    },
    SHOW_LEVELBAR (state, show) {
      state.levelbar = show
    },
    SHOW_FULLPAGE (state, show) {
      state.navbar = !show
      state.sidebar = !show
    },
    SET_MENU (state, menu) {
      state.menu = menu
    }
  }
}

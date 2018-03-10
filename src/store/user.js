export default {
  name: 'user',
  namespaced: true,

  state: {
    uid: '',
    displayName: '',
    email: '',
    photoURL: ''
  },

  actions: {},

  getters: {},

  mutations: {
    SET_USER (state, user) {
      state.uid = user.uid
      state.email = user.email
      state.first_name = user.first_name
      state.last_name = user.last_name
      state.phone = user.phone
      state.displayName = user.displayName
      state.photoURL = user.photoURL
    }
  }
}

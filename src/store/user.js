export default {
  name: 'user',
  namespaced: true,

  state: {
    uid: '',
    email: '',
    first_name: '',
    last_name: '',
    displayName: '',
    phone: '',
    photoURL: ''
  },

  actions: {},

  getters: {},

  mutations: {
    SET_USER (state, user) {
      state.id = user.id
      state.email = user.email
      state.first_name = user.first_name
      state.last_name = user.last_name
      state.phone = user.phone
      state.displayName = user.displayName
      state.photoURL = user.photoURL
    }
  }
}

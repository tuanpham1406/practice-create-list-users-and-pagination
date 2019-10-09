const state = () => ({
  data: [],
  avatarUser: '',
  nameUser: '',
  createdAt: '',
  lengthPages: 0,
  numberItemsPage: 6
})

const getters = {
  getNumberItemsPage(state) {
    return state.numberItemsPage
  }
}

const mutations = {
  setUser(state, payload) {
    state.avatarUser = payload.avatar
    state.nameUser = payload.name
    state.createdAt = payload.createdAt
  },
  setData(state, payload) {
    state.data = payload
  },
  totalPages(state) {
    state.lengthPages = Math.ceil(state.data.length / state.numberItemsPage)
  }
}

const actions = {
  setUser(vueContext, payload) {
    vueContext.commit('setUser', payload)
  },
  setData(vueContext, payload) {
    vueContext.commit('setData', payload)
  },
  totalPages(vueContext) {
    vueContext.commit('totalPages')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

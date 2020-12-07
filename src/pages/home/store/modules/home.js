const state = {
  homeData: {
    title: 'vuex home data'
  },
  isLoading: true
}

const mutations = {
  setHomeData (state, data) {
    state.homeData = data
  },
  setIsLoading (state, data) {
    state.isLoading = data
  }
}

export const home = {
  state,
  mutations
}

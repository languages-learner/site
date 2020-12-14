export const state = () => ({
    splitScreenEnable: false
})

export const actions = {
    SplitScreen({ state, commit }) {
        commit(SPLIT_SCREEN)
    }
}

export const mutations = {
    SplitScreen: state => {
        state.splitScreenEnable = !state.splitScreenEnable
    }
}

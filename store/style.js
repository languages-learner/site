import { SPLIT_SCREEN } from '~/store/actions/style'

export const state = () => ({
    splitScreenEnable: false
})

export const actions = {
    [SPLIT_SCREEN]({ state, commit }) {
        commit(SPLIT_SCREEN)
    }
}

export const mutations = {
    [SPLIT_SCREEN]: state => {
        state.splitScreenEnable = !state.splitScreenEnable
    }
}

export const state = () => ({
    currentTheme: 'light',
    themes: ['light', 'dark']
})

export const actions = {
    changeTheme({ commit }, themeIndex) {
        commit('setTheme', themeIndex)
        var date = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000) //30 days
        document.cookie = `theme=${themeIndex}; path=/; expires=${date.toUTCString()}`
    }
}

export const mutations = {
    setTheme(state, themeIndex) {
        state.currentTheme = state.themes[themeIndex]
    }
}

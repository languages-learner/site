const LANGUAGES = {
    0: 'Russian',
    1: 'Engilsh',
    2: 'French'
}

export default context => ({
    getActiveLanguages() {
        if (
            context.store.state.user == undefined ||
            context.store.state.user.currentUser == undefined ||
            context.store.state.user.currentUser.learningLanguage == undefined
        )
            return [0, 1]
        var user = context.store.state.user.currentUser
        return [user.naiveLanguage, user.learningLanguage]
    },
    getLanguageName(id) {
        return LANGUAGES[id]
    },
    getLanguagesArray() {
        return Object.entries(LANGUAGES).map(x => {
            return { key: x[0], value: x[1] }
        })
    },
    getFilteredLanguagesArray() {
        return Object.entries(LANGUAGES)
            .filter(
                x => this.getActiveLanguages().findIndex(t => t == x[0]) != -1
            )
            .map(x => {
                return { key: x[0], value: x[1] }
            })
    },
    getLanguageOptions() {
        return this.getLanguagesArray().map(lang => {
            return { value: lang.key, text: lang.value }
        })
    },
    getFilteredLanguageOptions() {
        return this.getFilteredLanguagesArray().map(lang => {
            return { value: lang.key, text: lang.value }
        })
    },
    getLanguagePairsOptions() {
        var answer = []
        var languages = this.getFilteredLanguagesArray()
        for (var i = 0; i < languages.length; i++) {
            for (var j = 0; j < languages.length; j++) {
                if (i == j) continue
                answer.push({
                    value: `${languages[i].key}-${languages[j].key}`,
                    text: `${languages[i].value}-${languages[j].value}`
                })
            }
        }
        return answer
    }
})

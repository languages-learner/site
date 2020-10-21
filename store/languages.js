export const state = () => ({
    languages: [
        {
            id: 1,
            name: 'english',
            picture:
                'https://i.pinimg.com/736x/af/85/4e/af854ef78ca26b15f40a67b4a947d0e0--flag-of-england-england-uk.jpg'
        }
    ],
    wordGroups: [],

    statusesTask: [],
    typesTask: [],
    typesChangeTask: [],
    typesHistoryChangesTask: []
})

export const getters = {
    nameLanguages: state => langId => {
        var lang = state.languages.find(x => x.id == langId)
        if (lang) return lang.name
        else return ''
    },
    nameWordGroup: state => groupId => {
        var group = state.wordGroups.find(x => x.id == groupId)
        if (group) return group.name
        else return ''
    },

    nameStatusTask: state => statusId => {
        var status = state.statusesTask.find(x => x.id == statusId)
        if (status) return status.name
        else return ''
    },
    nameTypeTask: state => typeId => {
        var type = state.typesTask.find(x => x.id == typeId)
        if (type) return type.name
        else return ''
    },
    nameChangeTask: state => typeId => {
        var change = state.typesChangeTask.find(x => x.id == typeId)
        if (change) return change.name
        else return ''
    },
    nameHistoryTypeChangeTask: state => typeId => {
        var type = state.typesHistoryChangesTask.find(x => x.id == typeId)
        if (type) return type.name
        else return ''
    }
}

export const mutations = {
    SetLanguages: (state, { data }) => {
        Vue.set(state, 'languages', data)
    },
    SetWordGroups: (state, { data }) => {
        Vue.set(state, 'wordGroups', data)
    },
    AddWordGroup: (state, { data }) => {
        state.wordGroups.push(data)
    },

    SetTaskGeneralInformation: (state, { data }) => {
        Vue.set(state, 'statusesTask', data.statusesTask)
        Vue.set(state, 'typesTask', data.typesTask)
        Vue.set(state, 'typesChangeTask', data.typesChangeTask)
        Vue.set(state, 'typesHistoryChangesTask', data.typesHistoryChangesTask)
    }
}

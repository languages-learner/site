import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export const languagesMixin = {
    computed: {
        ...mapState({
            _languages: state => state.languages.languages,
            _wordGroups: state => state.languages.wordGroups,

            _statusesTask: state => state.languages.statusesTask,
            _typesTask: state => state.languages.typesTask,
            _typesChangeTask: state => state.languages.typesChangeTask,
            _typesHistoryChangesTask: state =>
                state.languages.typesHistoryChangesTask
        }),
        ...mapGetters({
            _nameLanguages: 'languages/nameLanguages',
            _nameWordGroup: 'languages/nameWordGroup',
            _nameStatusTask: 'languages/nameStatusTask',
            _nameTypeTask: 'languages/nameTypeTask',
            _nameChangeTask: 'languages/nameChangeTask',
            _nameHistoryTypeChangeTask: 'languages/nameHistoryTypeChangeTask'
        }),

        _languagesOptions() {
            return this._languages.map(x => {
                return { value: x.id, text: x.name }
            })
        },
        _wordGroupsOptions() {
            return this._wordGroups.map(x => {
                return { value: x.id, text: x.name }
            })
        },
        _taskTypesOptions() {
            return this._typesTask.map(x => {
                return { value: x.id, text: x.name }
            })
        },
        _taskStatusesOptions() {
            return this._statusesTask.map(x => {
                return { value: x.id, text: x.name }
            })
        }
    },
    methods: {
        ...mapMutations({
            _setLanguages: 'languages/SetLanguages',
            _setWordGroups: 'languages/SetWordGroups',
            _addWordGroup: 'languages/AddWordGroup',
            _setTaskGeneralInformation: 'languages/SetTaskGeneralInformation'
        }),
        ...mapActions({})
    }
}

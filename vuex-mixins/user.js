import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export const userMixin = {
    computed: {
        ...mapState({
            _currentUser: state => state.user.currentUser
        }),
        ...mapGetters({})
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({})
    }
}

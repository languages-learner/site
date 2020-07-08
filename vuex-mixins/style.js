import { SPLIT_SCREEN } from '~/store/actions/style'

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export const styleMixin = {
    computed: {
        ...mapState({
            _splitScreenEnable: state => state.style.splitScreenEnable
        }),
        ...mapGetters({})
    },
    methods: {
        ...mapActions({
            _splitScreen: 'style/' + SPLIT_SCREEN
        })
    }
}

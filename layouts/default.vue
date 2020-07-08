<template>
    <div>
        <header-ll />

        <div class="row m-0">
            <main class="mb-5 p-0" :class="{ 'col-12': !_splitScreenEnable, 'col-6': _splitScreenEnable }">
                <nuxt />
            </main>

            <main v-if="_splitScreenEnable" class="mb-5 col-6 p-0">
                <nuxt />
            </main>
        </div>
    </div>
</template>

<script>
/* Mixins */
import { styleMixin } from '~/vuex-mixins/style'
/* Components */
import Header from '~/components/main/header'

export default {
    mixins: [styleMixin],
    data() {
        return {}
    },
    components: {
        'header-ll': Header
    },
    created: function() {},
    watch: {},
    methods: {}
}
</script>

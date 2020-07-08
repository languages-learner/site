<template>
    <div class="row mt-3 px-2 mx-0">
        <div class="col-12 p-0 d-flex justify-content-center text-center">
            <b-tabs
                active-nav-item-class="font-weight-bold text-white bg-dark"
                pills
            >
                <b-tab title="Перевод" active>
                    <b-card-text><add-translate /></b-card-text>
                </b-tab>

                <b-tab title="Группу">
                    <b-card-text><add-word-group /></b-card-text>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
/* Mixins */
import { languagesMixin } from '~/vuex-mixins/languages'

/* Components */
import AddTranslate from '~/components/cabinet/add/add-translate'
import AddWordGroup from '~/components/cabinet/add/add-word-group'

export default {
    mixins: [languagesMixin],
    components: {
        'add-translate': AddTranslate,
        'add-word-group': AddWordGroup
    },
    created() {}
}
</script>

<style>
.nav {
    justify-content: center;
}
</style>

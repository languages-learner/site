<template>
    <div>
        <content-template subTitle="Improve your vocabulary">
            <b-tabs active-nav-item-class="font-weight-bold" align="left">
                <b-tab title="Перевод" class="mt-4">
                    <b-card-text><add-translate /></b-card-text>
                </b-tab>

                <b-tab title="Группу">
                    <b-card-text><add-word-group /></b-card-text>
                </b-tab>
            </b-tabs>
        </content-template>
    </div>
</template>

<script>
/* Mixins */
import { languagesMixin } from '~/vuex-mixins/languages'

/* Components */
import ContentTemplate from '~/components/cabinet/content-template'
import AddTranslate from '~/components/cabinet/add/add-translate'
import AddWordGroup from '~/components/cabinet/add/add-word-group'

export default {
    mixins: [languagesMixin],
    layout: 'cabinet',
    components: {
        'content-template': ContentTemplate,
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

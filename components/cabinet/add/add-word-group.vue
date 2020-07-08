<template>
    <div class="row mt-md-5 mt-1 m-0">
        <div class="col-12 mt-4">
            <div class="text-center">Название группы</div>
            <b-form-textarea
                class="mt-2"
                size="sm"
                v-model="name"
            ></b-form-textarea>
        </div>

        <div class="col-12 mt-4 text-center">
            <b-button class="w-100" variant="outline-primary" @click="add"
                >Добавить</b-button
            >
        </div>
    </div>
</template>

<script>
/* Mixins */
import { languagesMixin } from '~/vuex-mixins/languages'

export default {
    mixins: [languagesMixin],
    data() {
        return {
            name: ''
        }
    },
    computed: {},
    methods: {
        add() {
            this.addWordGroup(this.name)
            this.name = ''
        }
    }
}
</script>

<template>
    <div class="row m-0 mt-md-5 mt-3 px-4 justify-content-center">
        <div
            v-if="!inProcess"
            class="row m-0 p-0 col-md-10 col-12 justify-content-center"
        >
            <start-form @startTest="startTest" />
        </div>

        <div v-else-if="!complited" class="row m-0 p-0 col-12">
            <work-form
                v-if="testData != null"
                :testData="testData"
                @onStartTest="onStartTest"
                @onCompleteTest="onCompleteTest"
            />
        </div>

        <div v-else class="row col-12">
            <div class="col-12 text-center">
                <result-form />
                <!--<table-word
                    v-if="testData != null && answerItems != null"
                    :fields="answerFields"
                    :items="answerItems"
                />-->
            </div>

            <div class="col-12 mt-4 text-center">
                <b-button class="w-100" variant="outline-primary" @click="reset"
                    >Заново</b-button
                >
            </div>
        </div>
    </div>
</template>

<script>
/* Mixins */
import { languagesMixin } from '~/vuex-mixins/languages'
//import { voiceMixin } from 'store/mixins/voice'

/* Components */
import StartForm from '~/components/cabinet/test/start-form'
import WorkForm from '~/components/cabinet/test/work-form'
import ResultForm from '~/components/cabinet/test/result-form'

export default {
    mixins: [languagesMixin, voiceMixin],
    components: {
        'start-form': StartForm,
        'work-form': WorkForm,
        'result-form': ResultForm
    },
    data() {
        return {
            inProcess: false,
            complited: false,

            testData: null,
            answerItems: null
        }
    },
    computed: {
        answerFields() {
            return [
                {
                    key: 'first',
                    label: this.nameLanguages(this.testData.firstLangId)
                },
                {
                    key: 'second',
                    label: this.nameLanguages(this.testData.secondLangId)
                },
                { key: 'true', label: 'Правильный' }
            ]
        }
    },
    methods: {
        onStartTest() {
            this.inProcess = true
            this.complited = false
        },
        onCompleteTest(answerItems) {
            this.inProcess = false
            this.complited = true
            this.answerItems = answerItems
        },
        startTest(testData) {
            this.testData = testData
        }
    }
}
</script>

<template>
    <CabinetContentTemplate subTitle="Test your skills">
        <div v-if="!inProcess" class="w-100">
            <start-form @startTest="startTest" />
        </div>
        <div v-else-if="!complited" class="row m-0 p-0 col-12">
            <!--<work-form
                v-if="testData != null"
                :testData="testData"
                @onStartTest="onStartTest"
                @onCompleteTest="onCompleteTest"
            />-->
        </div>
        <div v-else class="row col-12">
            <div class="col-12 text-center">
                <!--<result-form />-->
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
        <div class="row m-0"></div>
    </CabinetContentTemplate>
</template>

<script>
/* Components */
//import ContentTemplate from '~/components/cabinet/content-template'
import StartForm from '~/components/cabinet/test/start-form'
import WorkForm from '~/components/cabinet/test/work-form'
import ResultForm from '~/components/cabinet/test/result-form'

export default {
    layout: 'cabinet',
    dirs: [
        '~/components',
        {
            path: '~/components/cabinet/',
            prefix: 'Cabinet'
        }
    ],
    components: {
        //'content-template': ContentTemplate,
        'start-form': StartForm
        //'work-form': WorkForm,
        //'result-form': ResultForm
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

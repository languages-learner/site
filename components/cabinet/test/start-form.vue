<template>
    <div>
        <div class="col-md-3 col-12">
            Основной язык
            <b-form-select
                v-model="testData.firstLangId"
                :options="_languagesOptions"
            ></b-form-select>
        </div>
        <div class="col-md-3 col-12">
            Второй язык
            <b-form-select
                v-model="testData.secondLangId"
                :options="_languagesOptions"
            ></b-form-select>
        </div>

        <div class="col-md-6 col-12 mt-4 mx-md-4">
            <div class="text-center">Группа слов</div>
            <b-form-select
                class="mt-2"
                v-model="testData.selectedWordGroupId"
                :options="_wordGroupsOptions"
            ></b-form-select>
        </div>

        <div class="col-md-6 col-12 mt-4 mx-md-4">
            <div class="text-center">Кол-во вопросов</div>
            <b-form-input
                class="mt-2"
                v-model.number="testData.valueWord"
                placeholder=""
            ></b-form-input>
        </div>

        <div class="col-md-12 col-12 mt-4">
            <b-form-checkbox
                v-model="testData.withAnswers"
                :value="true"
                :unchecked-value="false"
                >С ответами</b-form-checkbox
            >
            <b-form-checkbox
                v-model="testData.withAssociation"
                :value="true"
                :unchecked-value="false"
                >С ассоциациями</b-form-checkbox
            >
        </div>

        <div class="col-md-6 col-12 mt-4 mx-md-4 text-center">
            <b-button class="w-100" variant="outline-primary" @click="startTest"
                >Начать</b-button
            >
        </div>

        <div class="col-md-6 col-12 mt-4 mx-md-4 text-center">
            <b-button
                class="w-100"
                variant="outline-warning"
                @click="getTimeStamps"
                >Получить добавления по дням</b-button
            >
        </div>

        <div class="col-12 mt-4">
            <b-form-checkbox-group
                v-model="selectedTimeStamps"
                :options="timeStamps"
                stacked
                button
            ></b-form-checkbox-group>
        </div>
    </div>
</template>

<script>
/* Mixins */
import { languagesMixin } from '~/vuex-mixins/languages'

export default {
    mixins: [languagesMixin],
    components: {},
    data() {
        return {
            testData: {
                firstLangId: 1,
                secondLangId: 2,
                valueWord: 15,
                selectedWordGroupId: null,

                withAnswers: false,
                withAssociation: true
            },

            timeStamps: [],
            selectedTimeStamps: []
        }
    },
    methods: {
        startTest() {
            if (this.firstLangId == this.secondLangId) return
            if (this.firstLangId <= 0 && this.secondLangId <= 0) return
            if (this.valueWord <= 0) return

            this.$emit('startTest', testData)
        },
        getTimeStamps() {
            this.getDailAdditions({
                languagesId: [this.firstLangId, this.secondLangId]
            }).then(data => {
                this.$set(
                    this,
                    'timeStamps',
                    data.map(x => {
                        return {
                            text:
                                this.$format.dateSmall(x.timeStamp) +
                                ' (' +
                                x.value +
                                ')',
                            value: x.timeStamp
                        }
                    })
                )
                console.log(this.timeStamps, 'timeStamps')
            })
        }
    }
}
</script>

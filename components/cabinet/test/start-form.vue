<template>
    <div>
        <b-row>
            <template>
                <b-col sm="12" md="6">
                    <b-card
                        img-src="https://www.inturact.com/hs-fs/hub/333468/file-2413503609-jpg/blog-images/Translate.jpg"
                        img-alt="Card Image"
                        class="ll-card"
                        :class="{ active: activeTest == 1 }"
                        v-b-toggle.collapse-1
                        no-body
                    >
                        <b-collapse id="collapse-1">
                            <b-row class="mt-4 text-center px-3 pb-3">
                                <b-col cols="12" class="text-muted"
                                    >Configuration</b-col
                                >
                                <b-col lg="6" md="12" sm="12">
                                    First language
                                    <b-form-select
                                        v-model="testData.firstLangId"
                                        :options="_languagesOptions"
                                    ></b-form-select
                                ></b-col>
                                <b-col lg="6" md="12" sm="12">
                                    Second language
                                    <b-form-select
                                        v-model="testData.secondLangId"
                                        :options="_languagesOptions"
                                    ></b-form-select
                                ></b-col>
                                <b-col cols="12">
                                    Words group
                                    <b-form-select
                                        v-model="testData.selectedWordGroupId"
                                        :options="_wordGroupsOptions"
                                    ></b-form-select>
                                </b-col>
                                <b-col cols="12">
                                    Words group
                                    <b-form-select
                                        v-model="testData.selectedWordGroupId"
                                        :options="_wordGroupsOptions"
                                    ></b-form-select>
                                </b-col>
                                <b-col cols="12">
                                    Numbers of questions
                                    <b-form-input
                                        v-model.number="testData.valueWord"
                                        placeholder=""
                                    ></b-form-input>
                                </b-col>
                                <b-col cols="12">
                                    <b-form-checkbox
                                        v-model="testData.withAnswers"
                                        :value="true"
                                        :unchecked-value="false"
                                        >With answers</b-form-checkbox
                                    >
                                    <b-form-checkbox
                                        v-model="testData.withAssociation"
                                        :value="true"
                                        :unchecked-value="false"
                                        >With associations</b-form-checkbox
                                    >
                                </b-col>
                                <b-col cols="12">
                                    <b-button
                                        class="w-100"
                                        variant="outline-primary"
                                        @click="startTest"
                                        >Начать</b-button
                                    >
                                </b-col>
                            </b-row>
                        </b-collapse>
                    </b-card>
                </b-col>
            </template>
        </b-row>
    </div>
    <!--<div>
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
    </div>-->
</template>

<script>
export default {
    components: {},
    data() {
        return {
            activeTest: 0,
            testData: {
                firstLangId: 1,
                secondLangId: 2,
                valueWord: 15,
                selectedWordGroupId: null,

                withAnswers: false,
                withAssociation: true
            }
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

<style lang="less"></style>

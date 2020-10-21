<template>
    <div>
        <b-row no-gutters class="justify-content-center">
            <b-col v-if="false" lg="4" md="6" sm="12">
                <div class="add-translate-card">
                    <template>
                        <div>Оригинальный язык</div>
                        <b-form-select
                            class="mt-2"
                            v-model="selectedLangId"
                            :options="_languagesOptions"
                        ></b-form-select>
                    </template>
                    <template>
                        <div>Группа слов</div>
                        <b-form-select
                            class="mt-2"
                            v-model="selectedWordGroupId"
                            :options="_wordGroupsOptions"
                        ></b-form-select>
                    </template>
                    <template>
                        <div
                            class="pointer"
                            @click="speak(word, selectedLangId)"
                        >
                            Слово
                        </div>
                        <b-form-textarea
                            class="mt-2"
                            size="sm"
                            v-model="word"
                        ></b-form-textarea>
                    </template>
                    <template>
                        <div>Перевод</div>
                        <b-form-textarea
                            tabindex="0"
                            v-for="(translate, index) in translates"
                            :key="index + 'translate'"
                            class="mt-2"
                            size="sm"
                            v-model="translates[index]"
                        ></b-form-textarea>
                        <div
                            class="text-center my-2 pointer"
                            @click="AddPlaceTranslate"
                        >
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </div>
                    </template>

                    <template>
                        <b-button
                            class="w-100"
                            variant="outline-primary"
                            @click="AddWord"
                            >Добавить</b-button
                        >
                    </template>
                </div>
            </b-col>
            <b-col lg="6" md="6" sm="12">
                <div class="add-translate-card">
                    <div class="d-flex">
                        <template>
                            <b-form-select
                                class="mt-2"
                                v-model="selectedLangId"
                                :options="_languagesOptions"
                                size="sm"
                            ></b-form-select>
                        </template>
                        <template>
                            <div
                                class="pointer"
                                @click="speak(word, selectedLangId)"
                            >
                                Слово
                            </div>
                            <b-form-input
                                class="mt-2"
                                size="sm"
                                v-model="word"
                            ></b-form-input>
                        </template>
                    </div>
                    <template>
                        <div>Перевод</div>
                        <b-form-textarea
                            tabindex="0"
                            v-for="(translate, index) in translates"
                            :key="index + 'translate'"
                            class="mt-2"
                            size="sm"
                            v-model="translates[index]"
                        ></b-form-textarea>
                        <div
                            class="text-center my-2 pointer"
                            @click="AddPlaceTranslate"
                        >
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </div>
                    </template>

                    <template>
                        <b-button
                            class="w-100"
                            variant="outline-primary"
                            @click="AddWord"
                            >Добавить</b-button
                        >
                    </template>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
/* Mixins */
import { languagesMixin } from '~/vuex-mixins/languages'

export default {
    mixins: [languagesMixin],
    data() {
        return {
            selectedLangId: 2,
            selectedWordGroupId: null,
            word: '',

            translates: ['']
        }
    },
    methods: {
        AddWord() {
            this.setTranslate({
                WordGroupId: this.selectedWordGroupId,
                FirstLanguageId: this.selectedLangId,
                FirstText: this.word,
                SecondLanguageId: null,
                SecondText: this.translates
            })
            this.word = ''
            this.translates = ['']
        },
        AddPlaceTranslate() {
            this.translates.push('')
        }
    }
}
</script>

<style lang="less">
.ll-card {
    &.add-translate-card {
        > .card-body {
            > div {
                color: rgba(58, 189, 230, 0.705);
            }
        }
    }
}
</style>

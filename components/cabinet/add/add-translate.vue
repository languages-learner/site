<template>
    <div class="row justify-content-center mt-md-5 mt-1 m-0">
        <div class="col-md-6 col-12 mt-4 mx-md-4">
            <div class="text-center">Оригинальный язык</div>
            <b-form-select
                class="mt-2"
                v-model="selectedLangId"
                :options="_languagesOptions"
            ></b-form-select>
        </div>

        <div class="col-md-6 col-12 mt-4 mx-md-4">
            <div class="text-center">Группа слов</div>
            <b-form-select
                class="mt-2"
                v-model="selectedWordGroupId"
                :options="_wordGroupsOptions"
            ></b-form-select>
        </div>

        <div class="col-md-6 col-12 mt-4 mx-md-4">
            <div
                class="text-center pointer"
                @click="speak(word, selectedLangId)"
            >
                Слово
            </div>
            <b-form-textarea
                class="mt-2"
                size="sm"
                v-model="word"
            ></b-form-textarea>
        </div>

        <div class="col-md-6 col-12 mt-4 mx-md-4">
            <div class="text-center">Перевод</div>
            <b-form-textarea
                tabindex="0"
                v-for="(translate, index) in translates"
                :key="index + 'translate'"
                class="mt-2"
                size="sm"
                v-model="translates[index]"
            ></b-form-textarea>
            <div class="text-center mt-2 pointer" @click="AddPlaceTranslate">
                <i class="fa fa-plus" aria-hidden="true"></i>
            </div>
        </div>

        <div class="col-md-6 col-12 mt-4 mx-md-4 text-center">
            <b-button class="w-100" variant="outline-primary" @click="AddWord"
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

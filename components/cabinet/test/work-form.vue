<template>
    <div>
        <div class="col-12 text-center">
            <b>{{ indexAnswer + 1 }} / {{ valueWord }}</b>
        </div>

        <div class="col-12 mt-md-3 mt-2">
            <div class="text-center">
                {{ nameLanguages(testData.firstLangId) }}
            </div>
            <i
                @click="speak(word, firstLangId)"
                class="fa fa-volume-down pr-2 pointer"
                aria-hidden="true"
            ></i>
            <b-form-textarea
                class="mt-md-2 mt-1"
                size="sm"
                disabled
                v-model="word"
            >
            </b-form-textarea>
        </div>

        <div class="col-12 mt-md-3 mt-2">
            <div class="text-center">
                {{ nameLanguages(testData.secondLanguage) }}
            </div>
            <b-form-textarea
                class="mt-md-2 mt-1"
                size="sm"
                v-model="translate"
            ></b-form-textarea>
        </div>

        <div v-if="withAssociation" class="col-12 mt-md-3 mt-2">
            <div class="text-center">Ассоциация</div>
            <div class="row mx-0 px-0 mt-md-2 mt-1 align-items-center">
                <b-form-textarea
                    class="col-12"
                    size="sm"
                    v-model="association"
                ></b-form-textarea>

                <div
                    v-if="needSaveAssotiation"
                    class="col-12 mt-4 px-0 text-center"
                >
                    <b-button
                        class="w-100"
                        variant="outline-dark"
                        @click="saveAssotiation"
                        >Сохранить ассоциацию</b-button
                    >
                </div>
            </div>
        </div>

        <div class="col-md-4 col-12 mt-4 text-center">
            <b-button class="w-100" variant="outline-warning" @click="setAnswer"
                >Знаю</b-button
            >
        </div>

        <div class="col-md-4 col-6 mt-md-4 mt-2 text-center">
            <b-button
                :disabled="indexAnswer <= 0"
                class="w-100"
                variant="outline-primary"
                @click="prevWord"
                >Назад</b-button
            >
        </div>

        <div class="col-md-4 col-6 mt-md-4 mt-2 text-center">
            <b-button class="w-100" variant="outline-primary" @click="nextWord"
                >Ответить</b-button
            >
        </div>

        <div class="col-12 mt-md-4 mt-2 text-center">
            <b-button
                class="w-100"
                variant="outline-danger"
                @click="complited = true"
                >Закончить</b-button
            >
        </div>
    </div>
</template>

<script>
/* Mixins */
import { languagesMixin } from '~/vuex-mixins/languages'

export default {
    mixins: [languagesMixin],
    props: {
        testData: {
            type: Object,
            required: true
        }
    },
    components: {},
    data() {
        return {
            needSaveAssotiation: false,
            inProcessAssotiation: false,

            words: [],
            answers: [],
            translates: [],
            associations: [],
            translate: '',
            association: '',
            indexAnswer: 0
        }
    },
    computed: {
        word() {
            var text = ''
            this.words[this.indexAnswer].forEach(x => (text += x.text + ', '))
            return text.substring(0, text.length - 2)
        },
        answerFields() {
            return [
                { key: 'first', label: this.nameLanguages(this.firstLangId) },
                { key: 'second', label: this.nameLanguages(this.secondLangId) },
                { key: 'true', label: 'Правильный' }
            ]
        },
        answerItems() {
            var answers = []
            for (var i = 0; i < this.valueWord; i++) {
                var f = ''
                this.words[i].forEach(x => (f += x.text + ','))

                var t = ''
                this.translates
                    .filter(
                        x =>
                            x.wordId == this.words[i][0].wordId &&
                            x.languageId == this.secondLangId
                    )
                    .forEach(x => (t += x.text + ','))

                answers[i] = {
                    first: f.substring(0, f.length - 1),
                    second: this.answers[i],
                    true: this.translates.filter(
                        x =>
                            x.wordId == this.words[i][0].wordId &&
                            x.languageId == this.secondLangId
                    )
                }
            }

            return answers
        }
    },
    methods: {
        startTest() {
            this.indexAnswer = 0
            this.$set(this, 'words', [])
            this.$set(this, 'answers', [])
            this.$set(this, 'translates', [])

            this.getTranslates({
                languagesId: [
                    this.testData.firstLangId,
                    this.testData.secondLangId
                ]
            }).then(data => {
                this.translates = data
                var set_word = this.getRandomWords()
                if (set_word) {
                    rhis.$emit('onStartTest')
                    if (this.withAssociation)
                        this.getAssotiations().then(data => {
                            this.$set(this, 'associations', data)
                        })
                }
            })
        },
        getAvailableWordsId() {
            var wordId = []

            for (var w in this.translates) {
                w = this.translates[w]

                var wf = null
                var ws = null

                if (!this.testData.selectedWordGroupId) {
                    wf = this.translates.find(
                        x =>
                            x.wordId == w.wordId &&
                            x.languageId == this.testData.firstLangId
                    )
                    ws = this.translates.find(
                        x =>
                            x.wordId == w.wordId &&
                            x.languageId == this.testData.secondLangId
                    )
                } else {
                    wf = this.translates.find(
                        x =>
                            x.wordId == w.wordId &&
                            x.languageId == this.testData.firstLangId &&
                            x.wordGroupId == this.testData.selectedWordGroupId
                    )
                    ws = this.translates.find(
                        x =>
                            x.wordId == w.wordId &&
                            x.languageId == this.testData.secondLangId &&
                            x.wordGroupId == this.testData.selectedWordGroupId
                    )
                }

                //if (this.selectedTimeStamps.length > 0)

                if (!wordId.includes(w.wordId) && wf && ws)
                    wordId[wordId.length] = w.wordId
            }

            return wordId
        },
        getRandomWords() {
            this.$set(this, 'words', [])
            var wordId = this.getAvailableWordsId()

            var valueWords = wordId.length
            if (valueWords <= 0) {
                this.$notifyError('Не найдено подходящих слов')
                return false
            }
            if (valueWords < this.testData.valueWord)
                this.testData.valueWord = valueWords

            var needWords = this.testData.valueWord
            var selectedId = []
            while (true) {
                if (needWords <= 0) break

                var random = Math.floor(Math.random() * valueWords)
                if (selectedId.includes(random)) continue

                var randomWordId = wordId[random]
                var w = this.translates.filter(
                    x =>
                        x.wordId == randomWordId &&
                        x.languageId == this.testData.firstLangId
                )
                if (!w || w.length <= 0) continue

                selectedId[selectedId.length] = random
                this.words[this.words.length] = w

                needWords--
            }

            if (this.testData.withAnswers) this.setAnswer()
            if (this.testData.withAssociation) this.setAssociation()

            return true
        },
        prevWord() {
            this.indexAnswer--
            this.translate = this.answers[this.indexAnswer]
            if (this.testData.withAssociation) this.setAssociation()
        },
        nextWord() {
            this.answers[this.indexAnswer] = this.translate
            this.translate = ''
            if (this.indexAnswer == this.testData.valueWord - 1) {
                this.$emit('onCompleteTest', this.answerItems)
                this.complited = true
                return
            }
            this.indexAnswer++
            if (this.testData.withAnswers) this.setAnswer()
            if (this.testData.withAssociation) this.setAssociation()
        },
        reset() {
            this.$emit('onCompleteTest')
        },
        setAnswer() {
            var t = this.translates.filter(
                x =>
                    x.wordId == this.words[this.indexAnswer][0].wordId &&
                    x.languageId == this.testData.secondLangId
            )
            var text = ''
            t.forEach(x => (text += x.text + ', '))
            this.translate = text.substring(0, text.length - 2)
        },
        setAssociation() {
            this.inProcessAssotiation = true
            this.needSaveAssotiation = false
            var a = this.associations.find(
                x => x.wordId == this.words[this.indexAnswer][0].wordId
            )
            if (a) this.association = a.text
            else this.association = ''

            setTimeout(() => {
                this.inProcessAssotiation = false
                this.needSaveAssotiation = false
            }, 1000)
        },

        saveAssotiation() {
            this.addAssotiation({
                WordId: this.words[this.indexAnswer][0].wordId,
                Text: this.association
            }).then(data => {
                var a = this.associations.findIndex(
                    x => x.wordId == this.words[this.indexAnswer][0].wordId
                )
                if (a && a > 0) this.$set(this.associations, a, data)
                else this.associations.push(data)
            })
        },

        selectDate() {}
    },
    watch: {
        association() {
            if (!this.inProcessAssotiation) this.needSaveAssotiation = true
        }
    }
}
</script>

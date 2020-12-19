<template>
    <div class="add-translate">
        <!-- Filter -->
        <template>
            <b-row>
                <b-col md="5" cols="12" class="m-0 pr-md-0">
                    <b-form-select
                        class="select-languages"
                        placeholder="Languages"
                        selection
                        :options="
                            $resources['languages'].getLanguagePairsOptions()
                        "
                        v-model="selectedLanguages"
                    />
                </b-col>
                <b-col md="7" cols="12" class="m-0 pl-md-0 mt-md-0 mt-3">
                    <b-form-input
                        class="input-word"
                        placeholder="Insert your word here"
                        icon="arrow right"
                        :value="word"
                        @input="onInputWord"
                        type="text"
                    >
                    </b-form-input>
                </b-col>
            </b-row>
        </template>

        <!-- Word label -->
        <template
            ><div class="selected-word-container mt-5 d-md-block d-none">
                <span class="pr-3">{{ word }}</span>
            </div></template
        >

        <!-- Principals translatins -->
        <template v-if="word != '' && principalsTranslations.length > 0">
            <div class="castom-translations mt-5">
                <div class="list-label">
                    <label>Principals translations</label>
                </div>
                <div class="mt-3">
                    <b-form-tags
                        v-model="principalsTranslations"
                        class="mb-2 border-0 p-0"
                        no-outer-focus
                    >
                        <template
                            v-slot="{
                                tags
                            }"
                        >
                            <ul
                                id="my-custom-tags-list"
                                class="list-unstyled d-inline-flex flex-wrap mb-0"
                                aria-live="polite"
                                aria-atomic="false"
                                aria-relevant="additions removals"
                            >
                                <b-card
                                    v-for="tag in tags"
                                    :key="tag"
                                    :id="
                                        `my-custom-tags-tag_${tag.replace(
                                            /\s/g,
                                            '_'
                                        )}_`
                                    "
                                    tag="li"
                                    class="mt-1 mr-1"
                                    body-class="py-1 pr-2 text-nowrap"
                                    :border-variant="
                                        containsInPersonalTranslations(tag)
                                            ? 'success'
                                            : ''
                                    "
                                >
                                    <strong>{{ tag }}</strong>
                                    <b-button
                                        @click="selectPrincipalsTranslate(tag)"
                                        variant="link"
                                        size="sm"
                                        :aria-controls="
                                            `my-custom-tags-tag_${tag.replace(
                                                /\s/g,
                                                '_'
                                            )}_`
                                        "
                                        >add</b-button
                                    >
                                </b-card>
                            </ul>
                        </template>
                    </b-form-tags>
                </div>
            </div>
        </template>

        <!-- Personal translatins -->
        <template v-if="word != ''">
            <div class="personal-translations mt-5">
                <div class="list-label">
                    <label>Personal translations</label>
                </div>
                <div class="mt-3">
                    <b-form-tags
                        input-id="tags-state-event"
                        v-model="personalTranslations"
                        placeholder="Enter your translate"
                        separator=" "
                    ></b-form-tags>
                </div>
            </div>
        </template>

        <!-- Actions -->
        <template
            v-if="
                addedTranslations.length > 0 || removedTranslations.length > 0
            "
        >
            <div class="personal-translatins mt-5">
                <div v-if="addedTranslations.length > 0">
                    Added: {{ addedTranslations.length }}
                </div>
                <div v-if="removedTranslations.length > 0">
                    Removed: {{ removedTranslations.length }}
                </div>
                <div class="mt-3">
                    <b-button @click="saveTranslates">Save</b-button>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    mixins: [],
    data() {
        return {
            word: '',
            inProcessSearchWord: false,
            selectedLanguages: null,
            translates: [],
            personalTranslations: []
        }
    },
    created() {
        this.selectedLanguages = this.$resources[
            'languages'
        ].getLanguagePairsOptions()[0].value
    },
    methods: {
        onInputWord(word) {
            this.word = word
            setTimeout(() => {
                var newWord = this.word
                if (word == newWord) {
                    this.searchWord(word)
                }
            }, 1000)
        },
        containsInPersonalTranslations(translate) {
            return (
                this.personalTranslations.findIndex(x => x == translate) != -1
            )
        },
        selectPrincipalsTranslate(translate) {
            this.personalTranslations.push(translate)
        },
        searchWord() {
            if (this.inProcessSearchWord) return
            this.inProcessSearchWord = true
            this.$repositories['translates']
                .get(
                    { text: this.word, language: this.selectedLanguagesIds[0] },
                    this.selectedLanguagesIds[1]
                )
                .then(data => {
                    this.$set(this, 'translates', data)
                    this.personalTranslations = this.translates
                        .filter(translate => translate.wordId != null)
                        .map(translate => translate.text)
                    this.inProcessSearchWord = false
                })
            this.inProcessSearchWord = false
        },
        saveTranslates() {
            var addTranslates = () => {
                var translates = this.personalTranslations.map(text => {
                    return {
                        text: text,
                        language: this.selectedLanguagesIds[1],
                        wordId: this.wordId
                    }
                })
                translates.push({
                    text: this.word,
                    language: this.selectedLanguagesIds[0],
                    wordId: this.wordId
                })
                if (translates.length > 0)
                    return this.$repositories['translates'].add(translates)
                else return new Promise((resolve, reject) => resolve({}))
            }

            var removeTranslates = () => {
                var translates = this.removedTranslations.map(text => {
                    return {
                        text: text,
                        language: this.selectedLanguagesIds[1],
                        wordId: this.wordId
                    }
                })
                if (translates.length > 0)
                    return this.$repositories['translates'].delete(translates)
                else return new Promise((resolve, reject) => resolve({}))
            }

            addTranslates().then(data => {
                removeTranslates().then(data => {
                    this.searchWord()
                })
            })
        }
    },
    computed: {
        principalsTranslations() {
            return this.translates
                .filter(translate => translate.principal)
                .map(translate => translate.text)
        },
        selectedLanguagesIds() {
            return [
                Number(this.selectedLanguages.split('-')[0]),
                Number(this.selectedLanguages.split('-')[1])
            ]
        },
        wordId() {
            if (this.translates.findIndex(x => x.wordId != null) != -1)
                return this.translates.find(x => x.wordId != null).wordId
            else return 0
        },
        addedTranslations() {
            var answer = []
            for (var i in this.personalTranslations) {
                var text = this.personalTranslations[i]
                if (
                    this.translates.findIndex(
                        translate => translate.text == text
                    ) == -1
                )
                    answer.push(text)
            }
            return answer
        },
        removedTranslations() {
            var answer = []
            for (var i in this.translates) {
                var text = this.translates[i].text
                if (
                    this.personalTranslations.findIndex(
                        translate => translate == text
                    ) == -1
                )
                    answer.push(text)
            }
            return answer
        }
    }
}
</script>

<style lang="less">
.add-translate {
    .select-languages {
        border-radius: 10px 0 0 10px !important;
        color: white !important;
        background: rgba(58, 189, 230, 0.705) !important;
        height: 50px !important;
        display: flex !important;
        align-items: center !important;

        @media (max-width: @md) {
            border-radius: 10px !important;
        }

        i {
            padding-top: 16px !important;
        }
    }
    .input-word {
        max-width: 1000px !important;
        width: 100%;
        height: 50px;
        outline: none !important;
        border: none !important;
        border-radius: 0 15px 15px 0 !important;
        background: rgba(141, 141, 141, 0.089) !important;

        @media (max-width: @md) {
            border-radius: 10px !important;
        }
    }
}

.selected-word-container {
    span {
        font-size: 20px;
        font-weight: bold;
    }
}

.list-label {
    font-size: 16px;
    color: rgba(58, 189, 230, 0.705) !important;
    font-weight: bold;
}

.castom-translations {
    .list {
        .item {
            height: 25px;
            i {
                cursor: pointer;
                opacity: 0;
                color: gray;
                font-size: 10px;
                transition: 0.3s;
            }

            &:hover {
                i {
                    opacity: 1;
                }
            }
        }
    }
}

.personal-translations {
    .castom-translations;
    .new-translate {
        display: flex;
        align-items: center;
        .input-container {
            max-width: 200px;
            display: flex !important;
            align-items: center !important;
            width: 100%;
            height: 40px;
            .input {
                width: 100%;
            }
            input {
                border: none !important;
                border-radius: 15px 0 0 15px !important;
                background: rgba(141, 141, 141, 0.089) !important;
            }
        }
        .action-container {
            background: rgba(58, 189, 230, 0.705) !important;
            max-width: 50px;
            display: flex !important;
            align-items: center !important;
            justify-content: center;
            width: 100%;
            height: 36px;
            border-radius: 0 15px 15px 0 !important;
            color: white;
        }
    }
}
</style>

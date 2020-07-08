<template>
    <div class="row mt-md-5 mt-3 m-0 justify-content-center">
        <div class="col-12 p-0 m-0 row justify-content-center">
            <div class="col-12 text-center mb-2 mx-0">Столбцы</div>
            <b-form-checkbox-group
                v-model="selectedAdditions"
                :options="additions"
                class="col-12 text-center"
            ></b-form-checkbox-group>
        </div>

        <div class="col-12 mt-4 p-0 m-0 row justify-content-center">
            <div class="col-12 text-center mb-2 mx-0">Фильтр</div>
            <b-form-checkbox-group
                v-model="selectedFilters"
                :options="filters"
                class="col-12 text-center"
            ></b-form-checkbox-group>
        </div>

        <div class="col-12 mt-4 p-0 m-0 row justify-content-center">
            <div class="col-12 text-center mb-2 mx-0">Языки</div>
            <b-form-checkbox-group
                v-model="selectedLangsId"
                :options="languages"
                class="col-12 text-center"
            ></b-form-checkbox-group>
        </div>

        <div class="col-md-6 col-12 mt-3">
            <b-form-input
                ref="search-input"
                v-model="searchText"
                :autofocus="true"
                placeholder="Поиск"
            ></b-form-input>
        </div>

        <div class="col-12 mt-3 d-flex justify-content-center">
            <div>Слов: {{ valueWords }}</div>
            <div class="pointer ml-3 main-color" @click="LoadTranslates">
                <i class="fa fa-refresh" aria-hidden="true"></i>
            </div>
            <div class="pointer ml-3 main-color" @click="shuffleWordsItems">
                <i class="fa fa-exchange" aria-hidden="true"></i>
            </div>
        </div>

        <div class="col-12 mt-3 p-0">
            <!--<table-word
                :fields="wordFields"
                :items="wordItems"
                :tableBusyState="tableBusyState"
                :searchText="searchText"
                @onFiltered="onFiltered"
            />-->
        </div>
    </div>
</template>

<script>
/* Mixins */
import { languagesMixin } from '~/vuex-mixins/languages'
//import { voiceMixin } from 'store/mixins/voice'

/* Components */
//import TableWord from './table-word'
import { setTimeout } from 'timers'

export default {
    mixins: [languagesMixin, voiceMixin],
    props: { activeTab: { type: Number, required: true } },
    components: {
        //'table-word': TableWord
    },
    data() {
        return {
            selectedLangsId: [],
            translates: [],
            searchText: '',
            valueWords: 0,

            tableBusyState: false,

            selectedFilters: ['learned'],
            filters: [{ value: 'learned', text: 'Выученные' }],

            selectedAdditions: [],
            additions: [
                { value: 'learned', text: 'Выучено' },
                { value: 'timeStamp', text: 'Дата' },
                { value: 'wordGroupId', text: 'Группа' }
            ],

            wordItems: []
        }
    },
    computed: {
        languages() {
            return this.allLanguages.map(x => {
                return { value: x.id, text: x.name }
            })
        },
        wordFields() {
            return this.selectedLangsId
                .map(x => {
                    return {
                        key: String(x),
                        label: this.nameLanguages(x),
                        sortable: true
                    }
                })
                .concat(
                    this.selectedAdditions.map(x => {
                        return {
                            key: String(x),
                            label: this.additions.find(g => g.value == x).text,
                            sortable: true
                        }
                    })
                )
        }
    },
    watch: {
        selectedLangsId() {
            this.LoadTranslates()
        },
        selectedAdditions() {},
        activeTab() {
            if (this.activeTab == 2) this.$refs['search-input'].focus()
        }
    },
    methods: {
        LoadTranslates() {
            this.$set(this, 'tableBusyState', true)
            this.getTranslates({ languagesId: this.selectedLangsId }).then(
                data => {
                    this.translates = data
                    this.setWords()
                    this.$set(this, 'tableBusyState', false)
                }
            )
        },
        onFiltered(filteredItems) {
            this.valueWords = filteredItems.length
        },
        setWords() {
            var wordId = []
            this.translates.forEach(x => {
                if (!wordId.find(g => g.id == x.wordId))
                    wordId[wordId.length] = { id: x.wordId, learned: x.learned }
            })

            var words = []
            for (var key in wordId) {
                var id = wordId[key].id

                if (
                    !this.selectedFilters.includes('learned') &&
                    wordId[key].learned
                )
                    continue

                var index = words.length
                words[index] = {}

                this.translates.forEach(x => {
                    if (x.wordId == id) {
                        words[index].wordId = x.wordId
                        words[index].learned = x.learned
                        words[index].timeStamp = x.timeStamp
                        words[index].wordGroupId = x.wordGroupId

                        if (!words[index][x.languageId])
                            words[index][x.languageId] = x.text
                        else words[index][x.languageId] += ', ' + x.text
                    }
                })
            }

            this.$set(this, 'wordItems', words)
            this.valueWords = this.wordItems.length
        },
        shuffleWordsItems() {
            var array = this.wordItems
            var currentIndex = array.length,
                temporaryValue,
                randomIndex

            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex)
                currentIndex -= 1

                temporaryValue = array[currentIndex]
                array[currentIndex] = array[randomIndex]
                array[randomIndex] = temporaryValue
            }

            this.$set(this, 'tableBusyState', true)
            this.$set(this, 'wordItems', [])
            setTimeout(() => {
                this.$set(this, 'wordItems', array)
                this.$set(this, 'tableBusyState', false)
            }, 1000)
        }
    }
}
</script>

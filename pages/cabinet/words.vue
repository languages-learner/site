<template>
    <content-template subTitle="Improve your vocabulary">
        <b-row no-gutters>
            <b-col lg="3" md="4" sm="12">
                <b-form-input
                    ref="search-input"
                    v-model="searchText"
                    :autofocus="true"
                    placeholder="Поиск"
                ></b-form-input>
            </b-col>
            <!--
                <b-col
                md="4"
                sm="12"
                class="d-flex align-items-center justify-content-start pl-md-2"
            >
                <div
                    v-for="(language, index) in _languages"
                    :key="'language' + index"
                    class="img-sm-selector"
                    :class="{ active: selectedLangsId.includes(language.id) }"
                    @click="selectLanguage(language)"
                >
                    <img :src="language.picture" />
                </div>
            </b-col>
            -->
            <b-col
                lg="1"
                md="4"
                sm="12"
                v-if="searchText && searchText != ''"
                class="pl-md-2"
            >
                <b-button variant="info" class="w-100">Add</b-button>
            </b-col>
            <b-col lg="2" md="3" sm="6" class="pl-md-2">
                <b-dropdown text="Columns" class="w-100" variant="info">
                    <b-dropdown-form>
                        <b-form-checkbox-group
                            v-model="selectedAdditions"
                            :options="additions"
                        ></b-form-checkbox-group>
                    </b-dropdown-form>
                </b-dropdown>
            </b-col>
            <b-col lg="2" md="3" sm="6" class="pl-md-2">
                <b-dropdown text="Filters" class="w-100" variant="info">
                    <b-dropdown-form>
                        <b-form-checkbox-group
                            v-model="selectedFilters"
                            :options="filters"
                        ></b-form-checkbox-group>
                    </b-dropdown-form>
                </b-dropdown>
            </b-col>
            <b-col lg="2" md="2" sm="12" class="pl-md-2">
                <b-button variant="outline-primary" @click="loadTranslates">
                    <i class="fa fa-refresh" aria-hidden="true"></i
                ></b-button>
                <b-button variant="outline-primary" @click="shuffleWordsItems">
                    <i class="fa fa-exchange" aria-hidden="true"></i
                ></b-button>
            </b-col>
        </b-row>
        <div class="w-100 mt-4">
            <h7 class="value-words-label">WORDS: {{ valueWords }}</h7>
        </div>
        <table-word
            :fields="wordFields"
            :items="wordItems"
            :tableBusyState="tableBusyState"
            :searchText="searchText"
            @onFiltered="onFiltered"
        />
    </content-template>
</template>

<script>
/* Mixins */
import { languagesMixin } from '~/vuex-mixins/languages'
import { userMixin } from '~/vuex-mixins/user'
//import { voiceMixin } from 'store/mixins/voice'

/* Components */
import ContentTemplate from '~/components/cabinet/content-template'
import TableWord from '~/components/cabinet/words/table-word'

export default {
    mixins: [languagesMixin, userMixin],
    layout: 'cabinet',
    components: {
        'content-template': ContentTemplate,
        'table-word': TableWord
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
            //this.loadTranslates()
        }
    },
    methods: {
        loadTranslates() {
            this.$set(this, 'tableBusyState', true)
            this.$apiCore
                .GetTranslates({
                    languagesId: [
                        this._currentUser.inLearningLanguageId,
                        this._currentUser.nativeLanguageId
                    ]
                })
                .then(data => {
                    this.translates = data
                    this.setWords()
                    this.$set(this, 'tableBusyState', false)
                })
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
        /*selectLanguage(language) {
            var index = this.selectedLangsId.findIndex(x => x == language.id)
            if (index != -1) {
                this.selectedLangsId.splice(index, 1)
            } else {
                this.selectedLangsId.push(language.id)
            }
        }*/
    }
}
</script>

<style lang="less" scoped>
.img-sm-selector {
    width: 40px;

    &:hover {
        .active;
    }

    &.active {
        outline: rgba(58, 189, 230, 0.705) solid 2px;
    }
}

.value-words-label {
    color: #6c757d;
    font-size: 0.7rem;
}
</style>

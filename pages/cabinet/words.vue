<template>
    <CabinetContentTemplate subTitle="Improve your vocabulary">
        <CabinetWordsFilter
            @update="onUpdateFilter"
            @loadTranslates="loadTranslates"
            @shuffleWordsItems="shuffleWordsItems"
        />
        <CabinetWordsStatistics :valueWords="valueWords" />
        <CabinetWordsTableTranslates
            v-if="filter != null"
            :fields="filter.wordFields"
            :items="wordItems"
            :tableBusyState="tableBusyState"
            :searchText="filter.searchText"
            @onFiltered="onFiltered"
        />
    </CabinetContentTemplate>
</template>

<script>
/* Mixins */
import { userMixin } from '~/vuex-mixins/user'

export default {
    mixins: [userMixin],
    layout: 'cabinet',
    data() {
        return {
            filter: null,
            translates: [],
            valueWords: 0,
            tableBusyState: false,
            wordItems: []
        }
    },

    methods: {
        onUpdateFilter(data) {
            console.log('onUpdateFilter', data)
            this.$set(this, 'filter', data)
        },
        onFiltered(filteredItems) {
            this.valueWords = filteredItems.length
        },
        loadTranslates() {
            var groupBy = (items, key) => {
                console.log(items, 'items')
                return items.reduce(function(rv, x) {
                    ;(rv[x[key]] = rv[x[key]] || []).push(x)
                    return rv
                }, {})
            }

            this.tableBusyState = true
            this.$repositories['translates']
                .grid(this.filter.gridParameters)
                .then(data => {
                    this.translates = data
                    var wordItems = Object.values(
                        groupBy(data.list, 'wordId')
                    ).map(items => groupBy(items, 'language'))

                    this.$set(this, 'wordItems', wordItems)
                    this.tableBusyState = false
                })
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
</style>

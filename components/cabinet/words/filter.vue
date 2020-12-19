<template>
    <div>
        <b-row no-gutters>
            <!-- Input -->
            <b-col
                lg="4"
                md="6"
                sm="9"
                cols="12"
                order-lg="1"
                order-md="3"
                order-sm="3"
                order="3"
                class="pr-md-1 pr-sm-1 my-sm-0 my-1"
            >
                <b-form-input
                    ref="search-input"
                    v-model="searchText"
                    :autofocus="true"
                    placeholder="Поиск"
                    debounce="300"
                ></b-form-input>
            </b-col>

            <!-- Languages selector -->
            <b-col
                lg="2"
                md="6"
                sm="6"
                order-lg="3"
                order-md="0"
                order-sm="0"
                order="0"
                class="pr-md-1 mb-md-2 pr-sm-1 mb-sm-2 my-sm-0 my-1"
            >
                <b-dropdown text="Columns" class="w-100" variant="info">
                    <b-dropdown-form>
                        <b-form-checkbox-group
                            v-model="selectedAdditions"
                            :options="additions"
                            @input="onUpdateFilterProperty"
                        ></b-form-checkbox-group>
                    </b-dropdown-form>
                </b-dropdown>
            </b-col>

            <!-- Filters -->
            <b-col
                lg="2"
                md="6"
                sm="6"
                order-lg="4"
                order-md="1"
                order-sm="1"
                order="1"
                class="pl-md-1 pl-sm-1 my-sm-0 my-1"
            >
                <b-dropdown text="Filters" class="w-100" variant="info">
                    <b-dropdown-form>
                        <b-form-checkbox-group
                            v-model="selectedFilters"
                            :options="filters"
                            @input="onUpdateFilterProperty"
                        ></b-form-checkbox-group>
                    </b-dropdown-form>
                </b-dropdown>
            </b-col>

            <!-- Action buttons -->
            <b-col
                lg="2"
                md="6"
                sm="3"
                order-lg="2"
                order-md="4"
                order-sm="4"
                order="4"
                class="pl-md-1 pl-sm-1 d-sm-block d-none"
            >
                <div class="d-flex">
                    <div class="pr-md-1 pr-sm-1">
                        <b-button
                            variant="outline-primary"
                            @click="loadTranslates"
                        >
                            <i class="fa fa-refresh" aria-hidden="true"></i
                        ></b-button>
                    </div>
                    <div class="pl-md-1 pl-sm-1">
                        <b-button
                            variant="outline-primary"
                            @click="shuffleWordsItems"
                        >
                            <i class="fa fa-exchange" aria-hidden="true"></i
                        ></b-button>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchText: '',
            selectedLangsId: [0, 1],
            selectedFilters: [],
            filters: [{ value: 'learned', text: 'Learned' }],

            selectedAdditions: [],
            additions: [
                { value: 'learned', text: 'Learned' },
                { value: 'timeStamp', text: 'Date' },
                { value: 'wordGroupId', text: 'Group' }
            ]
        }
    },
    created() {
        this.selectedLangsId = this.$resources['languages'].getActiveLanguages()
        this.update()
    },
    methods: {
        onUpdateFilterProperty() {
            this.update()
        },
        update() {
            this.$emit('update', {
                searchText: this.searchText,
                gridParameters: this.gridParameters,
                wordFields: this.wordFields,
                selectedLangsId: this.selectedLangsId
            })
        },
        loadTranslates() {
            this.$emit('loadTranslates')
        },
        shuffleWordsItems() {
            this.$emit('shuffleWordsItems')
        }
    },
    computed: {
        /**
         * {
         *      Filters: [{Property: string, Comparison: string, Value: string}],
         *      Order: {Ascending: bool, Property: string},
         *      Page: {Index: int, Size: int}
         * }
         */
        gridParameters() {
            return {
                filters: [],
                order: { ascending: true, property: '' },
                page: { index: 1, size: 50 }
            }
        },
        wordFields() {
            return this.selectedLangsId
                .map(x => {
                    return {
                        key: String(x),
                        label: this.$resources['languages'].getLanguageName(x),
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
        searchText() {
            this.update()
        }
    }
}
</script>

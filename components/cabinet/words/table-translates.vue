<template>
    <b-table
        ref="focusThis"
        class="text-center m-auto"
        :style="'max-width:' + max_width * fields.length + 'px;'"
        :fields="fields"
        :items="items"
        :filter="searchText"
        small
        :busy="tableBusyState"
        hover
        responsive
        fixed
        @filtered="onFiltered"
    >
        <!-- BUSY -->
        <div slot="table-busy" class="text-center text-info my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
        </div>

        <template #cell(0)="data">
            <span :key="0 + 'translate'">
                {{ data.value.map(translate => translate.text).join(', ') }}
            </span>
        </template>

        <template #cell(1)="data">
            <span :key="1 + 'translate'">
                {{ data.value.map(translate => translate.text).join(', ') }}
            </span>
        </template>

        <template #cell(2)="data">
            <span :key="2 + 'translate'">
                {{ data.value.map(translate => translate.text).join(', ') }}
            </span>
        </template>
    </b-table>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            max_width: 500,
            value_column: 1
        }
    },
    props: {
        items: {
            type: Array,
            required: true
        },
        fields: {
            type: Array,
            required: true
        },
        searchText: {
            type: String,
            required: false,
            default: null
        },
        tableBusyState: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        onFiltered(filteredItems) {
            this.$emit('onFiltered', filteredItems)
        }
    }
}
</script>

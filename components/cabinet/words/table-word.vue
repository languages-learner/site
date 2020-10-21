<template>
    <b-card
        no-body
        class="bot-table m-0 p-0 w-100"
        border-variant="white"
        bg-variant="white"
    >
        <b-collapse
            class="containe m-0 p-0"
            :id="'accordion' + _uid"
            visible
            :accordion="'accordion' + _uid"
            role="tabpanel"
        >
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
                @filtered="$emit('onFiltered', $event)"
                tdClass="word-table-column"
            >
                <!-- BUSY -->
                <div slot="table-busy" class="text-center text-info my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>

                <template v-for="index in 4" :slot="index" slot-scope="data">
                    <span
                        class="pointer"
                        @click="speak(data.value, index)"
                        :key="index + 'voice'"
                    >
                        <i
                            v-if="data.value && data.value != '' && false"
                            class="fa fa-volume-down pr-2"
                            aria-hidden="true"
                        ></i>
                        {{ data.value }}
                    </span>
                </template>

                <template slot="second" slot-scope="data">
                    <span v-if="checkRight(data)" class="text-success">{{
                        data.value
                    }}</span>
                    <span v-else class="text-danger">{{ data.value }}</span>
                </template>

                <template slot="true" slot-scope="data">
                    <span>{{ getTrueAnswer(data.value) }}</span>
                </template>

                <template slot="timeStamp" slot-scope="data">
                    <span>{{ $format.dateSmall(data.value) }}</span>
                </template>

                <template slot="learned" slot-scope="data">
                    <b-form-checkbox
                        v-model="data.value"
                        @change="
                            editLearned({
                                wordId: data.item.wordId,
                                learned: !data.value
                            })
                        "
                        :value="true"
                        :unchecked-value="false"
                    ></b-form-checkbox>
                </template>
            </b-table>
        </b-collapse>
    </b-card>
</template>

<script>
/* Mixins */
import { languagesMixin } from '~/vuex-mixins/languages'
//import { voiceMixin } from 'store/mixins/voice'

export default {
    mixins: [languagesMixin],
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
        checkRight(data) {
            var a = data.item.true.find(x => x.text === data.item.second)
            if (a) return true
            else return false
        },
        getTrueAnswer(value) {
            var t = ''
            value.forEach(x => (t += x.text + ','))
            return t.substring(0, t.length - 1)
        }
    },
    mounted() {
        //console.log(this.$refs.focusThis, 'this.$refs.focusThis');
        //this.$refs.focusThis.focus
    }
}
</script>

<style>
.table {
    margin-bottom: 0;
}
</style>

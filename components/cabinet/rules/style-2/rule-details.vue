<template>
    <div>
        <div
            class="unset pl-0"
            :class="{ 'px-md-5': !splitScreenEnable }"
            style="font-size: 18px;"
            v-if="true"
            v-html="rule.details"
        ></div>
    </div>
</template>

<script>
/* Mixins */
import { styleMixin } from '~/vuex-mixins/style'

export default {
    mixins: [styleMixin],
    props: {
        rule: {
            type: Object,
            required: true
        }
    },
    methods: {
        hideModal() {
            this.$emit('close')
            this.$refs['modal-rule-details'].hide()
        }
    },
    created() {}
}
</script>

<style>
.unset {
    text-align: left !important;
}
</style>

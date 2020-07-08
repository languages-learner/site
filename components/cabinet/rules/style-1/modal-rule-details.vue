<template>
    <transition name="modal">
        <b-modal
            id="modal-rule-details"
            centered
            :title="rule.title"
            body-class="px-2 py-md-4 py-3"
            :hide-footer="true"
            size="xl"
        >
            <div class="modal-container">
                <div class="px-md-5 px-1 content">
                    <div
                        class="d-flex justify-content-center"
                        style="font-size: 18px;"
                        v-if="true"
                        v-html="rule.details"
                    ></div>
                </div>
            </div>
        </b-modal>
    </transition>
</template>

<script>
export default {
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
    }
}
</script>

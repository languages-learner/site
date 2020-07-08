<template>
    <div>
        <div class="row mt-3 mx-0 justify-content-center">
            <rule-panel
                v-for="(rule, index) in rules"
                :rule="rule"
                class="col-md-3 col-12 mt-4 mx-3"
                :key="index + 'rule'"
                @selectRule="selectRule"
            />
        </div>

        <modal-rule-details
            v-if="selectedRule"
            :rule="selectedRule"
            @close="unselectRule"
        />
    </div>
</template>

<script>
/* Mixins */
import { languagesMixin } from '~/vuex-mixins/languages'

/* Components */
import RulePanel from './rule-panel'
import ModalRuleDetails from './modal-rule-details'

export default {
    mixins: [languagesMixin],
    props: {
        rules: {
            type: Array,
            required: true
        }
    },
    components: {
        'rule-panel': RulePanel,
        'modal-rule-details': ModalRuleDetails
    },
    data() {
        return {
            selectedRule: null
        }
    },
    methods: {
        selectRule(rule) {
            this.selectedRule = rule
            this.getRuleDetails(rule.id).then(data => {
                this.$set(this.selectedRule, 'details', data.html)
                this.$bvModal.show('modal-rule-details')
            })
        },
        unselectRule() {
            this.$set(this, 'selectedRule', null)
        }
    }
}
</script>

<style>
.nav {
    justify-content: center;
}
</style>

<template>
    <div
        :class="{
            'rule-list-nosplit': !splitScreenEnable,
            'rule-list-split': splitScreenEnable
        }"
    >
        <div
            class="row mt-3 mx-0 justify-content-md-start justify-content-center px-2"
        >
            <b-dropdown
                :text="selectedRule ? selectedRule.title : 'Правила'"
                class="col-10 mb-3 d-md-none"
                variant="outline-primary"
            >
                <b-dropdown-item-button
                    class="w-100"
                    v-for="(rule, index) in rules"
                    :key="index + 'rule'"
                    @click="selectRule(rule)"
                >
                    {{ rule.title }}
                </b-dropdown-item-button>
            </b-dropdown>

            <b-list-group class="col-2 d-md-block d-none">
                <b-list-group-item
                    v-for="(rule, index) in rules"
                    :active="selectedRule && rule.id == selectedRule.id"
                    @click="selectRule(rule)"
                    :key="index + 'rule'"
                    button
                >
                    {{ rule.title }}
                </b-list-group-item>
            </b-list-group>

            <rule-details
                class="col-md-10 col-12 p-0"
                v-if="selectedRule"
                :rule="selectedRule"
                @close="unselectRule"
            />
        </div>
    </div>
</template>

<script>
/* Mixins */
import { languagesMixin } from '~/vuex-mixins/languages'
import { styleMixin } from '~/vuex-mixins/style'

/* Components */
//import RulePanel from './rule-panel'
import RuleDetails from './rule-details'

export default {
    mixins: [languagesMixin, styleMixin],
    props: {
        rules: {
            type: Array,
            required: true
        }
    },
    components: {
        //'rule-panel': RulePanel,
        'rule-details': RuleDetails
    },
    data() {
        return {
            selectedRule: null
        }
    },
    methods: {
        selectRule(rule) {
            this.getRuleDetails(rule.id).then(data => {
                this.selectedRule = rule
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

<style scoped>
.nav {
    justify-content: center;
}

.rule-list-nosplit {
    width: calc(100vw - 30px);
}

.rule-list-split {
    width: calc(50vw - 30px);
}
</style>

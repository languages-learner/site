<template>
    <div class="row mt-3 px-2 mx-0">
        <b-form-group class="col-12">
            <b-form-radio-group
                v-model="selectedStyleId"
                :options="styles"
                buttons
                button-variant="outline-primary"
                @change="selectStyleId"
            >
                <b-form-radio value="0"
                    ><i class="fa fa-th-large" aria-hidden="true"></i
                ></b-form-radio>
                <b-form-radio value="1"
                    ><i class="fa fa-list" aria-hidden="true"></i
                ></b-form-radio>
            </b-form-radio-group>
        </b-form-group>

        <div class="col-12 p-0 d-flex justify-content-center">
            <b-tabs
                active-nav-item-class="font-weight-bold text-white bg-dark"
                pills
            >
                <b-tab title="Просмотр" active>
                    <b-card-text>
                        <rules-list-1
                            :rules="rules"
                            v-if="selectedStyleId == 0"
                        />
                        <rules-list-2
                            :rules="rules"
                            v-else-if="selectedStyleId == 1"
                        />
                    </b-card-text>
                </b-tab>

                <!--<b-tab title="Добавить" >
					<b-card-text><add-rule /></b-card-text>
				</b-tab>-->
            </b-tabs>
        </div>
    </div>
</template>

<script>
/* Mixins */
import { languagesMixin } from '~/vuex-mixins/languages'

/* Components */
import RulesList1 from '~/components/cabinet/rules/style-1/rules-list'
import RulesList2 from '~/components/cabinet/rules/style-2/rules-list'
//import AddRule from './add-rule/add-rule'

export default {
    mixins: [languagesMixin],
    components: {
        'rules-list-1': RulesList1,
        'rules-list-2': RulesList2
        //'add-rule': AddRule
    },
    data() {
        return {
            rules: [],
            selectedStyleId: 0,
            styles: [
                /*{ value: 0, text: 'Panel' },
					{ value: 1, text: 'List' }*/
            ]
        }
    },
    methods: {
        selectStyleId(val) {
            if (!localStorage.settings)
                localStorage.settings = JSON.stringify({})
            var settings = JSON.parse(localStorage.settings)
            settings.selectedRuleStyleId = val
            localStorage.settings = JSON.stringify(settings)
        }
    },
    created() {
        if (localStorage.settings) {
            var settings = JSON.parse(localStorage.settings)
            this.selectedStyleId = settings.selectedRuleStyleId
                ? settings.selectedRuleStyleId
                : 0
        }

        this.$apiCore.GetRules().then(data => {
            this.$set(this, 'rules', data)
        })
    }
}
</script>

<style></style>

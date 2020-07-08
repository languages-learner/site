<template>
    <div class="shadow px-0 rule-block">
        <div class="row rule-panel m-0">
            <div class="col-6 my-auto rule-title">
                {{ rule.title }}
            </div>

            <div class="col-6 row m-0 p-0">
                <a
                    v-if="full"
                    class="col-12 p-0 d-flex align-items-center justify-content-center rule-open radius-rt rule-link"
                    :class="{ 'radius-r': !(short || details) }"
                    :href="'WebApi/GetRule?ruleId=' + rule.id"
                    target="_blank"
                >
                    Open
                </a>

                <a
                    v-if="short"
                    class="col-12 p-0 d-flex align-items-center justify-content-center rule-short rule-link"
                    :class="{
                        'radius-r': !(full || details),
                        'radius-rt': !full,
                        'radius-rb': !details
                    }"
                    :href="'WebApi/GetRule?ruleId=' + rule.id + '&Short=true'"
                    target="_blank"
                >
                    Short
                </a>

                <div
                    v-if="details"
                    class="col-12 p-0 d-flex align-items-center justify-content-center rule-details radius-rb rule-link pointer"
                    :class="{ 'radius-r': !(full || short) }"
                    @click="$emit('selectRule', rule)"
                >
                    Details
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Mixins */
import { languagesMixin } from '~/vuex-mixins/languages'

/* Components */

export default {
    mixins: [languagesMixin],
    props: {
        rule: {
            type: Object,
            required: true
        }
    },
    computed: {
        full() {
            return this.rule.full
        },
        short() {
            return this.rule.short
        },
        details() {
            return this.rule.details
        }
    }
}
</script>

<style scoped>
.rule-panel {
    height: 130px;
    border-radius: 10px;
    box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.3) !important;
}
.rule-panel:hover {
    box-shadow: 0 0.7rem 1.2rem rgba(0, 0, 0, 0.3) !important;
}

.radius-rt {
    border-radius: 0 10px 0 0;
}
.radius-rb {
    border-radius: 0 0 10px 0;
}
.radius-r {
    border-radius: 0 10px 10px 0 !important;
}

.rule-block {
    background: white;
    border-radius: 10px !important;
    height: 130px;
    -moz-transition: all 0.5s linear;
    -o-transition: all 0.5s linear;
    -webkit-transition: all 0.5s linear;
}

.rule-title {
    color: black;
}

.rule-open {
    background: #007bff;
}
.rule-open:hover {
    background: #0065d1;
}

.rule-short {
    background: #103f6b;
}
.rule-short:hover {
    background: #0b2d4d;
}

.rule-details {
    background: #2c557a;
}
.rule-details:hover {
    background: #1a3044;
}

.rule-link {
    text-decoration: none;
    color: white;
}
</style>

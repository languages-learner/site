<template>
    <CabinetContentTemplate subTitle="Edit your profile">
        <!-- Settings -->
        <template>
            <b-row>
                <b-col lg="4" md="6" cols="12" style="cursor: pointer;">
                    <n-link
                        tag="div"
                        :to="localePath('/cabinet/profile/settings')"
                        class="nav-item"
                    >
                        <b-card no-body class="overflow-hidden">
                            <b-row no-gutters>
                                <b-col md="6" class="d-md-block d-none p-3">
                                    <b-card-img
                                        src="data:image/png;base64,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"
                                        alt="Image"
                                        class="rounded-0"
                                    ></b-card-img>
                                </b-col>
                                <b-col md="6" class="d-flex align-items-center">
                                    <b-card-body class="p-0 w-100 text-center"
                                        ><h4>Settings</h4></b-card-body
                                    >
                                </b-col>
                            </b-row>
                        </b-card>
                    </n-link></b-col
                >
            </b-row>
        </template>
        <template> </template>
    </CabinetContentTemplate>
</template>

<script>
/* Mixins */
import { userMixin } from '~/vuex-mixins/user.js'
export default {
    layout: 'cabinet',
    mixins: [userMixin],
    data() {
        return {}
    }
}
</script>

<style lang="less" scoped></style>

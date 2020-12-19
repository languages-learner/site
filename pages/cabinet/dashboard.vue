<template>
    <CabinetContentTemplate :subTitle="subTitle">
        <b-row class="p-0 m-0">
            <b-col lg="6" cols="12" class="p-0 pr-lg-1">
                <CabinetDashboardWordStatusDistributionGraph />
            </b-col>
            <b-col lg="6" cols="12" class="p-0 pl-lg-1 mt-lg-0 mt-2">
                <CabinetDashboardActivityByMonthGraph />
            </b-col>
        </b-row>
    </CabinetContentTemplate>
</template>

<script>
import { userMixin } from '~/vuex-mixins/user.js'
export default {
    layout: 'cabinet',
    mixins: [userMixin],
    computed: {
        subTitle() {
            return `Bonjour ${this.currentUserFirstName}`
        }
    }
}
</script>

<template>
    <CabinetDashboardCard>
        <div class="graph-container">
            <VueFunnelGraph
                v-if="ready"
                :width="width"
                :height="height"
                :labels="labels"
                :values="values"
                :colors="colors"
                :sub-labels="subLabels"
                :direction="direction"
                :gradient-direction="gradientDirection"
                :animated="true"
                :display-percentage="true"
            ></VueFunnelGraph>
        </div>
    </CabinetDashboardCard>
</template>

<script>
export default {
    data() {
        return {
            labels: ['Words', 'Learning', 'Learned'],
            subLabels: ['Your', 'Public'],
            values: [
                // with the given Labels and SubLabels here's what the values represent:
                //
                // Direct, Social, Ads
                //    |      |     |
                //    v      v     v
                [3000, 2500], // Segments of "Impressions" from top to bottom
                [3000, 1700], // Segments of "Add To Cart"
                [600, 200] // Segments of "Buy"
            ],
            colors: [
                ['#FFB178', '#FF3C8E'], // color set for "Impressions" segment
                ['#A0BBFF', '#EC77FF'], // color set for "Add To Cart" segment
                ['#A0F9FF', '#7795FF'] // color set for "Buy" segment
            ],
            direction: 'horizontal',
            gradientDirection: 'horizontal',
            height: 100,
            width: 100,
            ready: false
        }
    },
    mounted() {
        this.setSize()
        this.ready = true
    },
    methods: {
        setSize() {
            var el = document.querySelectorAll(`.graph-container`)[0]
            this.width = el.clientWidth
            this.height = el.clientHeight
        }
    }
}
</script>

<style lang="less" scoped>
.graph-container {
    width: 100%;
    height: 100%;
    min-height: 120px;
    background: lavender;
    padding-top: 20px;
    padding-bottom: 30px;
    border-radius: inherit;
}
</style>

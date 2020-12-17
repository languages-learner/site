<template>
    <CabinetDashboardCard>
        <div class="graph-container">
            <GChart
                type="ColumnChart"
                :data="chartData"
                :options="chartOptions"
            />
        </div>
    </CabinetDashboardCard>
</template>

<script>
export default {
    data() {
        return {
            chartData: [
                ['Month', 'Words', 'Texts', 'Rules'],
                ['Jun', 100, 1, 7],
                ['Feb', 50, 4, 2],
                ['Mar', 124, 10, 1]
            ],
            chartOptions: {
                chart: {
                    title: 'Activity by month',
                    subtitle: 'Sales, Expenses, and Profit: 2014-2017'
                }
            }
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
    background: white;
    padding-top: 20px;
    padding-bottom: 30px;
    border-radius: inherit;
}
</style>

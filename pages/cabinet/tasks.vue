<template>
    <div class="row mt-3 px-2 mx-0">
        <div class="col-12 p-0 d-flex justify-content-center text-center">
            <b-tabs
                v-model="selectedTab"
                class="col-12"
                active-nav-item-class="font-weight-bold text-white bg-dark"
                pills
            >
                <b-tab title="Просмотр">
                    <b-card-text
                        ><tasks-list @selectTask="selectTask" :tasks="tasks"
                    /></b-card-text>
                </b-tab>

                <b-tab title="Задание" v-if="selectedTask">
                    <b-card-text><task :task="selectedTask"/></b-card-text>
                </b-tab>

                <b-tab title="Добавить">
                    <b-card-text><add-task @addTask="addTask"/></b-card-text>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
/* Components */
import TasksList from '~/components/cabinet/tasks/list/tasks-list'
import Task from '~/components/cabinet/tasks/task/task'
import AddTask from '~/components/cabinet/tasks/add/add-task'
//import { setTimeout } from 'timers'

export default {
    layout: 'cabinet',
    components: {
        'tasks-list': TasksList,
        task: Task,
        'add-task': AddTask
    },
    data() {
        return {
            selectedTab: 0,
            selectedTask: null,
            tasks: []
        }
    },
    methods: {
        selectTask(task) {
            var new_wait = !this.selectedTask
            this.$set(this, 'selectedTask', task)
            if (new_wait)
                setTimeout(() => {
                    this.selectedTab = 1
                }, 300)
            else this.selectedTab = 1
        },
        unselectTask() {},
        addTask(task) {
            this.addTaskText(task).then(data => {
                this.$notifySuccess('Task successfully added')
                this.tasks.push(data)
                localStorage.task = { title: '', text: '' }
            })
        }
    },
    created() {
        this.$apiCore.GetTaskGeneralInformation().then(data => {
            this._setTaskGeneralInformation(data)
        })

        this.$apiCore.GetTasks().then(data => {
            this.$set(this, 'tasks', data)
        })
    }
}
</script>

<style>
.nav {
    justify-content: center;
}
</style>

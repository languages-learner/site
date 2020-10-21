import Vue from 'vue'

class Api {
    constructor() {}

    async GetLanguages() {
        return new Promise((resolve, reject) => {
            Vue.prototype
                .$apiCall({ url: '/WebApi/GetLanguages' })
                .then(data => {
                    resolve(data)
                })
        })
    }

    async GetWordGroups() {
        return new Promise((resolve, reject) => {
            Vue.prototype
                .$apiCall({ url: '/WebApi/GetWordGroups' })
                .then(data => {
                    resolve(data)
                })
        })
    }

    async GetTranslates(data) {
        return new Promise((resolve, reject) => {
            Vue.prototype
                .$apiCall({
                    url: '/WebApi/GetTranslates',
                    method: 'POST',
                    obj: data
                })
                .then(data => {
                    resolve(data)
                })
        })
    }

    async GetAssotiations() {
        return new Promise((resolve, reject) => {
            Vue.prototype
                .$apiCall({ url: '/WebApi/GetAssotiations' })
                .then(data => {
                    resolve(data)
                })
        })
    }

    async GetDailAdditions(languagesId) {
        return new Promise((resolve, reject) => {
            Vue.prototype
                .$apiCall({
                    url: '/WebApi/GetDailAdditions',
                    method: 'POST',
                    obj: languagesId
                })
                .then(data => {
                    resolve(data)
                })
        })
    }

    async AddWordGroup(name) {
        return new Promise((resolve, reject) => {
            Vue.prototype
                .$apiCall({ url: '/WebApi/AddWordGroup?name=' + name })
                .then(data => {
                    resolve(data)
                })
        })
    }

    async SetTranslate(data) {
        return new Promise((resolve, reject) => {
            Vue.prototype
                .$apiCall({
                    url: '/WebApi/SetTranslate',
                    method: 'POST',
                    obj: data
                })
                .then(data => {
                    resolve(data)
                })
        })
    }

    async AddAssotiation(data) {
        return new Promise((resolve, reject) => {
            Vue.prototype
                .$apiCall({
                    url: '/WebApi/AddAssotiation',
                    method: 'POST',
                    obj: data
                })
                .then(data => {
                    resolve(data)
                })
        })
    }

    async AddRule(data) {
        return new Promise((resolve, reject) => {
            Vue.prototype
                .$apiCall({
                    url: '/WebApi/AddRule',
                    method: 'POST',
                    obj: data
                })
                .then(data => {
                    resolve(data)
                })
        })
    }

    async GetRules() {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: '/WebApi/GetRules' }).then(data => {
                resolve(data)
            })
        })
    }

    async GetRules(ruleId) {
        return new Promise((resolve, reject) => {
            Vue.prototype
                .$apiCall({
                    url: '/WebApi/GetRuleDetails?ruleId=' + ruleId
                })
                .then(data => {
                    resolve(data)
                })
        })
    }

    async EditWordLearned(data) {
        return new Promise((resolve, reject) => {
            Vue.prototype
                .$apiCall({
                    url: '/WebApi/EditWordLearned',
                    method: 'POST',
                    obj: data
                })
                .then(data => {
                    resolve(data)
                })
        })
    }

    async GetTaskGeneralInformation() {
        return new Promise((resolve, reject) => {
            Vue.prototype
                .$apiCall({ url: '/WebApi/GetTaskGeneralInformation' })
                .then(data => {
                    resolve(data)
                })
        })
    }

    async GetTasks() {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: '/WebApi/GetTasks' }).then(data => {
                resolve(data)
            })
        })
    }

    async GetTaskInfo(taskId) {
        return new Promise((resolve, reject) => {
            Vue.prototype
                .$apiCall({
                    url: '/WebApi/GetTaskInfo?taskId=' + taskId
                })
                .then(data => {
                    resolve(data)
                })
        })
    }

    async AddTaskText(data) {
        return new Promise((resolve, reject) => {
            Vue.prototype
                .$apiCall({
                    url: '/WebApi/AddTaskText',
                    method: 'POST',
                    obj: data
                })
                .then(data => {
                    resolve(data)
                })
        })
    }

    async ChangeTaskText(data) {
        return new Promise((resolve, reject) => {
            Vue.prototype
                .$apiCall({
                    url: '/WebApi/ChangeTaskText',
                    method: 'POST',
                    obj: data
                })
                .then(data => {
                    resolve(data)
                })
        })
    }

    async ChangeTaskStatus(data) {
        return new Promise((resolve, reject) => {
            Vue.prototype
                .$apiCall({
                    url: '/WebApi/ChangeTaskStatus',
                    method: 'POST',
                    obj: data
                })
                .then(data => {
                    resolve(data)
                })
        })
    }

    async RemoveTaskChange(data) {
        return new Promise((resolve, reject) => {
            Vue.prototype
                .$apiCall({
                    url: '/WebApi/RemoveTaskChange',
                    method: 'POST',
                    obj: data
                })
                .then(data => {
                    resolve(data)
                })
        })
    }

    async ChangeReasonChange(data) {
        return new Promise((resolve, reject) => {
            Vue.prototype
                .$apiCall({
                    url: '/WebApi/ChangeReasonChange',
                    method: 'POST',
                    obj: data
                })
                .then(data => {
                    resolve(data)
                })
        })
    }
}

Vue.prototype.$apiCore = new Api()

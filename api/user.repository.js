import axios from 'axios'

const resource = 'api/users'

export default $axios => ({
    add(userModel) {
        return $axios.$post(`/${resource}`, userModel)
    },

    getUserData() {
        return $axios.$get(`/${resource}`)
    },

    update(userModel) {
        return $axios.$put(`/${resource}`, userModel)
    }
})

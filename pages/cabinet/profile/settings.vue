<template>
    <CabinetContentTemplate subTitle="Edit your profile">
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group
                id="input-group-1"
                label="Your First Name:"
                label-for="input-1"
            >
                <b-form-input
                    id="input-1"
                    v-model="form.firstName"
                    placeholder="Enter first name"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-2"
                label="Your Last Name:"
                label-for="input-2"
            >
                <b-form-input
                    id="input-2"
                    v-model="form.lastName"
                    placeholder="Enter last name"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-3"
                label="Naive language:"
                label-for="input-3"
            >
                <b-form-select
                    id="input-3"
                    v-model="form.naiveLanguage"
                    :options="$resources['languages'].getLanguageOptions()"
                    required
                ></b-form-select>
            </b-form-group>

            <b-form-group
                id="input-group-4"
                label="Learning language:"
                label-for="input-4"
            >
                <b-form-select
                    id="input-4"
                    v-model="form.learningLanguage"
                    :options="$resources['languages'].getLanguageOptions()"
                    required
                ></b-form-select>
            </b-form-group>

            <b-button type="submit" variant="primary">Save</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </CabinetContentTemplate>
</template>

<script>
import { userMixin } from '~/vuex-mixins/user.js'
export default {
    layout: 'cabinet',
    mixins: [userMixin],
    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
                naiveLanguage: null,
                learningLanguage: null
            }
        }
    },
    mounted() {
        this.setDefaultValues()
    },
    methods: {
        setDefaultValues() {
            this.form.firstName = this.currentUserFirstName
            this.form.lastName = this.currentUserLastName
            this.form.naiveLanguage = this.currentUser.naiveLanguage
            this.form.learningLanguage = this.currentUser.learningLanguage
        },
        onSubmit(evt) {
            evt.preventDefault()
            this.form.uid = this.currentUserUid
            this.$repositories['users'].update(this.form).then(data => {
                this.$repositories['users'].getUserData().then(data => {
                    this._updateCurrentUserData(data)
                })
            })
        },
        onReset(evt) {
            evt.preventDefault()
            this.setDefaultValues()
        }
    }
}
</script>

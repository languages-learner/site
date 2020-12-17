<template>
    <div>
        <div class="form-container">
            <div class="row p-0 m-0">
                <div class="form-signup col-12">
                    <h1 class="logo">Languages Learner</h1>
                    <h2 class="discription">
                        Зарегистрируйтесь, чтобы изучать языки эффективнее.
                    </h2>

                    <div class="flex items-center justify-around">
                        <b-button
                            class="form-input"
                            v-show="state != 'success'"
                            @click="registerWith(_loginWithGoogle)"
                            >Google</b-button
                        >
                        <b-button
                            class="form-input"
                            v-show="state != 'success'"
                            @click="registerWith(_loginWithFacebook)"
                            >Facebook</b-button
                        >
                        <b-button
                            class="form-input"
                            v-show="state != 'success'"
                            @click="registerWith(_loginWithGithub)"
                            >Github</b-button
                        >
                        <b-button
                            class="form-input"
                            v-show="state != 'success'"
                            @click="registerWith(_loginWithMicrosoft)"
                            >Microsoft</b-button
                        >
                    </div>

                    <div class="divider">
                        <div class="line"></div>
                        <div class="text">ИЛИ</div>
                        <div class="line"></div>
                    </div>

                    <b-form-input
                        class="form-input"
                        v-model="email"
                        placeholder="Email"
                    ></b-form-input>

                    <b-form-input
                        class="form-input"
                        v-model="password"
                        placeholder="Password"
                    ></b-form-input>

                    <div
                        v-if="error != null"
                        class="ui error message form-input"
                    >
                        <div class="header">Ошибка</div>
                        <p>{{ error }}</p>
                    </div>

                    <b-button
                        class="form-input"
                        v-show="state != 'success'"
                        @click.prevent="
                            registerWith(_loginUser, {
                                login: email,
                                password: password
                            })
                        "
                        >Signup</b-button
                    >
                    <div class="text-muted form-input">Forget password</div>

                    <div
                        v-if="state == 'success'"
                        class="ui success message form-input"
                    >
                        <div class="header">Успешно</div>
                        <p>Вы будете перенаправлены в ваш кабинет</p>
                    </div>
                </div>
                <div class="form-signup form-have-account col-12">
                    Есть аккаунт?
                    <nuxt-link
                        tag="span"
                        :to="localePath('login')"
                        class="registration-text pl-2"
                    >
                        Вход</nuxt-link
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { userMixin } from '~/vuex-mixins/user'
export default {
    name: 'Login',
    mixins: [userMixin],
    middleware: 'auth',
    data() {
        return {
            email: null,
            password: null,
            error: null,
            state: null
        }
    },
    methods: {
        registerWith(func, args) {
            this.state = 'loading'
            func(args)
                .then(result => {
                    this.state = 'success'

                    let cred = null
                    if (args) {
                        cred = new PasswordCredential({
                            id: args.login,
                            name: args.name,
                            password: args.password
                            // iconURL: iconUrl
                        })
                    }
                    // else{
                    //     cred = new FederatedCredential({
                    //         id: result.user.email,
                    //         name: result.user.displayName ? result.user.displayName : undefined,
                    //         provider: 'https://' + result.credential.providerId,
                    //         iconURL: result.user.photoURL ? result.user.photoURL : undefined,
                    //     });
                    // }

                    /*console.log(navigator, "navigator");
                    navigator.credentials.store(cred).then(function (arg) {
                        // Do something else.
                    });*/

                    this.$nuxt.$router.push(this.localePath('index'))
                })
                .catch(error => {
                    this.error = error.message
                    this.state = 'error'
                })
        }
    },
    watch: {
        currentUser() {
            if (this.checkCurrentUser()) {
                this.$nuxt.$router.push(this.localePath('/cabinet/dashboard'))
            }
        }
    }
}
</script>

<style lang="less" scoped>
.form-container {
    color: #262626;
    -webkit-justify-content: center;
    justify-content: center;
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    height: 100vh;
    align-items: center;
}

.form-signup {
    -webkit-align-items: center;
    align-items: center;
    background-color: #fff;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid #dbdbdb;
    border-radius: 1px;
    margin: 0 0 10px;
    padding: 10px 0;
}

.logo {
    font-size: 2rem;
    font-weight: bold;
    margin: 22px auto 12px;
    background-repeat: no-repeat;
    background-position: 0 -130px;
    height: 75px;
    width: 175px;
    text-align: center;
}

.discription {
    color: #8e8e8e;
    font-size: 17px;
    font-weight: 600;
    line-height: 20px;
    margin: 0 40px 10px;
    text-align: center;
}

.divider {
    display: flex;
    flex-direction: row;
    margin: 10px 40px 18px;
    .line {
        width: 30%;
        background-color: #dbdbdb;
        height: 1px;
        position: relative;
        top: 0.45em;
    }
    .text {
        width: 40%;
        color: #8e8e8e;
        font-size: 13px;
        font-weight: 600;
        line-height: 15px;
        margin: 0 18px;
        text-transform: uppercase;
        text-align: center;
    }
}

.form-input {
    margin: 0 40px 6px;
    width: calc(100% - 80px);
    text-align: center;
}

.form-have-account {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 130px;
}

.label-container {
    left: 0;
}

.registration-text {
    text-decoration: underline;
    cursor: pointer;
}
</style>

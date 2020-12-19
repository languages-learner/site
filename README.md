[![](preview/logo.jpg)](preview/logo.jpg)

# Languages Learner

> Web part of service

> By [Kvestus](https://github.com/kvestus) &middot; [Demo](http://109.195.85.22:20005/) &middot; [Server repository](https://github.com/languages-learner/server)

Is a web-application for efficient learning of a foreign language. Its purpose is not to teach you the language but to give you a comfortable platform to do it yourself. We strive to change the process of learning, to transfer it online.

You can do here:
* Learn new words
* Learn new rules (in developing)
* Write texts that are able to be checked by your teachers (in developing)
* Make and take tests (in developing)
* Train your lexicon (in developing)

### Built With

* [Vue](https://vuejs.org/)
* [NuxtJS](https://nuxtjs.org/)
* [Bootstrap-Vue](https://bootstrap-vue.org/)
* [Vuex](https://vuex.vuejs.org/)



<!-- PREVIEW EXAMPLES -->
## Preview
![preview/preview.gif](preview/preview.gif)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

* you need to create backend for site like [that](https://github.com/languages-learner/server)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/languages-learner/site.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create your project on [Google Firebase](https://firebase.google.com/)
4. Configure sign-in methods at
    https://console.firebase.google.com/u/0/project/{PROJECT_NAME}/authentication/providers
5. Get Firebase config at settings > general > sdk
6. Create '.env' file
7. Enter config parameters in '.env' for development and production versions
    ```JS
    FIREBASE_DEVELOPMENT_API_KEY='ENTER YOU PROJECT API KEY FOR DEVELOPMENT'
    FIREBASE_DEVELOPMENT_AUTH_DOMAIN='ENTER YOU PROJECT AUTH DOMAIN FOR DEVELOPMENT'
    FIREBASE_DEVELOPMENT_DATABASE_URL='ENTER YOU PROJECT DATABASE URL FOR DEVELOPMENT'
    FIREBASE_DEVELOPMENT_PROJECT_ID='ENTER YOU PROJECT PROJECT ID FOR DEVELOPMENT'
    FIREBASE_DEVELOPMENT_STORAGE_BUCKET='ENTER YOU PROJECT STORAGE BUCKET FOR DEVELOPMENT'
    FIREBASE_DEVELOPMENT_MESSAGING_SENDER_ID='ENTER YOU PROJECT MESSAGING SENDER ID FOR DEVELOPMENT'
    FIREBASE_DEVELOPMENT_APP_ID='ENTER YOU PROJECT APP ID FOR DEVELOPMENT'

    FIREBASE_PRODUCTION_API_KEY='ENTER YOU PROJECT API KEY FOR PRODUCTION'
    ...
    ```
8. Enter your server url parameters in '.env'
    ```JS
    SERVER_URL='ENTER YOUR SERVER URL'
    ```
9. Start with debug
    ```sh
    # serve with hot reload at localhost:3000
    npm run dev
    ```
    Or start with production config
    ```sh
    # build for production and launch server
    npm run build
    npm start
    ```


<!-- CONTACT -->
## Contact

Alexander Chernigin - [@cherniginsasha](https://twitter.com/CherniginSasha) - chernigin.boss@gmail.com

Project Link: [https://github.com/languages-learner/site](https://github.com/languages-learner/site)
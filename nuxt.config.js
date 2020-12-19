/*jshint esversion: 6 */

import path from 'path'
import fs from 'fs'
require('dotenv').config()

module.exports = {
    head: {
        title: 'Languages Learner',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Web part of service'
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href:
                    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
            }
        ]
    },
    components: true,
    components: {
        dirs: [
            '~/components',
            {
                path: '~/components/cabinet/',
                prefix: 'Cabinet'
            },
            {
                path: '~/components/cabinet/add',
                prefix: 'CabinetAdd'
            },
            {
                path: '~/components/cabinet/words',
                prefix: 'CabinetWords'
            },
            {
                path: '~/components/cabinet/dashboard',
                prefix: 'CabinetDashboard'
            },
            {
                path: '~/components/main/',
                prefix: 'Main'
            }
        ]
    },
    loading: { color: '#3B8070' },
    css: ['~assets/css/global.css', '~assets/less/scrollbars.less'],
    styleResources: { less: ['~/assets/less/variables.less'] },
    buildModules: [],
    modules: [
        'bootstrap-vue/nuxt',
        'cookie-universal-nuxt',
        'nuxt-vuex-router-sync',
        'nuxt-i18n',
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
        ['@nuxtjs/pwa', {}],
        [
            'nuxt-izitoast',
            {
                position: 'bottomLeft',
                transitionIn: 'bounceInRight',
                transitionOut: 'fadeOutRight'
            }
        ],
        [
            'nuxt-fire',
            {
                config: {
                    development: {
                        apiKey: process.env.FIREBASE_DEVELOPMENT_API_KEY,
                        authDomain:
                            process.env.FIREBASE_DEVELOPMENT_AUTH_DOMAIN,
                        databaseURL:
                            process.env.FIREBASE_DEVELOPMENT_DATABASE_URL,
                        projectId: process.env.FIREBASE_DEVELOPMENT_PROJECT_ID,
                        storageBucket:
                            process.env.FIREBASE_DEVELOPMENT_STORAGE_BUCKET,
                        messagingSenderId:
                            process.env
                                .FIREBASE_DEVELOPMENT_MESSAGING_SENDER_ID,
                        appId: process.env.FIREBASE_DEVELOPMENT_APP_ID
                    },
                    production: {
                        apiKey: process.env.FIREBASE_PRODUCTION_API_KEY,
                        authDomain: process.env.FIREBASE_PRODUCTION_AUTH_DOMAIN,
                        databaseURL:
                            process.env.FIREBASE_PRODUCTION_DATABASE_URL,
                        projectId: process.env.FIREBASE_PRODUCTION_PROJECT_ID,
                        storageBucket:
                            process.env.FIREBASE_PRODUCTION_STORAGE_BUCKET,
                        messagingSenderId:
                            process.env.FIREBASE_PRODUCTION_MESSAGING_SENDER_ID,
                        appId: process.env.FIREBASE_PRODUCTION_APP_ID
                    }
                },
                services: {
                    auth: true
                },
                useOnly: ['auth']
            }
        ]
    ],
    i18n: {
        locales: [
            {
                code: 'en',
                iso: 'en-US',
                file: 'en-US.js',
                name: 'English',
                flag: 'us'
            },
            {
                code: 'ru',
                iso: 'ru-RU',
                file: 'ru-RU.js',
                name: 'Русский',
                flag: 'ru'
            },
            {
                code: 'fr',
                iso: 'fr-FR',
                file: 'fr-FR.js',
                name: 'Français',
                flag: 'fr'
            }
        ],
        seo: true,
        defaultLocale: 'en',
        lazy: true,
        langDir: 'langs/',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n',
            alwaysRedirect: false
        }
    },
    plugins: [
        { src: '~/plugins/additions.js', ssr: true },
        { src: '~/plugins/additions-client.js', mode: 'client' },
        { src: '~/plugins/auth-handler.js', mode: 'client' },
        { src: '~/plugins/nuxt-client-init.js', mode: 'client' },
        { src: '~/plugins/axios' },
        { src: '~/api/index.js' },
        { src: '~/resources/index.js' }
    ],
    build: {
        babel: {
            presets({ isServer }) {
                return [
                    [
                        require.resolve('@nuxt/babel-preset-app'),
                        {
                            buildTarget: isServer ? 'server' : 'client',
                            corejs: { version: 3 }
                        }
                    ]
                ]
            }
        },
        extend(config, { isDev, isClient }) {
            if (isDev) {
                config.devtool = isClient ? 'source-map' : 'inline-source-map'
            }
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },
    axios: {
        baseURL: process.env.SERVER_URL || 'http://localhost:5000'
    },
    server: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost',
        timing: false
    }
}

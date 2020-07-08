/*jshint esversion: 6 */

import path from 'path'
import fs from 'fs'

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
    loading: { color: '#3B8070' },
    css: [
        '~assets/css/global.css',
        '~assets/less/transitions.less',
        '~assets/less/scrollbars.less'
    ],
    styleResources: {
        less: [
            '~/assets/less/colors.less',
            '~/assets/less/dark-colors.less',
            '~/assets/less/variables.less'
        ]
    },
    // cache: true,
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/style-resources',
        'semantic-ui-vue/nuxt',
        'cookie-universal-nuxt',
        'nuxt-i18n',
        '@nuxtjs/axios',
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
                // Required:
                config: {
                    development: {
                        apiKey: 'AIzaSyAtKY5wlgw9JgaenHekNqzEhcnN0tzV-hA',
                        authDomain: 'languageslearner-ef768.firebaseapp.com',
                        databaseURL:
                            'https://languageslearner-ef768.firebaseio.com',
                        projectId: 'languageslearner-ef768',
                        storageBucket: 'languageslearner-ef768.appspot.com',
                        messagingSenderId: '783427917141',
                        appId: '1:783427917141:web:fed573b18594729ccdcbdc'
                    },
                    production: {
                        apiKey: 'AIzaSyAtKY5wlgw9JgaenHekNqzEhcnN0tzV-hA',
                        authDomain: 'languageslearner-ef768.firebaseapp.com',
                        databaseURL:
                            'https://languageslearner-ef768.firebaseio.com',
                        projectId: 'languageslearner-ef768',
                        storageBucket: 'languageslearner-ef768.appspot.com',
                        messagingSenderId: '783427917141',
                        appId: '1:783427917141:web:fed573b18594729ccdcbdc'
                    }
                },
                services: {
                    auth: true
                    //messaging: true
                },
                useOnly: ['auth', 'messaging']
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
        { src: '~/plugins/additions.js', ssr: false },
        { src: '~/plugins/auth-handler.js', ssr: false },
        //{ src: '~/plugins/notifications.js', ssr: false },
        { src: '~/plugins/nuxt-client-init.js', ssr: false },
        { src: '~/plugins/llserver-api-call.js', ssr: false },
        { src: '~/plugins/llserver-api.js', ssr: false },
        { src: '~/plugins/axios' }
    ],
    build: {
        babel: {
            presets({ isServer }) {
                return [
                    [
                        require.resolve('@nuxt/babel-preset-app'),
                        // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
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
    server: {
        port: 12001, // default: 3000
        host: 'localhost', // default: localhost,
        timing: false
    }
}

import createLanguagesResources from '~/resources/languages.js'

export default (context, inject) => {
    const resources = {
        languages: createLanguagesResources(context)
    }

    inject('resources', resources)
}

import createRepository from '~/api/repository.js'
import createUserRepository from '~/api/user.repository.js'
import createTranslateRepository from '~/api/translate.repository.js'

export default (context, inject) => {
    const repositoryWithAxios = createRepository(context.$axios)

    const repositories = {
        users: createUserRepository(context.$axios),
        translates: createTranslateRepository(context.$axios)
    }

    inject('repositories', repositories)
}

import axios from 'axios'
import { GridService } from '~/utils/grid-service.js'

const resource = 'api/translates'

export default $axios => ({
    add(translateModels) {
        return $axios.$post(`/${resource}/add`, translateModels)
    },

    update(translateModel) {
        return $axios.$put(`/${resource}`, translateModel)
    },

    /**
     *
     * @param {
     *      Filters: [{Property: string, Comparison: string, Value: string}],
     *      Order: {Ascending: bool, Property: string},
     *      Page: {Index: int, Size: int}
     * } parameters
     */
    grid(parameters) {
        return new GridService($axios).get(`/${resource}/grid`, parameters)
    },

    get(translateModel, target_language) {
        return $axios.$post(
            `/${resource}/get/${target_language}/`,
            translateModel
        )
    },

    delete(translateModels) {
        return $axios.$put(`/${resource}/delete`, translateModels)
    }
})

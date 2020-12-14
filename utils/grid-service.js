export class GridService {
    constructor(http) {
        this.http = http
    }

    get(url, parameters) {
        return this.http.$get(url + this.queryString(parameters))
    }

    queryString(parameters) {
        let url = '?'

        parameters.page = parameters.page ?? new PageModel()
        url += `page.index=${parameters.page.index}&`
        url += `page.size=${parameters.page.size}&`

        parameters.order = parameters.order ?? new OrderModel()
        url += `order.property=${parameters.order.property ?? ''}&`
        url += `order.ascending=${parameters.order.ascending}&`

        parameters.filters = parameters.filters ?? new FiltersModel()
        parameters.filters.forEach((filter, index) => {
            url += `filters[${index}].property=${filter.property}&`
            url += `filters[${index}].comparison=${filter.comparison ?? ''}&`
            url += `filters[${index}].value=${filter.value}&`
        })

        url = url.slice(0, url.length - 1)

        return url
    }
}

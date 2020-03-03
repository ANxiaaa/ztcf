export default {
    state: {
        // 汽车新闻对象
        newsData: {}
    },
    getters: {
        newsData(state){
            return state.newsData
        },
    },
    mutations: {
        changeNewsData(state, data){
            state.newsData = Object.assign({}, data)
        },
    },
    actions: {

    }
}
import { sendQequest } from './apiClicent';


const tableInit = {
    count: 0,
    pageSize: 12,
    pageNum: 1,
    totalPage: 1,
    data: []
}

export default {
    namespace: 'customers',

    state: {
        customerList: Object.assign({}, tableInit),
    },

    effects: {
        *findAll({ param }, { call, put, select }) {
            param = param ? param : {}
            const data = yield sendQequest({
                url: `/manage/business/customers/index/getAll`,
                method: 'GET',
                queryParams: {
                    pageNum: param.pageNum,
                    keyword: param.keyword
                }
            });

            if (data.data) {
                data.data = data.data.map(item => {
                    item.checked = false;
                    return item;
                })
            }
            yield put({ type: 'changeList', data: data })
        }
    },

    reducers: {
        changeList(state, action) {
            return { ...state, customerList: action.data }
        }
    }
};

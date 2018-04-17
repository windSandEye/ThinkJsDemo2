import { sendQequest } from './apiClicent';


export default {
    namespace: 'demo',

    state: {
        demoList: []
    },

    effects: {
        *findAll({ }, { call, put, select }) {
            const data = yield sendQequest({
                url: '/demo/demo',
                method: 'GET'
            });
            yield put({ type: 'changeDemoList', data: data })
        },
        *addDemo({ data }, { call, put, select }) {
            yield sendQequest({
                url: '/demo/demo/addDemo',
                method: 'POST',
                body:data
            });
            yield put({ type: 'findAll'})
        },
        *deleteDemo({ id }, { call, put, select }) {
            yield sendQequest({
                url: '/demo/demo/deleteDemo',
                method: 'DELETE',
                body:{id:id}
            });
            yield put({ type: 'findAll'})
        }

    },

    reducers: {
        changeDemoList(state, action) {
            return { ...state, demoList: action.data }
        }
    },
};

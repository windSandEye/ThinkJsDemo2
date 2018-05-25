import { sendQequest } from './apiClicent';
import { routerRedux } from 'dva/router';
import CreateCustomerDto from '../../src/dto/customers/CreateCustomDto';


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
        downList: [
            { value: 1, title: '客户列表', url: 'business/customers' },
            { value: 2, title: '新增客户', url: 'business/customers/createPage' },
            { value: 3, title: '客户详情', url: 'business/customers/detailPage' }
        ],
    },

    effects: {
        *findAll({ param }, { call, put, select }) {
            param = param ? param : {}
            try {
                const data = yield sendQequest({
                    url: `/manage/business/customers/getAll`,
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
            } catch (e) {
                console.log(e)
            }
        },
        *createCustomer({ customer }, { call, put, select }) {
            try {
                const insertId = yield sendQequest({
                    url: `/manage/business/customers/create`,
                    method: 'PUT',
                    body: customer
                });

                yield put(routerRedux.push('/manage/business/customers'))
            } catch (e) {
                console.log(e)
            }

        },
        *deleteCustomer({ param }, { call, put, select }) {
            try {
                yield sendQequest({
                    url: `/manage/business/customers/delete`,
                    method: 'DELETE',
                    body: { idList: param.idList }
                });
                alert('删除成功！')
                yield put({ type: 'findAll', param: { pageNum: param.pageNum, keyword: param.keyword } })
            } catch (e) {
                console.log(e)
            }
        }

    },

    reducers: {
        changeList(state, action) {
            return { ...state, customerList: action.data }
        }
    }
};

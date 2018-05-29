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

const comtomerInit = {
    address: null,
    company: null,
    department: null,
    id: null,
    name: null,
    phone: null
}

export default {
    namespace: 'customers',

    state: {
        customerList: Object.assign({}, tableInit),
        downList: [
            { value: 1, title: '客户列表', url: 'business/customers' },
            { value: 2, title: '新增客户', url: 'business/customers/createPage' }
        ],
        customerDetail: Object.assign({}, comtomerInit),
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
        },
        *findCustomer({ id }, { call, put, select }) {
            try {
                let customerDetail = yield sendQequest({
                    url: `/manage/business/customers/findById`,
                    method: 'GET',
                    queryParams: { id: id }
                });
                yield put({ type: 'changeCustomer', customerDetail: customerDetail })
            } catch (e) {
                console.log(e)
            }
        },
        *editCustomer({ customer }, { call, put, select }) {
            try {
                const insertId = yield sendQequest({
                    url: `/manage/business/customers/update`,
                    method: 'POST',
                    body: customer
                });
                yield put(routerRedux.push('/manage/business/customers'))
            } catch (e) {
                console.log(e)
            }
        },
        *updateDownList({ id }, { call, put, select }) {
            yield put(routerRedux.push(`/manage/business/customers/detailPage?${id}`))
        },
        *exportCustomer({ }, { call, put, select }) {
            yield sendQequest({
                url: `/manage/business/customers/export`,
                method: 'GET'
            });
        },
        *importCustomer({ xlsxFile }, { call, put, select }) {
            let formData = { xlsxFile: xlsxFile }
            yield sendQequest({
                url: `/manage/business/customers/import`,
                method: 'PUT',
                body: formData,
                accept: 'multipart/form-data',
                contentType: 'multipart/form-data'
            });

            yield put({ type: 'findAll', param: { pageNum: 1, keyword: null } })

        }
    },

    reducers: {
        changeList(state, action) {
            return { ...state, customerList: action.data }
        },
        changeCustomer(state, action) {
            return { ...state, customerDetail: action.customerDetail }
        },
        resetCustomer(state, action) {
            return { ...state, customerDetail: Object.assign({}, comtomerInit) }
        }
    }
};

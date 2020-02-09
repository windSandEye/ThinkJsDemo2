import { sendQequest } from './apiClicent';
import { routerRedux } from 'dva/router';
import {message} from '../routers/common/FormComponent/index';


const tableInit = {
    count: 0,
    pageSize: 12,
    pageNum: 1,
    totalPage: 1,
    data: []
}

const supplierInit = {
    address: null,
    company: null,
    department: null,
    id: null,
    name: null,
    phone: null
}

export default {
    namespace: 'suppliers',

    state: {
        supplierList: Object.assign({}, tableInit),
        downList: [
            { value: 1, title: '供应商列表', url: 'business/suppliers' },
            { value: 2, title: '新增供应商', url: 'business/suppliers/createPage' }
        ],
        supplierDetail: Object.assign({}, supplierInit),
    },

    effects: {
        *findAll({ param }, { call, put, select }) {
            param = param ? param : {}
            try {
                const data = yield sendQequest({
                    url: `/manage/business/suppliers/getAll`,
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
        *createSupplier({ supplier }, { call, put, select }) {
            try {
                const insertId = yield sendQequest({
                    url: `/manage/business/suppliers/create`,
                    method: 'PUT',
                    body: supplier
                });

                yield put(routerRedux.push('/manage/business/suppliers'))
            } catch (e) {
                console.log(e)
            }

        },
        *deleteSupplier({ param }, { call, put, select }) {
            try {
                yield sendQequest({
                    url: `/manage/business/suppliers/delete`,
                    method: 'DELETE',
                    body: { idList: param.idList }
                });
                message.info('删除成功！')
                yield put({ type: 'findAll', param: { pageNum: param.pageNum, keyword: param.keyword } })
            } catch (e) {
                console.log(e)
            }
        },
        *findSupplier({ id }, { call, put, select }) {
            try {
                let supplierDetail = yield sendQequest({
                    url: `/manage/business/suppliers/findById`,
                    method: 'GET',
                    queryParams: { id: id }
                });
                yield put({ type: 'changeSupplier', supplierDetail: supplierDetail })
            } catch (e) {
                console.log(e)
            }
        },
        *editSupplier({ supplier }, { call, put, select }) {
            try {
                const insertId = yield sendQequest({
                    url: `/manage/business/suppliers/update`,
                    method: 'POST',
                    body: supplier
                });
                yield put(routerRedux.push('/manage/business/suppliers'))
            } catch (e) {
                console.log(e)
            }
        },
        *updateDownList({ id }, { call, put, select }) {
            yield put(routerRedux.push(`/manage/business/suppliers/detailPage?${id}`))
        },
        *exportSupplier({ }, { call, put, select }) {
            yield sendQequest({
                url: `/manage/business/suppliers/export`,
                method: 'GET'
            });
        },
        *importSupplier({ xlsxFile }, { call, put, select }) {
            let formData = { xlsxFile: xlsxFile }
            yield sendQequest({
                url: `/manage/business/suppliers/import`,
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
            return { ...state, supplierList: action.data }
        },
        changeSupplier(state, action) {
            return { ...state, supplierDetail: action.supplierDetail }
        },
        resetSupplier(state, action) {
            return { ...state, supplierDetail: Object.assign({}, supplierInit) }
        }
    }
};

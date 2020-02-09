import { sendQequest } from './apiClicent';
import { routerRedux } from 'dva/router';
import {message} from '../routers/common/FormComponent/index';
// import CreateCommodityDto from '../../src/dto/commoditys/CreateCustomDto';


const tableInit = {
    count: 0,
    pageSize: 12,
    pageNum: 1,
    totalPage: 1,
    data: []
}

const commodityInit = {
    address: null,
    company: null,
    department: null,
    id: null,
    name: null,
    phone: null
}

export default {
    namespace: 'commoditys',

    state: {
        customerList: Object.assign({}, tableInit),
        downList: [
            { value: 1, title: '客户列表', url: 'business/commoditys' },
            { value: 2, title: '新增客户', url: 'business/commoditys/createPage' }
        ],
        customerDetail: Object.assign({}, commodityInit),
    },

    effects: {
        *findAll({ param }, { call, put, select }) {
            param = param ? param : {}
            try {
                const data = yield sendQequest({
                    url: `/manage/business/commoditys/getAll`,
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
        *createCommodity({ customer }, { call, put, select }) {
            try {
                const insertId = yield sendQequest({
                    url: `/manage/business/commoditys/create`,
                    method: 'PUT',
                    body: customer
                });

                yield put(routerRedux.push('/manage/business/commoditys'))
            } catch (e) {
                console.log(e)
            }

        },
        *deleteCommodity({ param }, { call, put, select }) {
            try {
                yield sendQequest({
                    url: `/manage/business/commoditys/delete`,
                    method: 'DELETE',
                    body: { idList: param.idList }
                });
                message.info('删除成功！')
                yield put({ type: 'findAll', param: { pageNum: param.pageNum, keyword: param.keyword } })
            } catch (e) {
                console.log(e)
            }
        },
        *findCommodity({ id }, { call, put, select }) {
            try {
                let customerDetail = yield sendQequest({
                    url: `/manage/business/commoditys/findById`,
                    method: 'GET',
                    queryParams: { id: id }
                });
                yield put({ type: 'changeCommodity', customerDetail: customerDetail })
            } catch (e) {
                console.log(e)
            }
        },
        *editCommodity({ customer }, { call, put, select }) {
            try {
                const insertId = yield sendQequest({
                    url: `/manage/business/commoditys/update`,
                    method: 'POST',
                    body: customer
                });
                yield put(routerRedux.push('/manage/business/commoditys'))
            } catch (e) {
                console.log(e)
            }
        },
        *updateDownList({ id }, { call, put, select }) {
            yield put(routerRedux.push(`/manage/business/commoditys/detailPage?${id}`))
        },
        *exportCommodity({ }, { call, put, select }) {
            yield sendQequest({
                url: `/manage/business/commoditys/export`,
                method: 'GET'
            });
        },
        *importCommodity({ xlsxFile }, { call, put, select }) {
            let formData = { xlsxFile: xlsxFile }
            yield sendQequest({
                url: `/manage/business/commoditys/import`,
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
        changeCommodity(state, action) {
            return { ...state, customerDetail: action.customerDetail }
        },
        resetCommodity(state, action) {
            return { ...state, customerDetail: Object.assign({}, commodityInit) }
        }
    }
};

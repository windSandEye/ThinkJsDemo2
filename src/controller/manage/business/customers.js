import Base from '../../base.js';
import CreateCustomDto from '../../../dto/customers/CreateCustomDto';
import CustomListDto from '../../../dto/customers/CustomListDto';


export default class extends Base {
    indexAction() {
        return super.response();
    }

    //分页获取所有客户数据
    async getAllAction() {
        const param = this.ctx.param();
        param.pageNum = param.pageNum ? param.pageNum : 1;
        param.pageSize = param.pageSize ? param.pageSize : 12;
        let count = 0;
        let customList = {};
        if (param.keyword && param.keyword != '') {
            if (!(/^1[3|4|5|8][0-9]\d{0,8}$/.test(param.keyword))) {
                customList = await this.model('customers')
                    .where({ name: ['like', `%${param.keyword}%`] })
                    .page(param.pageNum, param.pageSize)
                    .countSelect();
            } else {
                customList = await this.model('customers')
                    .where({ phone: ['like', `%${param.keyword}%`] })
                    .page(param.pageNum, param.pageSize)
                    .countSelect();
            }
        } else {
            customList = await this.model('customers').page(param.pageNum, param.pageSize).countSelect();
        }

        return this.json(customList);
    }

    //删除
    async deleteAction() {

    }

    //新建页面跳转
    createPageAction() {
        return super.response()
    }

    //创建客户
    async createAction() {
        const param = this.ctx.post();
        let insertId = await this.model('customers').add(param);
        return this.json({ id: insertId });
    }

    //详情页面跳转
    detailPageAction() {
        return super.response()
    }

    //删除客户
    async deleteAction() {
        const param = this.ctx.post();
        let model = this.model('customers');
        try {
            await model.startTrans();
            for (let id of param.idList) {
                await model.where({ id: ['=', id] }).delete();
            }
            await model.commit();
            return this.success();
        } catch (e) {
            await model.rollback();
        }

    }



}
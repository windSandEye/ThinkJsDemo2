import Base from '../../base.js';
import CreateCustomDto from '../../../dto/customers/CreateCustomDto';
import CustomListDto from '../../../dto/customers/CustomListDto';
import xlsx from 'node-xlsx';
import fs from 'fs';
import path from 'path';


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

    //根据ID查询客户
    async findByIdAction() {
        const param = this.ctx.param();
        let detail = await this.model('customers').where({ id: ['=', param.id] }).find();
        return this.json(detail);
    }

    //修改客户信息
    async updateAction() {
        const param = this.ctx.post();
        let affectRows = await this.model('customers').where({ id: param.id }).update(param);
        return this.success();
    }

    //导出客户信息
    async exportAction() {
        try {
            const headers = ['客户公司', '客户姓名', '客户职称', '联系电话', '详细地址'];
            let data = await this.model('customers').select();
            let xlsxData = [];
            xlsxData.push(headers);
            for (let excelNode of data) {
                let row = [];
                row.push(excelNode.company);
                row.push(excelNode.name);
                row.push(excelNode.department);
                row.push(excelNode.phone);
                row.push(excelNode.address);
                xlsxData.push(row);
            }

            let buffer = xlsx.build([{ name: 'sheet1', data: xlsxData }]);
            //响应设置
            this.ctx.set('Content-Disposition', 'attachment; filename=customer.xlsx');
            this.ctx.body = buffer;
        } catch (err) {
            console.log(err);
        }
    }

    //导入客户信息
    async importAction() {
        let param = this.ctx.file('xlsxFile');
        const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(param.path));//解析文件
        console.log(workSheetsFromBuffer)
        let xlsxData = workSheetsFromBuffer[0].data || [];
        let customerData = [];
        let index = 0;
        for (let row of xlsxData) {
            if (index == 0) { continue; }//跳过表头
            let customer = {};
            customer.company = row[0];
            customer.name = row[1];
            customer.department = row[2];
            customer.phone = row[3];
            customer.address = row[4];
            customer.company = row[5];
            customerData.push(customer);
            index++;
        }

        const model = this.model('customers');
        try {
            await model.startTrans();
            for (let rowData of customerData) {
                await model.add(rowData)
            }
            await model.commit();
            return this.success();
        } catch (e) {
            await model.rollback();
        }

    }

    //模版下载
    async exportTemplateAction() {
        let tempaltePath = path.join(think.ROOT_PATH, '/web/template/customerTemplate.xlsx');
        let buffer = fs.readFileSync(tempaltePath);
        this.ctx.set('Content-Disposition', 'attachment; filename=customerTempalte.xlsx');
        this.ctx.body = buffer;
    }
}
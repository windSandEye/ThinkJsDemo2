import Base from '../../base.js';
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
        let supplierList = {};
        if (param.keyword && param.keyword != '') {
            if (!(/^1[3|4|5|8][0-9]\d{0,8}$/.test(param.keyword))) {
                supplierList = await this.model('commoditys')
                    .where({ name: ['like', `%${param.keyword}%`] })
                    .page(param.pageNum, param.pageSize)
                    .countSelect();
            } else {
                supplierList = await this.model('commoditys')
                    .where({ phone: ['like', `%${param.keyword}%`] })
                    .page(param.pageNum, param.pageSize)
                    .countSelect();
            }
        } else {
            supplierList = await this.model('commoditys').page(param.pageNum, param.pageSize).countSelect();
        }

        return this.json(supplierList);
    }

    //新建页面跳转
    createPageAction() {
        return super.response()
    }

    //创建客户
    async createAction() {
        const param = this.ctx.post();
        let insertId = await this.model('commoditys').add(param);
        return this.json({ id: insertId });
    }

    //详情页面跳转
    detailPageAction() {
        return super.response()
    }

    //删除客户
    async deleteAction() {
        const param = this.ctx.post();
        let model = this.model('commoditys');
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
        let detail = await this.model('commoditys').where({ id: ['=', param.id] }).find();
        return this.json(detail);
    }

    //修改客户信息
    async updateAction() {
        const param = this.ctx.post();
        let affectRows = await this.model('commoditys').where({ id: param.id }).update(param);
        return this.success();
    }

    //导出客户信息
    async exportAction() {
        try {
            const headers = ['供应商公司', '供应商姓名', '供应商职称', '联系电话', '详细地址'];
            let data = await this.model('commoditys').select();
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
            this.ctx.set('Content-Disposition', 'attachment; filename=supplier.xlsx');
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
        let supplierData = [];
        let index = 0;
        for (let row of xlsxData) {
            if (index == 0) { continue; }//跳过表头
            let supplier = {};
            supplier.company = row[0];
            supplier.name = row[1];
            supplier.department = row[2];
            supplier.phone = row[3];
            supplier.address = row[4];
            supplier.company = row[5];
            supplierData.push(supplier);
            index++;
        }

        const model = this.model('commoditys');
        try {
            await model.startTrans();
            for (let rowData of supplierData) {
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
        let tempaltePath = path.join(think.ROOT_PATH, '/web/template/supplierTemplate.xlsx');
        let buffer = fs.readFileSync(tempaltePath);
        this.ctx.set('Content-Disposition', 'attachment; filename=supplierTempalte.xlsx');
        this.ctx.body = buffer;
    }
}
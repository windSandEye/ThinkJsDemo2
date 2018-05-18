import commonDto from '../common/commonDto';
import CreateCustomDto from './CreateCustomDto';

const tableInit = {
    count: 0,
    pageSize: 12,
    pageNum: 1,
    totalPage:1,
    data:[]
}

export default class CustomerListDto {
    constructor(entity) {
        let obj = { ...tableInit };
        if (entity.hasOwnProperty("count")) {
            obj.count = commonDto.convertToType(entity.count, "Integer");
        }
        if (entity.hasOwnProperty("pageSize")) {
            obj.pageSize = commonDto.convertToType(entity.pageSize, "Integer");
        }
        if (entity.hasOwnProperty("pageNum")) {
            obj.pageNum = commonDto.convertToType(entity.pageNum, "Integer");
        }
        if (entity.hasOwnProperty("totalPage")) {
            let totalPage = obj.count/obj.pageSize;
            obj.totalPage = commonDto.convertToType(totalPage, "Integer");
        }
        if (entity.hasOwnProperty("data")) {
            obj.data = commonDto.convertToType(entity.data, [CreateCustomDto]);
        }
        
        return obj;
    }
}
import commonDto from '../common/commonDto';

const entityInit = {
    id: null,
    name: null,
    company: null,
    phone: null,
    address: null,
    department: null
}

export default class CreateCustomerDto {
    constructor(entity) {
        let obj = { ...entityInit };
        if (entity.hasOwnProperty("id")) {
            obj.id = commonDto.convertToType(entity.id, "Integer");
        }
        if (entity.hasOwnProperty("name")) {
            obj.name = commonDto.convertToType(entity.name, "String");
        }
        if (entity.hasOwnProperty("company")) {
            obj.company = commonDto.convertToType(entity.company, "String");
        }
        if (entity.hasOwnProperty("phone")) {
            obj.phone = commonDto.convertToType(entity.phone, "String");
        }
        if (entity.hasOwnProperty("address")) {
            obj.address = commonDto.convertToType(entity.address, "String");
        }
        if (entity.hasOwnProperty("department")) {
            obj.department = commonDto.convertToType(entity.department, "String");
        }
        return obj;
    }
}
import commonDto from '../common/commonDto';

const demoInit = {
    id:null,
    title:null,
    content:null
}

export default class CreateDemoDto {
    constructor(demoEntity) {
        let obj ={...demoInit};
        if(demoEntity.hasOwnProperty("id")){
            obj.id = commonDto.convertToType(demoEntity.id,"Integer");
        }
        if(demoEntity.hasOwnProperty("title")){
            obj.title = commonDto.convertToType(demoEntity.title,"String");
        }
        if(demoEntity.hasOwnProperty("content")){
            obj.content = commonDto.convertToType(demoEntity.content,"String");
        }
        return obj;
    }
}
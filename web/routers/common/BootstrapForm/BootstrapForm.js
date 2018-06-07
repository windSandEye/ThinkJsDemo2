import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Form, FormControl, FormGroup, ControlLabel, HelpBlock, Button, message } from 'react-bootstrap'
import utils from '../../../utils/utils';
import validate from '../../../utils/validate'

export default class BootstrapForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {},
            validList: [],
            ruleList: []
        }
    }
    static defaultProps = {

    }

    //表单值改变
    handleInputChange(name, onChange, e) {
        if (onChange) {
            onChange(e);
        }
        this.state.form[name] = e.target.value;
        //修改校验信息
        let validList = this.changeFieldVaild(name);
        this.setState({ form: this.state.form, validList: validList });
    }

    //多选框值改变
    handleCheckboxChange(name, onChange, value, checked) {
        if (onChange) {
            onChange(value, checked);
        }
        let checkList = [];
        if (this.state.form[name]) {
            checkList = this.state.form[name].split(',');
        }
        let index = checkList.findIndex(item => item == value);
        if (index == -1) {
            checkList.push(value);
        } else {
            checkList.splice(index, 1);
        }
        this.state.form[name] = checkList.join(',');
        //修改校验信息
        let validList = this.changeFieldVaild(name);
        this.setState({ form: this.state.form, validList: validList });
    }

    //单选框值改变
    handleRadioChange(name, onChange, value, checked) {
        if (onChange) {
            onChange(value, checked);
        }
        if (checked) {
            this.state.form[name] = value;
        }
        //修改校验信息
        let validList = this.changeFieldVaild(name);
        this.setState({ form: this.state.form, validList: validList });
    }

    //下拉框
    handleSelectChange(name, onChange, value) {
        if (onChange) {
            onChange(value);
        }
        this.state.form[name] = value;
        //修改校验信息
        let validList = this.changeFieldVaild(name);
        this.setState({ form: this.state.form, validList: validList });
    }

    //选中下拉选项
    handleSelected(name, onSelect, value) {
        if (onSelect) {
            onSelect(value);
        }
        this.state.form[name] = value;
        //修改校验信息
        let validList = this.changeFieldVaild(name);
        this.setState({ form: this.state.form, validList: validList });
    }

    //改变字段校验信息
    changeFieldVaild(field) {
        let validResult = this.transitionState(field);
        let validList = this.state.validList.map(item => {
            if (item.field == field) {
                return validResult;
            }
            return item;
        })
        return validList;
    }

    //状态转换
    transitionState(field) {
        let validateObj = this.setValidationRule(field);
        if (validateObj.validState === true) {
            validateObj.validState = 'success'
        } else if (validateObj.validState === false) {
            validateObj.validState = 'error'
        } else {
            validateObj.validState = null
        }
        return validateObj;
    }

    //设置校验规则
    setValidationRule(field) {
        let fieldRule = this.state.ruleList.find(item => item.field == field);
        let fieldValue = this.state.form[field];
        if (fieldRule) {
            return validate.setValidationState(fieldValue, fieldRule.rules, field);
        } else {
            return { field: field, validState: null, errorMsg: null }
        }
    }

    //获取校验状态
    getValidateState(field) {
        //初始化校验信息并返回状态
        let validObj = this.state.validList.find(item => item.field == field);
        if (validObj) {
            return validObj.validState;
        } else {
            return null;
        }
    }

    //获取校验提示
    getValidateMsg(field) {
        let validObj = this.state.validList.find(item => item.field == field);
        if (validObj) {
            return validObj.errorMsg
        } else {
            return null;
        }
    }

    //表单校验,resultCallFunc:function(errors){}
    vaildForm(resultCallFunc) {
        let validResult = [];
        let errorResult = [];
        for (let field in this.state.form) {
            let result = this.transitionState(field);
            if (result.validState === 'error') {
                errorResult.push(result)
            }
            validResult.push(result);
        }
        this.setState({ validList: validResult });
        resultCallFunc(errorResult);
    }

    //渲染字段组件,options:{initValue:<String>,rules:[Array]}
    getFieldDecorator(field, options) {
        if (field) {//有字段名则视为表单元素，没有则不予理会
            //初始化话表单属性
            if (!this.state.form.hasOwnProperty(field)) {//不存在初始化值则置空
                this.state.form[field] = options.initValue || null;
            }

            //初始化校验规则
            let fieldRule = this.state.ruleList.find(item => item.field == field);
            if (!fieldRule) {
                this.state.ruleList.push({ field: field, rules: options.rules })
            }

            //初始化校验结果
            let validResult = this.state.validList.find(item => item.field == field);
            if (!validResult) {
                this.state.validList.push({ field: field, validState: null, errorMsg: null })
            }

            if (options.componentType == 'input' || options.componentType == 'textarea') {
                //对表单组件进行处理
                return (fieldItem) => {
                    return React.cloneElement(fieldItem, {
                        ref: field,
                        key: field,
                        onChange: this.handleInputChange.bind(this, field, fieldItem.props.onChange),
                        value: this.state.form[field] || ''
                    })
                };
            } else if (options.componentType == 'checkbox') {
                return (fieldItem) => {
                    return React.cloneElement(fieldItem, {
                        ref: `${field}-${fieldItem.value}`,
                        key: `${field}-${fieldItem.value}`,
                        onChange: this.handleCheckboxChange.bind(this, field, fieldItem.props.onChange),
                        value: this.state.form[field] || ''
                    })
                };
            } else if (options.componentType == 'radio') {
                return (fieldItem) => {
                    return React.cloneElement(fieldItem, {
                        ref: `${field}-${fieldItem.value}`,
                        key: `${field}-${fieldItem.value}`,
                        onChange: this.handleRadioChange.bind(this, field, fieldItem.props.onChange),
                        value: this.state.form[field] || ''
                    })
                };
            } else if (options.componentType == 'select') {
                return (fieldItem) => {
                    return React.cloneElement(fieldItem, {
                        ref: `${field}-${fieldItem.value}`,
                        key: `${field}-${fieldItem.value}`,
                        onChange: this.handleSelectChange.bind(this, field, fieldItem.props.onChange),
                        onSelect: this.handleSelected.bind(this, field, fieldItem.props.onSelect),
                        value: this.state.form[field] || ''
                    })
                };
            }
        } else {
            return (fieldItem) => {
                return fieldItem;
            };
        }
    }

    //获取表单数据,fieldList为[field1,field2,...]
    getFieldValues(fieldList) {
        if (fieldList && fieldList.length > 0) {
            let fieldValue = {};
            for (let field in fieldList) {
                fieldValue[field] = this.state.form[field];
            }
            return fieldValue;
        } else {
            return this.state.form;
        }
    }

    //设置表单数据，fieldList为[{field1:value1},{field2:value2},...]
    setFieldValues(fieldList) {
        if (fieldList && fieldList.length > 0) {
            for (let fieldValue of fieldList) {
                for (let field in fieldValue) {
                    this.state.form[field] = fieldValue[field]
                }
            }
            this.setState({ form: this.state.form })
        } else {
            return;
        }
    }

    render() {
        return (
            <Form className={this.props.className} style={this.props.style}>
                {React.Children.map(this.props.children, (child) => {
                    return React.cloneElement(child, {
                        getFieldDecorator: this.getFieldDecorator.bind(this),
                        validState: this.getValidateState(child.props.field),
                        errorMsg: this.getValidateMsg(child.props.field),
                        setFieldValues: this.setFieldValues.bind(this),
                    });
                })}
            </Form>
        )
    }
}
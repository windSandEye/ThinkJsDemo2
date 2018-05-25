let validate = {}

//设置校验状态
validate.setValidationState = function (value, rules, field) {
    let result = validate.rulesValidate(rules, value);
    let validateObj = { ...result, field: field };
    return validateObj;
}

//多条或者校验
validate.rulesValidate = function (rules, value) {
    let index = 0;
    if (rules && rules.length > 0) {
        while (index < rules.length) {
            let result = validate.ruleValidate(rules[index], value);
            if (result.validState && rules[index + 1]) {
                index++;
            } else {
                return result;
            }
        }
    }
    return { validState: true, errorMsg: null }
}

//单条规则检验
validate.ruleValidate = function (rule, value) {
    if (rule.type == 'length' && rule.min !== undefined) {
        let result = validate.validMinLength(value, rule.min, rule.msg);
        return result;
    } else if (rule.type == 'length' && rule.max !== undefined) {
        let result = validate.validMaxLength(value, rule.max, rule.msg);
        return result;
    } else if (rule.type == 'required') {
        let result = validate.validRequired(value, rule.msg);
        return result;
    } else if (rule.type == 'regex') {
        let result = validate.validRegex(value, rule.regex, rule.msg);
        return result;
    }
    return { validState: true, errorMsg: null };
}

//最大长度校验
validate.validMaxLength = function (value, length, errorMsg) {
    if (value) {
        if (value.length <= length) {
            return { validState: true, errorMsg: null }
        } else {
            return { validState: false, errorMsg: errorMsg }
        }
    } else {
        return { validState: null, errorMsg: null };
    }
}

//最小长度校验
validate.validMinLength = function (value, length, errorMsg) {
    if (value) {
        if (value.length < length) {
            return { validState: false, errorMsg: errorMsg }
        } else {
            return { validState: true, errorMsg: null }
        }
    } else {
        return { validState: false, errorMsg: errorMsg };
    }
}

//必填校验
validate.validRequired = function (value, errorMsg) {
    if (value && value != '') {
        return { validState: true, errorMsg: null };
    } else {
        return { validState: false, errorMsg: errorMsg };
    }

}

//正则校验
validate.validRegex = function (value, regex, errorMsg) {
    if (value) {
        if (regex.test(value)) {
            return { validState: true, errorMsg: null };
        } else {
            return { validState: false, errorMsg: errorMsg };
        }
    } else {
        return { validState: false, errorMsg: errorMsg };
    }
}

export default validate;
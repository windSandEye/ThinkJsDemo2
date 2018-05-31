import React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock, Button } from 'react-bootstrap';

export default class FormItem extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.initValue != this.props.initValue) {
            let formItem = {};
            formItem[this.props.field] = nextProps.initValue;
            this.props.setFieldValues([formItem]);
        }
    }

    static defaultProps = {
        field: null,
        validState: null,
        label: null,
        rules: null,
        errorMsg: null,
        initValue: null,
        className: null,
        style: null,
        value: null,
        componentType: 'input'
    }

    //input、textarea渲染
    renderInput() {
        return (
            React.Children.map(this.props.children, (child) => {
                return this.props.getFieldDecorator(this.props.field,
                    {
                        initValue: this.props.initValue,
                        rules: this.props.rules,
                        componentType: this.props.componentType
                    })(child)
            })
        )
    }

    renderCheckbox() {
        return (
            <div>
                {React.Children.map(this.props.children, (child) => {
                    return this.props.getFieldDecorator(this.props.field,
                        {
                            initValue: this.props.initValue,
                            rules: this.props.rules,
                            componentType: this.props.componentType
                        })(child)

                })}
            </div>)
    }

    //子节点渲染
    renderChild() {
        const componentType = this.props.componentType;
        switch (componentType) {
            case 'input':
            case 'textarea':
                return this.renderInput();
            case 'checkbox':
                return this.renderCheckbox();
            default:
                return this.renderInput();
        }
    }

    render() {
        const validState = this.props.componentType == 'checkbox'
            || this.props.componentType == 'radio' || this.props.componentType == 'select' ?
            null : this.props.validState
        return (
            <FormGroup
                controlId={this.props.field}
                validationState={validState}
                className={this.props.className}
                style={this.props.style}
            >
                <ControlLabel>{this.props.label}</ControlLabel>
                {this.renderChild()}
                <FormControl.Feedback />
                <HelpBlock>{this.props.errorMsg}</HelpBlock>
            </FormGroup>
        )
    }
}
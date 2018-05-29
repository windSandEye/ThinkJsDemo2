import React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock, Button } from 'react-bootstrap';

export default class FormItem extends React.Component {

    handleChange(e) {
        this.props.handleChange();
    }

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
        value: null
    }

    render() {
        return (
            <FormGroup
                controlId={this.props.field}
                validationState={this.props.validState}
                className={this.props.className}
                style={this.props.style}
            >
                <ControlLabel>{this.props.label}</ControlLabel>
                {React.Children.map(this.props.children, (child) => {
                    return this.props.getFieldDecorator(this.props.field, { initValue: this.props.initValue, rules: this.props.rules })(child)
                })}
                <FormControl.Feedback />
                <HelpBlock>{this.props.errorMsg}</HelpBlock>
            </FormGroup>
        )
    }





}
import React from 'react';
import FontAwesome from 'react-fontawesome';
import Checkbox from './Checkbox';
import styles from './Checkbox.less';

export default class CheckboxGroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value
        }
    }

    static defaultProps = {
        className: null,
        style: null,
        options: [],    //选项数组[{value:1,label:'好'},......]
        value: '',
        inline: true,
        onChange: (value, checked) => { }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value != nextProps.value) {
            this.setState({ value: nextProps.value })
        }
    }

    //选中或取消选中
    handleChange(value, checked) {
        let checkList = [];
        if (this.state.value) {
            checkList = this.state.value.split(',');
        }
        let index = checkList.findIndex(item => item == value);
        if (index == -1) {
            checkList.push(value);
        } else {
            checkList.splice(index, 1);
        }
        this.state.value = checkList.join(',');
        this.setState({ value: this.state.value });

        this.props.onChange(value, checked);
    }

    render() {
        let children = this.props.children;
        if (this.props.options && this.props.options.length > 0) {
            children = this.props.options.map(option => {
                return (
                    <Checkbox
                        value={option.value}
                        checked={this.state.value.indexOf(option.value) > -1 ? true : false}
                        key={option.value}
                        onChange={this.handleChange.bind(this, option.value)}
                    >{option.label}</Checkbox>)
            })
        }
        return (
            <div className={this.props.inline ? styles.groupInline : styles.groupBlock}>
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child, {
                        checked: this.state.value.indexOf(child.props.value) > -1 ? true : false,
                        handleChange: this.handleChange.bind(this)
                    });
                })}
            </div>
        )
    }
}
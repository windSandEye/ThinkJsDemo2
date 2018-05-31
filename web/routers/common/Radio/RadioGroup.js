import React from 'react';
import FontAwesome from 'react-fontawesome';
import Radio from './Radio';
import styles from './Radio.less';

export default class RadioGroup extends React.Component {
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
        this.setState({ value: value });
        this.props.onChange(value, checked);
    }

    render() {
        let children = this.props.children;
        if (this.props.options && this.props.options.length > 0) {
            children = this.props.options.map(option => {
                return (
                    <Radio
                        value={option.value}
                        checked={this.state.value == option.value ? true : false}
                        key={option.value}
                        onChange={this.handleChange.bind(this, option.value)}
                    >{option.label}</Radio>)
            })
        }
        return (
            <div className={this.props.inline ? styles.groupInline : styles.groupBlock}>
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child, {
                        checked: this.state.value == child.props.value ? true : false,
                        handleChange: this.handleChange.bind(this)
                    });
                })}
            </div>
        )
    }
}
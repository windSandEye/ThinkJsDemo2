import React from 'react';
import styles from './Select.less';

export default class Select extends React.Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        className: null,
        style: null,
        options: [],    //选项数组[{value:1,label:'好'},......]
        value: '',
        multiple: false, //多选
        onChange: (value) => { },
        onSelect: (value) => { }
    }

    componentWillReceiveProps(nextProps) {

    }

    //选中或取消选中
    handleChange(e) {
        let value = e.target.value;
        this.props.onChange(value, this.props.multiple);
    }

    render() {
        let children = this.props.children;
        if (this.props.options && this.props.options.length > 0) {
            children = this.props.options.map(option => {
                return (
                    <option
                        value={option.value}
                        checked={this.props.value == option.value ? true : false}
                        key={option.value}
                        onChange={this.handleChange.bind(this, option.value)}
                    >{option.label}</option>)
            })
        }
        return (
            <select className={this.props.className ? `${this.props.className} ${styles.selectInput}` : styles.selectInput}
                style={this.props.style} onChange={this.handleChange.bind(this)}
                value={this.props.value}
            >
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child, {
                        onChange: this.handleChange.bind(this)
                    });
                })}
            </select>
        )
    }
}
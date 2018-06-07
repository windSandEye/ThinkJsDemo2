import React from 'react';
import Option from './Option';
import FontAwesome from 'react-fontawesome';
import styles from './Select.less';

export default class Select extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showOption: false,
            value: this.props.value,
            label: this.getLabel(this.props.value)
        }
    }

    static Option = Option;

    static defaultProps = {
        className: null,
        style: null,
        options: [],    //选项数组[{value:1,label:'好'},......]
        value: '',
        multiple: false, //多选
        onChange: (value) => { },
        onSelect: (value) => { }
    }

    componentDidMount() {
        const that = this;
        document.onclick = function (e) {
            that.setState({ showOption: false })
        }
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value != this.props.value) {
            this.setState({ value: nextProps.value, label: this.getLabel(nextProps.value) })
        }
    }

    getLabel(value) {
        let children = this.props.children;
        let selected = children.find(child => child.props.value == value);
        if (selected) {
            return selected.props.children;
        } else {
            return value;
        }
    }

    //值改变
    handleChange(e) {
        let value = e.target.value;
        this.props.onChange(value, this.props.multiple);
        e.nativeEvent.stopImmediatePropagation();
    }

    //选中
    handleSelect(value, label) {
        this.props.onSelect(value, this.props.multiple);
        this.setState({ value: value, label: label })
    }

    //显示下拉列表
    showDropdown(e) {
        this.setState({ showOption: true });
        e.nativeEvent.stopImmediatePropagation();
    }

    //切换显示下拉列表
    toggleDropdown(e) {
        this.setState({ showOption: !this.state.showOption });
        e.nativeEvent.stopImmediatePropagation();
    }

    render() {
        let children = this.props.children;
        if (this.props.options && this.props.options.length > 0) {
            children = this.props.options.map(option => {
                return (
                    <this.Option
                        value={option.value}
                        key={option.value}
                        selected={this.state.value == option.value ? true : false}
                        onSelect={this.handleSelect.bind(this)}
                    >{option.label}</this.Option>)
            })
        }
        return (
            <div className={styles.select}>
                <input onChange={this.handleChange.bind(this)}
                    onClick={this.showDropdown.bind(this)}
                    value={this.state.label}
                    className={this.props.className ? `${this.props.className} ${styles.selectInput}` : styles.selectInput}
                    style={this.props.style}
                />
                {
                    this.state.showOption ?
                        <FontAwesome
                            className={styles.caret}
                            name={'angle-up'}
                            onClick={this.toggleDropdown.bind(this)}
                        />
                        :
                        <FontAwesome
                            className={styles.caret}
                            name={'angle-down'}
                            onClick={this.toggleDropdown.bind(this)}
                        />
                }
                <ul className={styles.selectOptions} style={{ display: this.state.showOption ? 'block' : 'none' }}>
                    {React.Children.map(children, (child) => {
                        return React.cloneElement(child, {
                            selected: this.state.value == child.props.value ? true : false,
                            onSelect: this.handleSelect.bind(this)
                        });
                    })}
                </ul>
            </div>
        )
    }
}
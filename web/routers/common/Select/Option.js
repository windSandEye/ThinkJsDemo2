import React from 'react';
import styles from './Select.less';

export default class Option extends React.Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        value: '',
        selected: false,
        onSelect: (value, label) => { }
    }

    //选中
    handleSelect() {
        this.props.onSelect(this.props.value, this.props.children)
    }

    render() {
        return (
            <li value={this.props.value} onClick={this.handleSelect.bind(this)}
                className={this.props.selected ? styles.active : ''}>
                {this.props.children}
            </li>
        )
    }
}
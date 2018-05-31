import React from 'react';
import FontAwesome from 'react-fontawesome';
import styles from './Checkbox.less';

export default class Checkbox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: this.props.checked
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.checked != nextProps.checked) {
            this.setState({ checked: nextProps.checked })
        }
    }

    static defaultProps = {
        className: null,
        style: null,
        checked: false,
        value: null,
        onChange: (value, checked) => { },
        handleChange: (value, checked) => { }
    }

    handleChange(e) {
        this.setState({ checked: !this.state.checked })
        this.props.onChange(this.props.value, !this.state.checked);
        this.props.handleChange(this.props.value, !this.state.checked)
    }

    render() {
        return (
            <div className={this.props.className ? `${styles.checkbox} ${this.props.className}` : styles.checkbox}
                style={this.props.style}>
                {this.state.checked ?
                    <FontAwesome
                        className={styles.checkboxBtn}
                        name={'check-square'}
                        onClick={this.handleChange.bind(this)}
                    />
                    :
                    <FontAwesome
                        className={styles.checkboxBtn}
                        name={'square-o'}
                        onClick={this.handleChange.bind(this)}
                    />
                }
                <span className={styles.checkboxLabel}>
                    {this.props.children}
                </span>
            </div>
        )
    }
}
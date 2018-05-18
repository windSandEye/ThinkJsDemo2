import React from 'react';
import { connect } from 'dva';
import FontAwesome from 'react-fontawesome';
import BodyHeader from '../common/bodyHeader/BodyHeader';
import CustomerList from './list/CustomerList';
import styles from './Customers.less';

@connect(state => ({
    customers: state.customers
}))
export default class Customers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            downList: [
                { value: 1, title: '客户列表', url: 'business/customers' },
                { value: 2, title: '客户详情', url: 'business/customerDetail' }],
            search: '',
            showCheckbox: false
        }
    }

    //查询组件修改
    changeSearch(e) {
        this.setState({ search: e.target.value })
    }

    //删除
    deleteCustomer() {
        this.setState({
            showCheckbox: !this.state.showCheckbox
        })
    }

    //刷新
    refreshCustomer() {
        this.props.dispatch({
            type: 'customers/findAll'
        })
    }

    //回车查询
    searchEnterCustomer(e) {
        if (e.keyCode === 13) {
            this.props.dispatch({
                type: 'customers/findAll',
                param: {
                    keyword: this.state.search
                }
            })
        }
    }

    //根据关键字查询
    searchCustomer() {
        this.props.dispatch({
            type: 'customers/findAll',
            param: {
                keyword: this.state.search
            }
        })
    }

    render() {
        return (
            <div className={styles.contianer}>
                <BodyHeader downList={this.state.downList} dispatch={this.props.dispatch} />
                <div className={styles.bodyContent}>
                    <div className={styles.toolBar}>
                        <div className={styles.barGroup}>
                            <FontAwesome
                                className={styles.barBtn}
                                name={'refresh'}
                                title={'刷新'}
                                onClick={this.refreshCustomer.bind(this)}
                            />
                        </div>
                        <div className={styles.barGroup}>
                            <FontAwesome
                                className={styles.barBtn}
                                name={'plus'}
                                title={'新增'}
                            />
                            <FontAwesome
                                className={styles.barBtn}
                                name={'trash-o'}
                                title={'删除'}
                                onClick={this.deleteCustomer.bind(this)}
                            />
                        </div>

                        <div className={styles.barGroup}>
                            <FontAwesome
                                className={styles.barBtn}
                                name={'upload'}
                                title={'导入'}
                            />
                            <FontAwesome
                                className={styles.barBtn}
                                name={'download'}
                                title={'导出'}
                            />
                        </div>
                        <div className={styles.barGroup}>
                            <input value={this.state.search} className={styles.searchInput}
                                placeholder='姓名/电话'
                                onChange={this.changeSearch.bind(this)}
                                onKeyUp={this.searchEnterCustomer.bind(this)}
                            />
                            <FontAwesome
                                className={styles.searchIcon}
                                name={'search'}
                                onClick={this.searchCustomer.bind(this)}
                            />
                        </div>
                    </div>
                    <CustomerList showCheckbox={this.state.showCheckbox} />
                </div>
            </div>
        )
    }
}
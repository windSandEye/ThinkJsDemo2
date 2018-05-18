import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import FontAwesome from 'react-fontawesome';
import Pagination from '../../common/pagination/Pagination';
import utils from '../../../utils/utils'
import styles from './CustomerList.less';

@connect(state => ({
    customers: state.customers
}))
export default class CustomerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customerList: this.props.customers.customerList
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'customers/findAll'
        })
        let cardDiv = document.getElementById('cardList');
        let cardCol = (cardDiv.offsetWidth - 30) / 384;
        let width = parseInt(cardCol) * 384 + 30;
        this.setState({
            cardWidth: width
        })
    }

    componentWillReceiveProps(nextProps) {
        if (!utils.objEqual(this.props.customers.customerList, nextProps.customers.customerList)) {
            this.setState({ customerList: nextProps.customers.customerList })
        }
    }

    //查询组件修改
    changeSearch(e) {
        this.setState({ search: e.target.value })
        e.nativeEvent.stopImmediatePropagation();
    }

    //勾选一项
    changeItemCheck(id) {
        let checkedItem = this.state.customerList.data.find(item => item.id === id);
        checkedItem.checked = !checkedItem.checked;
        this.setState({
            customerList: this.state.customerList
        })
    }


    render() {
        const customerList = this.state.customerList;
        return (
            <div className={styles.cardTable}>
                <div className={styles.cardList} id={'cardList'} style={{ width: this.state.cardWidth }}>
                    {customerList.data.map((item, index) => {
                        return (
                            <div className={this.props.showCheckbox ? `${styles.listItem} ${styles.checkItem}` : styles.listItem} key={item.id}>
                                <div className={styles.checkboxIcon} style={{ display: this.props.showCheckbox ? 'block' : 'none' }}>
                                    {item.checked ?
                                        <FontAwesome name='check-square' size='2x' className={styles.checkIcon}
                                            onClick={this.changeItemCheck.bind(this, item.id)} /> :
                                        <FontAwesome name='square-o' size='2x' className={styles.checkIcon}
                                            onClick={this.changeItemCheck.bind(this, item.id)} />
                                    }
                                </div>
                                <div className={styles.company}>{item.company}</div>
                                <div className={styles.name}>
                                    <span>{item.name}</span>
                                    <span className={styles.department}>{item.department}</span>
                                </div>
                                <div>{item.address ? `地址:${item.address}` : null}</div>
                                <div>{item.phone ? `联系电话:${item.phone}` : null}</div>
                            </div>
                        )
                    })
                    }

                </div>
                <Pagination
                    // totalPages={this.props.customers.customerList.totalPages}
                    // currentPage={this.props.customers.customerList.currentPage}
                    // count={this.props.customers.customerList.count}
                    // pageSize={this.props.customers.customerList.pageSize}

                    totalPages={8}
                    currentPage={2}
                    count={100}
                    pageSize={10}
                />
            </div>
        )
    }
}
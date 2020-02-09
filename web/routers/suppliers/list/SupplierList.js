import React from 'react';
import FontAwesome from 'react-fontawesome';
import Pagination from '../../common/Pagination/Pagination';
import utils from '../../../utils/utils'
import styles from '../../customers/list/CustomerList.less';

export default class SupplierList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            supplierList: this.props.suppliers.supplierList
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'suppliers/findAll'
        })
        let cardDiv = document.getElementById('cardList');
        let cardCol = (cardDiv.offsetWidth - 30) / 384;
        let width = parseInt(cardCol) * 384 + 30;
        this.setState({
            cardWidth: width
        })
    }

    componentWillReceiveProps(nextProps) {
        if (!utils.objEqual(this.props.suppliers.supplierList, nextProps.suppliers.supplierList)) {
            this.setState({ supplierList: nextProps.suppliers.supplierList })
        }
    }

    //查询组件修改
    changeSearch(e) {
        this.setState({ search: e.target.value })
        e.nativeEvent.stopImmediatePropagation();
    }

    //勾选一项
    changeItemCheck(id) {
        let checkedItem = this.state.supplierList.data.find(item => item.id === id);
        checkedItem.checked = !checkedItem.checked;
        this.setState({
            supplierList: this.state.supplierList
        })
    }

    //分页
    handleChangePage(page) {
        this.props.dispatch({
            type: 'suppliers/findAll',
            param: {
                keyword: this.props.searchValue,
                pageNum: page
            }
        })
    }

    //获取选中的客户项
    getCheckItem() {
        let checkItemList = this.state.supplierList.data.filter(item => item.checked)
        return checkItemList.map(item => item.id);
    }

    //进入详情页面
    enterDetail(id) {
        this.props.dispatch({
            type: 'suppliers/updateDownList',
            id: id
        })
    }


    render() {
        const supplierList = this.state.supplierList;
        return (
            <div className={styles.cardTable}>
                <div className={styles.cardList} id={'cardList'} style={{ width: this.state.cardWidth }}>
                    {supplierList.data.map((item, index) => {
                        return (
                            <div className={this.props.showCheckbox ? `${styles.listItem} ${styles.checkItem}` : styles.listItem}
                                key={item.id} onDoubleClick={this.enterDetail.bind(this, item.id)}
                                style={{ backgroundImage:'url(/static/img/supplier-background.png)'}}
                                >
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
                    totalPages={this.props.suppliers.supplierList.totalPages}
                    currentPage={this.props.suppliers.supplierList.currentPage}
                    count={this.props.suppliers.supplierList.count}
                    pageSize={this.props.suppliers.supplierList.pageSize}
                    handleChangePage={this.handleChangePage.bind(this)}
                />
            </div>
        )
    }
}
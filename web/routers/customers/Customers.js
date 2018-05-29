import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import FontAwesome from 'react-fontawesome';
import BodyHeader from '../common/bodyHeader/BodyHeader';
import { Modal, Button, FormControl } from 'react-bootstrap';
import CustomerList from './list/CustomerList';
import CustomerDetail from './detail/CustomerDetail';


import styles from './Customers.less';

@connect(state => ({
    customers: state.customers
}))
export default class Customers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            downList: this.props.customers.downList,
            search: '',
            showCheckbox: false,
            showModal: false,
            xlsxFile: null
        }
    }

    //查询组件修改
    changeSearch(e) {
        this.setState({ search: e.target.value })
    }

    //删除
    deleteCustomer() {
        if (this.state.showCheckbox) {
            this.props.dispatch({
                type: 'customers/deleteCustomer',
                param: {
                    idList: this.customerRef.getCheckItem(),
                    pageNum: this.props.customers.customerList.currentPage,
                    keyword: this.state.search
                }
            })
        }
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

    //跳转新增页面
    createCustomer() {
        this.props.dispatch(routerRedux.push('/manage/business/customers/createPage'));
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

    //导出客户信息
    exportCustomer() {
        this.props.dispatch({
            type: 'customers/exportCustomer'
        })
    }

    //导入客户信息
    importCustomer() {
        this.props.dispatch({
            type: 'customers/importCustomer',
            xlsxFile: this.state.xlsxFile
        })
        this.closeModal();
    }

    //打开弹窗
    openModal() {
        this.setState({
            showModal: true
        })
    }

    //关闭弹窗
    closeModal() {
        this.setState({
            showModal: false,
            xlsxFile: null
        })
    }

    //文件内容改变
    changeFile(e) {
        this.setState({
            xlsxFile: e.target.files[0]
        })
    }

    //获取内容显示标题
    getBodyHeaderTitle() {
        let path = this.props.location.pathname;
        let currentBody = this.state.downList.find(item => path == `/manage/${item.url}`);
        if (currentBody) {
            return currentBody.title;
        } else {
            return '无标题'
        }
    }

    //返回
    headerGoBack() {
        this.props.history.goBack()
    }

    render() {
        return (
            <div className={styles.contianer}>
                <BodyHeader downList={this.state.downList} dispatch={this.props.dispatch}
                    currentTitle={'客户列表'} goBack={this.headerGoBack.bind(this)} />
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
                                onClick={this.createCustomer.bind(this)}
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
                                onClick={this.openModal.bind(this)}
                            />
                            <FontAwesome
                                className={styles.barBtn}
                                name={'download'}
                                title={'导出'}
                                onClick={this.exportCustomer.bind(this)}
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
                    <CustomerList
                        ref={(customerRef) => { this.customerRef = customerRef }}
                        showCheckbox={this.state.showCheckbox}
                        searchValue={this.state.search}
                        customers={this.props.customers}
                        dispatch={this.props.dispatch}
                    />
                    <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>导入客户信息</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl
                                type="file"
                                placeholder="请选择上传的文件"
                                className={styles.inputFile}
                                onChange={this.changeFile.bind(this)}
                            />
                            <div className={styles.template}><a href={'/manage/business/customers/exportTemplate'}>模版下载</a></div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="primary" onClick={this.importCustomer.bind(this)}>确定</Button>
                            <Button onClick={this.closeModal.bind(this)}>取消</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}
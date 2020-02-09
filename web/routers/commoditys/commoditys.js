import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import FontAwesome from 'react-fontawesome';
import BodyHeader from '../common/bodyHeader/BodyHeader';
import { Modal, Button, FormControl } from 'react-bootstrap';
import CommodityList from './list/CommodityList';

import styles from '../customers/Customers.less';


@connect(state => ({
    commoditys: state.commoditys
}))
export default class Commoditys extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            downList: this.props.commoditys.downList,
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
    deleteCommodity() {
        if (this.state.showCheckbox) {
            let idList = this.supplierRef.getCheckItem();
            if (idList && idList.length > 0) {
                this.props.dispatch({
                    type: 'commoditys/deleteCommodity',
                    param: {
                        idList: idList,
                        pageNum: this.props.commoditys.supplierList.currentPage,
                        keyword: this.state.search
                    }
                })
            }
        }
        this.setState({
            showCheckbox: !this.state.showCheckbox
        })
    }

    //刷新
    refreshCommodity() {
        this.props.dispatch({
            type: 'commoditys/findAll',
            param: {
                keyword: this.state.search
            }
        })
    }

    //跳转新增页面
    createCommodity() {
        this.props.dispatch(routerRedux.push('/manage/business/commoditys/createPage'));
    }

    //回车查询
    searchEnterCommodity(e) {
        if (e.keyCode === 13) {
            this.props.dispatch({
                type: 'commoditys/findAll',
                param: {
                    keyword: this.state.search
                }
            })
        }
    }

    //根据关键字查询
    searchCommodity() {
        this.props.dispatch({
            type: 'commoditys/findAll',
            param: {
                keyword: this.state.search
            }
        })
    }

    //导出供应商信息
    exportCommodity() {
        this.props.dispatch({
            type: 'commoditys/exportCommodity'
        })
    }

    //导入供应商信息
    importCommodity() {
        this.props.dispatch({
            type: 'commoditys/importCommodity',
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
                    currentTitle={'商品列表'} goBack={this.headerGoBack.bind(this)} />
                <div className={styles.bodyContent}>
                    <div className={styles.toolBar}>
                        <div className={styles.barGroup}>
                            <FontAwesome
                                className={styles.barBtn}
                                name={'refresh'}
                                title={'刷新'}
                                onClick={this.refreshCommodity.bind(this)}
                            />
                        </div>
                        <div className={styles.barGroup}>
                            <FontAwesome
                                className={styles.barBtn}
                                name={'plus'}
                                title={'新增'}
                                onClick={this.createCommodity.bind(this)}
                            />
                            <FontAwesome
                                className={styles.barBtn}
                                name={'trash-o'}
                                title={'删除'}
                                onClick={this.deleteCommodity.bind(this)}
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
                                onClick={this.exportCommodity.bind(this)}
                            />
                        </div>
                        <div className={styles.barGroup}>
                            <input value={this.state.search} className={styles.searchInput}
                                placeholder='商品名/条形码'
                                onChange={this.changeSearch.bind(this)}
                                onKeyUp={this.searchEnterCommodity.bind(this)}
                            />
                            <FontAwesome
                                className={styles.searchIcon}
                                name={'search'}
                                onClick={this.searchCommodity.bind(this)}
                            />
                        </div>
                    </div>
                   <CommodityList
                        ref={(supplierRef) => { this.supplierRef = supplierRef }}
                        showCheckbox={this.state.showCheckbox}
                        searchValue={this.state.search}
                        commoditys={this.props.commoditys}
                        dispatch={this.props.dispatch}
                    />
                    <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>导入商品信息</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl
                                type="file"
                                placeholder="请选择上传的文件"
                                className={styles.inputFile}
                                onChange={this.changeFile.bind(this)}
                            />
                            <div className={styles.template}><a href={'/manage/business/commoditys/exportTemplate'}>模版下载</a></div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="primary" onClick={this.importCommodity.bind(this)}>确定</Button>
                            <Button onClick={this.closeModal.bind(this)}>取消</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

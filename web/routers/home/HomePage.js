import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './HomePage.less';
import ReactDocumentTitle from 'react-document-title';
import Header from '../common/header/Header';

@connect(state => ({
    homepage: state.homepage
}))
export default class HomePage extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {

    }

    //入口跳转
    entrance(path) {
        this.props.dispatch(
            routerRedux.push(`/manage/${path}`)
        )
    }

    render() {
        return (
            <ReactDocumentTitle title="首页">
                <div className={styles.homeLayout}>
                    <Header />
                    <div className={styles.homeIndex}>
                        <div className={styles.container}>
                            <div className={styles.menuLeft}>
                                <div className={styles.menuRow}>
                                    <div className={`${styles.muenItem} ${styles.business}`} onClick={this.entrance.bind(this, 'baseInfo/commodity')}>
                                        <img src='/static/img/business.png' />
                                        <div className={styles.menuTitle}>商品管理</div>
                                    </div>
                                    <div className={`${styles.muenItem} ${styles.inventory}`} onClick={this.entrance.bind(this, 'pss/inventory')}>
                                        <img src='/static/img/inventory.png' />
                                        <div className={styles.menuTitle}>库存管理</div>
                                    </div>
                                    <div className={`${styles.muenItem} ${styles.warehouse}`} onClick={this.entrance.bind(this, 'baseInfo/warehouse')}>
                                        <img src='/static/img/warehouse.png' />
                                        <div className={styles.menuTitle}>仓库管理</div>
                                    </div>
                                </div>
                                <div className={styles.menuRow}>
                                    <div className={`${styles.muenItem} ${styles.purchase}`} onClick={this.entrance.bind(this, 'pss/purchase')}>
                                        <img src='/static/img/purchase.png' />
                                        <div className={styles.menuTitle}>采购入库</div>
                                    </div>
                                    <div className={`${styles.muenItem} ${styles.sell}`} onClick={this.entrance.bind(this, 'pss/sell')}>
                                        <img src='/static/img/sell.png' />
                                        <div className={styles.menuTitle}>销售出库</div>
                                    </div>
                                    <div className={`${styles.muenItem} ${styles.allot}`} onClick={this.entrance.bind(this, 'baseInfo/allot')}>
                                        <img src='/static/img/allot.png' />
                                        <div className={styles.menuTitle}>库存调拨</div>
                                    </div>
                                </div>
                                <div className={styles.menuRow}>
                                    <div className={`${styles.muenItem} ${styles.customers}`} onClick={this.entrance.bind(this, 'business/customers')}>
                                        <img src='/static/img/customers.png' />
                                        <div className={styles.menuTitle}>客户管理</div>
                                    </div>
                                    <div className={`${styles.muenItem} ${styles.supplier}`} onClick={this.entrance.bind(this, 'business/supplier')}>
                                        <img src='/static/img/supplier.png' />
                                        <div className={styles.menuTitle}>供应商管理</div>
                                    </div>
                                    <div className={`${styles.muenItem} ${styles.statistics}`} onClick={this.entrance.bind(this, 'statement/statistics')}>
                                        <img src='/static/img/statistics.png' />
                                        <div className={styles.menuTitle}>统计报表</div>
                                    </div>
                                </div>

                            </div>
                            <div className={styles.menuRight}>
                                <div className={styles.menuRow}>
                                    <div className={`${styles.muenItem} ${styles.aboutUs}`} onClick={this.entrance.bind(this, 'aboutUs')}>
                                        <img src='/static/img/aboutUs.png' />
                                        <div className={styles.menuTitle}>关于我们</div>
                                    </div>
                                    <div className={`${styles.muenItem} ${styles.guide}`} onClick={this.entrance.bind(this, 'guide')}>
                                        <img src='/static/img/guide.png' />
                                        <div className={styles.menuTitle}>新手指引</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.clr}></div>
                        </div>
                    </div>
                </div>
            </ReactDocumentTitle>
        )
    }
}
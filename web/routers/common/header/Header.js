import React from 'react';
import { routerRedux } from 'dva/router';
import styles from './Header.less';

export default class Header extends React.Component {

    constructor(props) {
        super(props)
    }

    //退出系统
    logout() {

    }

    //返回主页
    returnHomePage() {
        let url = window.location.origin;
        window.location.href = url;
    }


    render() {
        return (
            <div className={styles.header}>
                <div className={styles.leftPart} onClick={this.returnHomePage.bind(this)}>
                    <a>
                        <img src='/static/img/home.png' className={styles.logoImg} />
                    </a>
                    <div>利源</div>
                </div>
                <div className={styles.rightPart}>
                    <div className={styles.partGroup}>
                        <img src='/static/img/customer.png' className={styles.groupImg} />
                        <div>客服</div>
                    </div>
                    <div className={styles.partGroup}>
                        <img src='/static/img/user.png' className={styles.groupImg} />
                        <div>{this.props.user ? this.props.user.name : '管理员'}</div>
                    </div>
                    <div className={styles.logout} onClick={this.logout.bind(this)}>
                        <img src='/static/img/logout.png' className={styles.groupImg} />
                        <div>退出</div>
                    </div>
                </div>
            </div>
        )
    }
}
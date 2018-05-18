import React from 'react';
import styles from './Header.less';

export default class Header extends React.Component {

    constructor(props) {
        super(props)
    }

    //退出系统
    logout() {

    }


    render() {
        return (
            <div className={styles.header}>
                <div className={styles.leftPart}>
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
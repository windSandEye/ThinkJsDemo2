import React from 'react';
import FontAwesome from 'react-fontawesome';
import { routerRedux } from 'dva/router';
import styles from './BodyHeader.less';


export default class BodyHeader extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            downList: this.props.downList || [],
            currentTitle: this.props.downList && this.props.downList.length > 0 ? this.props.downList[0].title : '无标题',
            showTitle: false
        }
    }

    componentDidMount() {
        document.onclick = () => {
            this.setState({ showTitle: false })
        }
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    //打开标题列表
    openTitleList(e) {
        this.setState({
            showTitle: !this.state.showTitle
        })
        e.nativeEvent.stopImmediatePropagation();
    }

    //切换标题
    switchTitle(key, e) {
        let currentSelected = this.state.downList.find(item => item.value == key);
        this.setState({
            showTitle: false,
            currentTitle: currentSelected.title
        })
        e.nativeEvent.stopImmediatePropagation();
        this.props.dispatch(
            routerRedux.push(`/manage/${currentSelected.url}`)
        )
    }

    render() {
        const downList = this.state.downList;
        return (
            <div className={styles.bodyHeader}>
                <div className={styles.headerIcon}>
                    <FontAwesome
                        className={styles.backIcon}
                        name='angle-left'
                    />
                    <a href='/home' className={styles.backTitle}>返回</a>
                </div>
                <div className={styles.headerTitle}>
                    <div>{this.state.currentTitle}</div>
                    <FontAwesome
                        className={styles.downIcon}
                        name={this.state.showTitle ? 'angle-up' : 'angle-down'}
                        onClick={this.openTitleList.bind(this)}
                    />
                    <div className={styles.dropDown} style={{ display: this.state.showTitle && downList.length > 1 ? 'flex' : 'none' }}>
                        {
                            downList.map((item, index) => {
                                return (
                                    <div className={styles.downItem} key={item.value} onClick={this.switchTitle.bind(this, item.value)}>{item.title}</div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
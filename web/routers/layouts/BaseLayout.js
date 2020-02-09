import React from 'react';
import { connect } from 'dva';
import ReactDocumentTitle from 'react-document-title';
import { Link, Route, Switch, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import Header from '../common/header/Header';
import menuConfig from '../../menuConfig';
import styles from './BaseLayout.less';
import Customers from '../customers/Customers'

export default class BaseLayout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            menuConfig: this.getMenuPath(menuConfig) || []
        }
    }

    componentDidMount() {
        let path = this.props.location.pathname;
        this.macthMenu(path);
    }

    componentWillReceiveProps(nextProps) {
        let locationPath = nextProps.location.pathname;
        let oldPath = this.props.location.pathname;
        if (oldPath != locationPath) {
            this.macthMenu(locationPath);
        }
    }

    //匹配一个菜单
    macthMenu(path) {
        let menuConfig = this.state.menuConfig;
        let oneMenuPath = path.split('/')[2];
        if (oneMenuPath) {
            let oneMenu = menuConfig.find(item => item.path == oneMenuPath);
            if (oneMenu && oneMenu.children && oneMenu.children.length > 0) {
                let activeMenu = oneMenu.children.filter(twoMenu => path.indexOf(twoMenu.path) > -1);
                this.activeMenu(activeMenu[0]);
            }
        }
    }

    //鼠标移入
    moveMuen(menu) {
        menu.hover = true;
        this.setState({
            menuConfig: this.state.menuConfig
        })
    }

    //鼠标移出
    outMuen(menu) {
        menu.hover = false;
        this.setState({
            menuConfig: this.state.menuConfig
        })
    }

    //选中菜单
    activeMenu(menu) {
        let menuConfig = this.state.menuConfig;
        const menuList = this.selectMenu(menuConfig, menu);
        this.setState({
            menuConfig: menuList
        })
    }

    //选中一个节点
    selectMenu(menuList, currentMenu) {
        if (menuList && menuList.length > 0) {
            for (let item of menuList) {
                if (item.path == currentMenu.path) {
                    item.active = true;
                } else {
                    item.active = false;
                    if (item.children && item.children.length > 0) {
                        this.selectMenu(item.children, currentMenu);
                    }
                }
            }
        }
        return menuList;
    }

    //封装路由信息
    getMenuPath(menuConfig) {
        if (menuConfig && menuConfig.length > 0) {
            for (let oneMenu of menuConfig) {//遍历所有一级路由
                if (oneMenu.children) {//如果存在子路由，则拼接路由路径
                    for (let twoMuen of oneMenu.children) {
                        twoMuen.path = '/manage/' + oneMenu.path + "/" + twoMuen.path;
                    }
                }
            }
        }
        return menuConfig;
    }

    renderTwoMenu(menuList) {
        if (menuList && menuList.length > 0) {
            return menuList.map((item, index) => {
                return (
                    <div className={styles.twoMenu} key={item.path}>
                        <Link className={styles.muenLink}
                            to={item.path}
                            onMouseEnter={this.moveMuen.bind(this, item)}
                            onMouseLeave={this.outMuen.bind(this, item)}
                            onClick={this.activeMenu.bind(this, item)}
                        >
                            <div className={(item.active || item.hover) ? `${styles.twoMenuItem} ${styles.active}` : styles.twoMenuItem}>
                                <img src={(item.active || item.hover) ? `/static/img/${item.icon}-active.png` : `/static/img/${item.icon}.png`} />
                                <span className={styles.twoMenuTitle}>{item.name}</span>
                            </div>
                        </Link>
                    </div>
                )
            })
        }
        return null;
    }

    //渲染一级菜单
    renderOneMenu(menuConfig) {
        if (menuConfig && menuConfig.length > 0) {
            return menuConfig.map((menu, index) => {
                return (
                    <div className={styles.oneMenu} key={`${menu.path}-${index}`}>
                        <div className={styles.oneMenuTitle}>{menu.name}</div>
                        {this.renderTwoMenu(menu.children)}
                    </div>
                )
            })
        }
        return null;
    }

    //获取后台路由列表
    getBaseRouteData(routeData, parentPath) {
        const baseRouteData = routeData.filter(item => item.path == parentPath);
        let routeList = [];
        const getRouteList = (baseList) => {
            for (let route of baseList) {
                if (route.component) {
                    routeList.push(route);
                }
                if (route.children) {
                    getRouteList(route.children);
                }
            }
        }
        getRouteList(baseRouteData);
        return routeList;
    }

    render() {
        const title = this.props.getTitle(this.state.menuConfig);
        const routeData = this.getBaseRouteData(this.props.routeData, '/manage');
        return (
            <ReactDocumentTitle title={title}>
                <div className={styles.baseLayout}>
                    <Header/>
                    <div className={styles.container}>
                        <div className={styles.leftMenu}>
                            {this.renderOneMenu(this.state.menuConfig)}
                        </div>
                        <div className={styles.rightContent}>
                            {
                                <Switch>
                                    {
                                        routeData.map(item => (
                                            <Route
                                                exact={true}
                                                key={item.path}
                                                path={item.path}
                                                component={item.component}
                                            >
                                            </Route>))
                                    }
                                </Switch>
                            }
                        </div>
                    </div>
                </div>
            </ReactDocumentTitle>
        )
    }
}
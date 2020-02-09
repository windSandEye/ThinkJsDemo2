import React from 'react';
import { Router, Route, Switch, routerRedux, IndexRoute } from 'dva/router';
// import browserHistory from 'history/createBrowserHistory';
import RouterConfig from './routerConfig';
import dynamic from 'dva/dynamic';
import HomePage from './routers/home/HomePage';
import BaseLayout from './routers/layouts/BaseLayout';
import cloneDeep from 'lodash.cloneDeep';


// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
    app,
    models: () => models.map(m => import(`./models/${m}.js`)),
    component
});

//获取当前路由的name
function getTitle(routeData) {
    let title = '利源-后台管理系统';
    if (routeData && routeData.length > 0) {
        for (let route of routeData) {
            if (matchPath(route.path, location.pathname)) {
                title = route.name;
            }
        }
    }
    return title;
}

//匹配路由和当前路径是否相同
const matchPath = (path, url) => {
    let pathList = path.split("/");
    let urlList = url.split("/")
    let flag = true;
    if (pathList.length != urlList.length) {//路由长度不相同，直接返回
        return false;
    }
    for (let i = 0; i < pathList.length; i++) {//跳过通配符的匹配
        if (pathList[i].indexOf(":") > -1 || pathList[i].indexOf("*") > -1 || pathList[i].indexOf("(") > -1) {
            continue;
        } else {
            if (urlList[i] != pathList[i]) {
                flag = false;
                break;
            }
        }
    }
    return flag;
}

//封装路由信息
function getRouteData(rootRouter, app) {
    if (rootRouter && rootRouter.length > 0) {
        for (let oneRoute of rootRouter) {//遍历所有一级路由
            //封装路由组件
            if (oneRoute.component) {
                oneRoute.component = dynamicWrapper(app, oneRoute.model, oneRoute.component);
            }
            if (oneRoute.children) {//如果存在子路由，则拼接路由路径
                for (let twoRoute of oneRoute.children) {
                    twoRoute.path = oneRoute.path + "/" + twoRoute.path;
                }
                getRouteData(oneRoute.children, app);
            }
        }
    }
    return rootRouter;
}

function getRouteRender({ history, app }) {
    const routerConfig = cloneDeep(RouterConfig);
    const routeData = getRouteData(routerConfig, app);
    const title = getTitle(routeData);
    const renderProps = {
        app,
        routeData: routeData,
        getTitle: (data) => getTitle(data)
    }
    return (
        <Router history={history}>
            <Switch>
                <Route path={'/home'} render={(props) => <HomePage {...props} {...renderProps} />} />
                <Route path={'/manage'} render={(props) => <BaseLayout {...props} {...renderProps} />} />
                <Route path={'/'} render={(props) => <HomePage {...props} {...renderProps} />} />
            </Switch>
        </Router>
    );
}

export default getRouteRender;
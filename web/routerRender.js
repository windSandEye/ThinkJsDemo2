import React from 'react';
import { Link, Router,Route, Redirect, Switch, routerRedux, IndexRoute } from 'dva/router';
import RouterConfig from './routerConfig';
import browserHistory from 'history/createBrowserHistory';
import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`./models/${m}.js`)),
  component,
});

//封装路由信息
function getRouteData(rootRouter,app) {
    if (rootRouter && rootRouter.length > 0) {
        for (let oneRoute of rootRouter) {//遍历所有一级路由
            oneRoute.component = dynamicWrapper(app,oneRoute.model,oneRoute.component);
            if (oneRoute.children) {//如果存在子路由，则拼接路由路径
                for (let twoRoute of oneRoute.children) {
                    twoRoute.path = oneRoute.path + "/" + twoRoute.path;
                    twoRoute.component = dynamicWrapper(app,twoRoute.model,twoRoute.component);
                    getRouteData(oneRoute.children);
                }
            }
        }
    }
    return rootRouter;
}

function getRouteRender({ history,app }) {
    const routeData = getRouteData(RouterConfig,app);
    return (
        <Router history={history}>
            <Switch>
                {
                    routeData.map(route => {
                        return <Route exact={true} key={route.path} path={route.path} component={route.component} />
                    })
                }
            </Switch>
        </Router>
    );
}

export default getRouteRender;
/**
 * @Author: yuanshubing 
 * @Date: 2018-04-02 11:15:37 
 */

import dva from 'dva';
import browserHistory from 'history/createBrowserHistory';
import routers from './routerRender';

// 初始化
const app = dva({
  history: browserHistory()
});

//注册全局状态
// app.model(require('./models/global'));

//路由注册
app.router(routers);

//渲染页面
app.start('#app');

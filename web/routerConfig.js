
module.exports = [
    {
        name: '首页',
        path: '/',
        model: ['demo'],
        component: () => import('./routers/demo/demo'),
        children: [
            {
                name: '子路由',
                path: 'demo/index',
                model: ['demo'],
                component:() => import('./routers/demo/demo'),
            }
        ]
    }
]
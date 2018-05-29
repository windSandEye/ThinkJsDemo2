
module.exports = [
    {
        name: '首页',
        path: '/',
        model: ['home'],
        component: () => import('./routers/home/HomePage'),
    },
    {
        name: '后台管理',
        path: '/manage',
        children: [
            {
                name: '商户',
                path: 'business',
                children: [
                    {
                        name: '客户管理',
                        path: 'customers',
                        model: ['customers'],
                        component: () => import('./routers/customers/Customers'),
                        children:[
                            {
                                name: '新增客户',
                                path: 'createPage',
                                model: ['customers'],
                                component: () => import('./routers/customers/detail/CustomerDetail'),
                            },
                            {
                                name: '客户详情',
                                path: 'detailPage',
                                model: ['customers'],
                                component: () => import('./routers/customers/detail/CustomerDetail'),
                            },
                        ]   
                    },
                    {
                        name: '供应商管理',
                        path: 'supplier',
                        model: ['home'],
                        component: () => import('./routers/home/HomePage'),
                    }
                ]
            },
            // {
            //     name: '商品',
            //     path: 'baseInfo',
            //     children: [
            //         {
            //             name: '商品管理',
            //             path: 'commodity',
            //             model: ['home'],
            //             component: () => import('./routers/home/HomePage'),
            //         },
            //         {
            //             name: '仓库管理',
            //             path: 'warehouse',
            //             model: ['home'],
            //             component: () => import('./routers/home/HomePage'),
            //         }
            //     ]
            // },
            // {
            //     name: '进销存',
            //     path: 'pss',
            //     children: [
            //         {
            //             name: '采购',
            //             path: 'purchase',
            //             model: ['home'],
            //             component: () => import('./routers/home/HomePage'),
            //         },
            //         {
            //             name: '销售',
            //             path: 'sale',
            //             model: ['home'],
            //             component: () => import('./routers/home/HomePage'),
            //         },
            //         {
            //             name: '库存',
            //             path: 'inventory',
            //             model: ['home'],
            //             component: () => import('./routers/home/HomePage'),
            //         }
            //     ]
            // },
            // {
            //     name: '报表',
            //     path: 'statement',
            //     children: [
            //         {
            //             name: '入库统计',
            //             path: 'customers',
            //             model: ['home'],
            //             component: () => import('./routers/home/HomePage'),
            //         },
            //         {
            //             name: '出库统计',
            //             path: 'supplier',
            //             model: ['home'],
            //             component: () => import('./routers/home/HomePage'),
            //         },
            //         {
            //             name: '仓库统计',
            //             path: 'warehouse',
            //             model: ['home'],
            //             component: () => import('./routers/home/HomePage'),
            //         }
            //     ]
            // }
        ]
    }
]
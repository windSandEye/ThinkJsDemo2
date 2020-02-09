const menuConfig = [
    {
        name: '商户',
        path: 'business',
        children: [
            {
                name: '客户管理',
                path: 'customers',
                icon: 'custommenu'
            },
            {
                name: '供应商管理',
                path: 'suppliers',
                icon: 'suppliermenu'
            }
        ]
    },
    {
        name: '商品',
        path: 'baseInfo',
        children: [
            {
                name: '商品管理',
                path: 'commoditys',
                icon: 'commoditymenu'
            },
            {
                name: '仓库管理',
                path: 'warehouse',
                icon: 'warehousemenu'
            }
        ]
    },
    {
        name: '进销存',
        path: 'pss',
        children: [
            {
                name: '采购',
                path: 'purchase',
                icon: 'purchasemenu'
            },
            {
                name: '销售',
                path: 'sale',
                icon: 'sellmenu'
            },
            {
                name: '库存',
                path: 'inventory',
                icon: 'inventorymenu'
            }
        ]
    },
    {
        name: '报表',
        path: 'statement',
        children: [
            {
                name: '入库统计',
                path: 'customers',
                icon: 'statementmenu'
            },
            {
                name: '出库统计',
                path: 'supplier',
                icon: 'statementmenu'
            },
            {
                name: '仓库统计',
                path: 'warehouse',
                icon: 'circlestatement'
            }
        ]
    }
]

export default menuConfig;
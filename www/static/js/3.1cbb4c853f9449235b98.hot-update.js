webpackHotUpdate(3,{

/***/ 834:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = undefined;\n\nvar _getIterator2 = __webpack_require__(201);\n\nvar _getIterator3 = _interopRequireDefault(_getIterator2);\n\nvar _getPrototypeOf = __webpack_require__(14);\n\nvar _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);\n\nvar _classCallCheck2 = __webpack_require__(12);\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(15);\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(16);\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(17);\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _dva = __webpack_require__(66);\n\nvar _reactDocumentTitle = __webpack_require__(327);\n\nvar _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);\n\nvar _router = __webpack_require__(51);\n\nvar _dynamic = __webpack_require__(386);\n\nvar _dynamic2 = _interopRequireDefault(_dynamic);\n\nvar _Header = __webpack_require__(328);\n\nvar _Header2 = _interopRequireDefault(_Header);\n\nvar _menuConfig = __webpack_require__(835);\n\nvar _menuConfig2 = _interopRequireDefault(_menuConfig);\n\nvar _BaseLayout = __webpack_require__(836);\n\nvar _BaseLayout2 = _interopRequireDefault(_BaseLayout);\n\nvar _Customers = __webpack_require__(329);\n\nvar _Customers2 = _interopRequireDefault(_Customers);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar BaseLayout = function (_React$Component) {\n    (0, _inherits3.default)(BaseLayout, _React$Component);\n\n    function BaseLayout(props) {\n        (0, _classCallCheck3.default)(this, BaseLayout);\n\n        var _this = (0, _possibleConstructorReturn3.default)(this, (BaseLayout.__proto__ || (0, _getPrototypeOf2.default)(BaseLayout)).call(this, props));\n\n        _this.state = {\n            menuConfig: _this.getMenuPath(_menuConfig2.default) || []\n        };\n        return _this;\n    }\n\n    (0, _createClass3.default)(BaseLayout, [{\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n            var path = this.props.location.pathname;\n            this.macthMenu(path);\n        }\n    }, {\n        key: 'componentWillReceiveProps',\n        value: function componentWillReceiveProps(nextProps) {\n            var locationPath = nextProps.location.pathname;\n            var oldPath = this.props.location.pathname;\n            if (oldPath != locationPath) {\n                this.macthMenu(locationPath);\n            }\n        }\n\n        //匹配一个菜单\n\n    }, {\n        key: 'macthMenu',\n        value: function macthMenu(path) {\n            var menuConfig = this.state.menuConfig;\n            var oneMenuPath = path.split('/')[2];\n            if (oneMenuPath) {\n                var oneMenu = menuConfig.find(function (item) {\n                    return item.path == oneMenuPath;\n                });\n                if (oneMenu && oneMenu.children && oneMenu.children.length > 0) {\n                    var activeMenu = oneMenu.children.filter(function (twoMenu) {\n                        return path.indexOf(twoMenu.path) > -1;\n                    });\n                    this.activeMenu(activeMenu[0]);\n                }\n            }\n        }\n\n        //鼠标移入\n\n    }, {\n        key: 'moveMuen',\n        value: function moveMuen(menu) {\n            menu.hover = true;\n            this.setState({\n                menuConfig: this.state.menuConfig\n            });\n        }\n\n        //鼠标移出\n\n    }, {\n        key: 'outMuen',\n        value: function outMuen(menu) {\n            menu.hover = false;\n            this.setState({\n                menuConfig: this.state.menuConfig\n            });\n        }\n\n        //选中菜单\n\n    }, {\n        key: 'activeMenu',\n        value: function activeMenu(menu) {\n            var menuConfig = this.state.menuConfig;\n            var menuList = this.selectMenu(menuConfig, menu);\n            this.setState({\n                menuConfig: menuList\n            });\n        }\n\n        //选中一个节点\n\n    }, {\n        key: 'selectMenu',\n        value: function selectMenu(menuList, currentMenu) {\n            if (menuList && menuList.length > 0) {\n                var _iteratorNormalCompletion = true;\n                var _didIteratorError = false;\n                var _iteratorError = undefined;\n\n                try {\n                    for (var _iterator = (0, _getIterator3.default)(menuList), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n                        var item = _step.value;\n\n                        if (item.path == currentMenu.path) {\n                            item.active = true;\n                        } else {\n                            item.active = false;\n                            if (item.children && item.children.length > 0) {\n                                this.selectMenu(item.children, currentMenu);\n                            }\n                        }\n                    }\n                } catch (err) {\n                    _didIteratorError = true;\n                    _iteratorError = err;\n                } finally {\n                    try {\n                        if (!_iteratorNormalCompletion && _iterator.return) {\n                            _iterator.return();\n                        }\n                    } finally {\n                        if (_didIteratorError) {\n                            throw _iteratorError;\n                        }\n                    }\n                }\n            }\n            return menuList;\n        }\n\n        //封装路由信息\n\n    }, {\n        key: 'getMenuPath',\n        value: function getMenuPath(menuConfig) {\n            if (menuConfig && menuConfig.length > 0) {\n                var _iteratorNormalCompletion2 = true;\n                var _didIteratorError2 = false;\n                var _iteratorError2 = undefined;\n\n                try {\n                    for (var _iterator2 = (0, _getIterator3.default)(menuConfig), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n                        var oneMenu = _step2.value;\n                        //遍历所有一级路由\n                        if (oneMenu.children) {\n                            //如果存在子路由，则拼接路由路径\n                            var _iteratorNormalCompletion3 = true;\n                            var _didIteratorError3 = false;\n                            var _iteratorError3 = undefined;\n\n                            try {\n                                for (var _iterator3 = (0, _getIterator3.default)(oneMenu.children), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {\n                                    var twoMuen = _step3.value;\n\n                                    twoMuen.path = '/manage/' + oneMenu.path + \"/\" + twoMuen.path;\n                                }\n                            } catch (err) {\n                                _didIteratorError3 = true;\n                                _iteratorError3 = err;\n                            } finally {\n                                try {\n                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {\n                                        _iterator3.return();\n                                    }\n                                } finally {\n                                    if (_didIteratorError3) {\n                                        throw _iteratorError3;\n                                    }\n                                }\n                            }\n                        }\n                    }\n                } catch (err) {\n                    _didIteratorError2 = true;\n                    _iteratorError2 = err;\n                } finally {\n                    try {\n                        if (!_iteratorNormalCompletion2 && _iterator2.return) {\n                            _iterator2.return();\n                        }\n                    } finally {\n                        if (_didIteratorError2) {\n                            throw _iteratorError2;\n                        }\n                    }\n                }\n            }\n            return menuConfig;\n        }\n    }, {\n        key: 'renderTwoMenu',\n        value: function renderTwoMenu(menuList) {\n            var _this2 = this;\n\n            if (menuList && menuList.length > 0) {\n                return menuList.map(function (item, index) {\n                    return _react2.default.createElement(\n                        'div',\n                        { className: _BaseLayout2.default.twoMenu, key: item.path },\n                        _react2.default.createElement(\n                            _router.Link,\n                            { className: _BaseLayout2.default.muenLink,\n                                to: item.path,\n                                onMouseEnter: _this2.moveMuen.bind(_this2, item),\n                                onMouseLeave: _this2.outMuen.bind(_this2, item),\n                                onClick: _this2.activeMenu.bind(_this2, item)\n                            },\n                            _react2.default.createElement(\n                                'div',\n                                { className: item.active || item.hover ? _BaseLayout2.default.twoMenuItem + ' ' + _BaseLayout2.default.active : _BaseLayout2.default.twoMenuItem },\n                                _react2.default.createElement('img', { src: item.active || item.hover ? '/static/img/' + item.icon + '-active.png' : '/static/img/' + item.icon + '.png' }),\n                                _react2.default.createElement(\n                                    'span',\n                                    { className: _BaseLayout2.default.twoMenuTitle },\n                                    item.name\n                                )\n                            )\n                        )\n                    );\n                });\n            }\n            return null;\n        }\n\n        //渲染一级菜单\n\n    }, {\n        key: 'renderOneMenu',\n        value: function renderOneMenu(menuConfig) {\n            var _this3 = this;\n\n            if (menuConfig && menuConfig.length > 0) {\n                return menuConfig.map(function (menu, index) {\n                    return _react2.default.createElement(\n                        'div',\n                        { className: _BaseLayout2.default.oneMenu, key: menu.path + '-' + index },\n                        _react2.default.createElement(\n                            'div',\n                            { className: _BaseLayout2.default.oneMenuTitle },\n                            menu.name\n                        ),\n                        _this3.renderTwoMenu(menu.children)\n                    );\n                });\n            }\n            return null;\n        }\n\n        //获取后台路由列表\n\n    }, {\n        key: 'getBaseRouteData',\n        value: function getBaseRouteData(routeData, parentPath) {\n            var baseRouteData = routeData.filter(function (item) {\n                return item.path == parentPath;\n            });\n            var routeList = [];\n            var getRouteList = function getRouteList(baseList) {\n                var _iteratorNormalCompletion4 = true;\n                var _didIteratorError4 = false;\n                var _iteratorError4 = undefined;\n\n                try {\n                    for (var _iterator4 = (0, _getIterator3.default)(baseList), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {\n                        var route = _step4.value;\n\n                        if (route.component) {\n                            routeList.push(route);\n                        }\n                        if (route.children) {\n                            getRouteList(route.children);\n                        }\n                    }\n                } catch (err) {\n                    _didIteratorError4 = true;\n                    _iteratorError4 = err;\n                } finally {\n                    try {\n                        if (!_iteratorNormalCompletion4 && _iterator4.return) {\n                            _iterator4.return();\n                        }\n                    } finally {\n                        if (_didIteratorError4) {\n                            throw _iteratorError4;\n                        }\n                    }\n                }\n            };\n            getRouteList(baseRouteData);\n            return routeList;\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var title = this.props.getTitle(this.state.menuConfig);\n            var routeData = this.getBaseRouteData(this.props.routeData, '/manage');\n            return _react2.default.createElement(\n                _reactDocumentTitle2.default,\n                { title: title },\n                _react2.default.createElement(\n                    'div',\n                    { className: _BaseLayout2.default.baseLayout },\n                    _react2.default.createElement(_Header2.default, null),\n                    _react2.default.createElement(\n                        'div',\n                        { className: _BaseLayout2.default.container },\n                        _react2.default.createElement(\n                            'div',\n                            { className: _BaseLayout2.default.leftMenu },\n                            this.renderOneMenu(this.state.menuConfig)\n                        ),\n                        _react2.default.createElement(\n                            'div',\n                            { className: _BaseLayout2.default.rightContent },\n                            _react2.default.createElement(\n                                _router.Switch,\n                                null,\n                                routeData.map(function (item) {\n                                    return _react2.default.createElement(_router.Route, {\n                                        exact: true,\n                                        key: item.path,\n                                        path: item.path,\n                                        component: item.component\n                                    });\n                                })\n                            )\n                        )\n                    )\n                )\n            );\n        }\n    }]);\n    return BaseLayout;\n}(_react2.default.Component);\n\nexports.default = BaseLayout;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93ZWIvcm91dGVycy9sYXlvdXRzL0Jhc2VMYXlvdXQuanM/N2E1ZSJdLCJuYW1lcyI6WyJCYXNlTGF5b3V0IiwicHJvcHMiLCJzdGF0ZSIsIm1lbnVDb25maWciLCJnZXRNZW51UGF0aCIsInBhdGgiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwibWFjdGhNZW51IiwibmV4dFByb3BzIiwibG9jYXRpb25QYXRoIiwib2xkUGF0aCIsIm9uZU1lbnVQYXRoIiwic3BsaXQiLCJvbmVNZW51IiwiZmluZCIsIml0ZW0iLCJjaGlsZHJlbiIsImxlbmd0aCIsImFjdGl2ZU1lbnUiLCJmaWx0ZXIiLCJpbmRleE9mIiwidHdvTWVudSIsIm1lbnUiLCJob3ZlciIsInNldFN0YXRlIiwibWVudUxpc3QiLCJzZWxlY3RNZW51IiwiY3VycmVudE1lbnUiLCJhY3RpdmUiLCJ0d29NdWVuIiwibWFwIiwiaW5kZXgiLCJzdHlsZXMiLCJtdWVuTGluayIsIm1vdmVNdWVuIiwiYmluZCIsIm91dE11ZW4iLCJ0d29NZW51SXRlbSIsImljb24iLCJ0d29NZW51VGl0bGUiLCJuYW1lIiwib25lTWVudVRpdGxlIiwicmVuZGVyVHdvTWVudSIsInJvdXRlRGF0YSIsInBhcmVudFBhdGgiLCJiYXNlUm91dGVEYXRhIiwicm91dGVMaXN0IiwiZ2V0Um91dGVMaXN0IiwiYmFzZUxpc3QiLCJyb3V0ZSIsImNvbXBvbmVudCIsInB1c2giLCJ0aXRsZSIsImdldFRpdGxlIiwiZ2V0QmFzZVJvdXRlRGF0YSIsImJhc2VMYXlvdXQiLCJjb250YWluZXIiLCJsZWZ0TWVudSIsInJlbmRlck9uZU1lbnUiLCJyaWdodENvbnRlbnQiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJB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QixZQUF2QjtBQUVRO0FBQUMsOENBQUQ7QUFBQTtBQUVRaEIsMENBQVViLEdBQVYsQ0FBYztBQUFBLDJDQUNWLDhCQUFDLGFBQUQ7QUFDSSwrQ0FBTyxJQURYO0FBRUksNkNBQUtmLEtBQUtYLElBRmQ7QUFHSSw4Q0FBTVcsS0FBS1gsSUFIZjtBQUlJLG1EQUFXVyxLQUFLbUM7QUFKcEIsc0NBRFU7QUFBQSxpQ0FBZDtBQUZSO0FBRlI7QUFKSjtBQUZKO0FBREosYUFESjtBQTRCSDs7O0VBbExtQ1UsZ0JBQU1DLFM7O2tCQUF6QjlELFUiLCJmaWxlIjoiODM0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ2R2YSc7XHJcbmltcG9ydCBSZWFjdERvY3VtZW50VGl0bGUgZnJvbSAncmVhY3QtZG9jdW1lbnQtdGl0bGUnO1xyXG5pbXBvcnQgeyBMaW5rLCBSb3V0ZSwgU3dpdGNoLCByb3V0ZXJSZWR1eCB9IGZyb20gJ2R2YS9yb3V0ZXInO1xyXG5pbXBvcnQgZHluYW1pYyBmcm9tICdkdmEvZHluYW1pYyc7XHJcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi4vY29tbW9uL2hlYWRlci9IZWFkZXInO1xyXG5pbXBvcnQgbWVudUNvbmZpZyBmcm9tICcuLi8uLi9tZW51Q29uZmlnJztcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0Jhc2VMYXlvdXQubGVzcyc7XHJcbmltcG9ydCBDdXN0b21lcnMgZnJvbSAnLi4vY3VzdG9tZXJzL0N1c3RvbWVycydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgbWVudUNvbmZpZzogdGhpcy5nZXRNZW51UGF0aChtZW51Q29uZmlnKSB8fCBbXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBsZXQgcGF0aCA9IHRoaXMucHJvcHMubG9jYXRpb24ucGF0aG5hbWU7XHJcbiAgICAgICAgdGhpcy5tYWN0aE1lbnUocGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgICAgICBsZXQgbG9jYXRpb25QYXRoID0gbmV4dFByb3BzLmxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgICAgIGxldCBvbGRQYXRoID0gdGhpcy5wcm9wcy5sb2NhdGlvbi5wYXRobmFtZTtcclxuICAgICAgICBpZiAob2xkUGF0aCAhPSBsb2NhdGlvblBhdGgpIHtcclxuICAgICAgICAgICAgdGhpcy5tYWN0aE1lbnUobG9jYXRpb25QYXRoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/ljLnphY3kuIDkuKroj5zljZVcclxuICAgIG1hY3RoTWVudShwYXRoKSB7XHJcbiAgICAgICAgbGV0IG1lbnVDb25maWcgPSB0aGlzLnN0YXRlLm1lbnVDb25maWc7XHJcbiAgICAgICAgbGV0IG9uZU1lbnVQYXRoID0gcGF0aC5zcGxpdCgnLycpWzJdO1xyXG4gICAgICAgIGlmIChvbmVNZW51UGF0aCkge1xyXG4gICAgICAgICAgICBsZXQgb25lTWVudSA9IG1lbnVDb25maWcuZmluZChpdGVtID0+IGl0ZW0ucGF0aCA9PSBvbmVNZW51UGF0aCk7XHJcbiAgICAgICAgICAgIGlmIChvbmVNZW51ICYmIG9uZU1lbnUuY2hpbGRyZW4gJiYgb25lTWVudS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZlTWVudSA9IG9uZU1lbnUuY2hpbGRyZW4uZmlsdGVyKHR3b01lbnUgPT4gcGF0aC5pbmRleE9mKHR3b01lbnUucGF0aCkgPiAtMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZU1lbnUoYWN0aXZlTWVudVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/pvKDmoIfnp7vlhaVcclxuICAgIG1vdmVNdWVuKG1lbnUpIHtcclxuICAgICAgICBtZW51LmhvdmVyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgbWVudUNvbmZpZzogdGhpcy5zdGF0ZS5tZW51Q29uZmlnXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+m8oOagh+enu+WHulxyXG4gICAgb3V0TXVlbihtZW51KSB7XHJcbiAgICAgICAgbWVudS5ob3ZlciA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBtZW51Q29uZmlnOiB0aGlzLnN0YXRlLm1lbnVDb25maWdcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v6YCJ5Lit6I+c5Y2VXHJcbiAgICBhY3RpdmVNZW51KG1lbnUpIHtcclxuICAgICAgICBsZXQgbWVudUNvbmZpZyA9IHRoaXMuc3RhdGUubWVudUNvbmZpZztcclxuICAgICAgICBjb25zdCBtZW51TGlzdCA9IHRoaXMuc2VsZWN0TWVudShtZW51Q29uZmlnLCBtZW51KTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgbWVudUNvbmZpZzogbWVudUxpc3RcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v6YCJ5Lit5LiA5Liq6IqC54K5XHJcbiAgICBzZWxlY3RNZW51KG1lbnVMaXN0LCBjdXJyZW50TWVudSkge1xyXG4gICAgICAgIGlmIChtZW51TGlzdCAmJiBtZW51TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgbWVudUxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLnBhdGggPT0gY3VycmVudE1lbnUucGF0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RNZW51KGl0ZW0uY2hpbGRyZW4sIGN1cnJlbnRNZW51KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lbnVMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bCB6KOF6Lev55Sx5L+h5oGvXHJcbiAgICBnZXRNZW51UGF0aChtZW51Q29uZmlnKSB7XHJcbiAgICAgICAgaWYgKG1lbnVDb25maWcgJiYgbWVudUNvbmZpZy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG9uZU1lbnUgb2YgbWVudUNvbmZpZykgey8v6YGN5Y6G5omA5pyJ5LiA57qn6Lev55SxXHJcbiAgICAgICAgICAgICAgICBpZiAob25lTWVudS5jaGlsZHJlbikgey8v5aaC5p6c5a2Y5Zyo5a2Q6Lev55Sx77yM5YiZ5ou85o6l6Lev55Sx6Lev5b6EXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdHdvTXVlbiBvZiBvbmVNZW51LmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR3b011ZW4ucGF0aCA9ICcvbWFuYWdlLycgKyBvbmVNZW51LnBhdGggKyBcIi9cIiArIHR3b011ZW4ucGF0aDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lbnVDb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyVHdvTWVudShtZW51TGlzdCkge1xyXG4gICAgICAgIGlmIChtZW51TGlzdCAmJiBtZW51TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtZW51TGlzdC5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudHdvTWVudX0ga2V5PXtpdGVtLnBhdGh9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TGluayBjbGFzc05hbWU9e3N0eWxlcy5tdWVuTGlua31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvPXtpdGVtLnBhdGh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9e3RoaXMubW92ZU11ZW4uYmluZCh0aGlzLCBpdGVtKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17dGhpcy5vdXRNdWVuLmJpbmQodGhpcywgaXRlbSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmFjdGl2ZU1lbnUuYmluZCh0aGlzLCBpdGVtKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyhpdGVtLmFjdGl2ZSB8fCBpdGVtLmhvdmVyKSA/IGAke3N0eWxlcy50d29NZW51SXRlbX0gJHtzdHlsZXMuYWN0aXZlfWAgOiBzdHlsZXMudHdvTWVudUl0ZW19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXsoaXRlbS5hY3RpdmUgfHwgaXRlbS5ob3ZlcikgPyBgL3N0YXRpYy9pbWcvJHtpdGVtLmljb259LWFjdGl2ZS5wbmdgIDogYC9zdGF0aWMvaW1nLyR7aXRlbS5pY29ufS5wbmdgfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLnR3b01lbnVUaXRsZX0+e2l0ZW0ubmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+a4suafk+S4gOe6p+iPnOWNlVxyXG4gICAgcmVuZGVyT25lTWVudShtZW51Q29uZmlnKSB7XHJcbiAgICAgICAgaWYgKG1lbnVDb25maWcgJiYgbWVudUNvbmZpZy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtZW51Q29uZmlnLm1hcCgobWVudSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5vbmVNZW51fSBrZXk9e2Ake21lbnUucGF0aH0tJHtpbmRleH1gfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5vbmVNZW51VGl0bGV9PnttZW51Lm5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclR3b01lbnUobWVudS5jaGlsZHJlbil9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5ZCO5Y+w6Lev55Sx5YiX6KGoXHJcbiAgICBnZXRCYXNlUm91dGVEYXRhKHJvdXRlRGF0YSwgcGFyZW50UGF0aCkge1xyXG4gICAgICAgIGNvbnN0IGJhc2VSb3V0ZURhdGEgPSByb3V0ZURhdGEuZmlsdGVyKGl0ZW0gPT4gaXRlbS5wYXRoID09IHBhcmVudFBhdGgpO1xyXG4gICAgICAgIGxldCByb3V0ZUxpc3QgPSBbXTtcclxuICAgICAgICBjb25zdCBnZXRSb3V0ZUxpc3QgPSAoYmFzZUxpc3QpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcm91dGUgb2YgYmFzZUxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyb3V0ZS5jb21wb25lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICByb3V0ZUxpc3QucHVzaChyb3V0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocm91dGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXRSb3V0ZUxpc3Qocm91dGUuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldFJvdXRlTGlzdChiYXNlUm91dGVEYXRhKTtcclxuICAgICAgICByZXR1cm4gcm91dGVMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB0aXRsZSA9IHRoaXMucHJvcHMuZ2V0VGl0bGUodGhpcy5zdGF0ZS5tZW51Q29uZmlnKTtcclxuICAgICAgICBjb25zdCByb3V0ZURhdGEgPSB0aGlzLmdldEJhc2VSb3V0ZURhdGEodGhpcy5wcm9wcy5yb3V0ZURhdGEsICcvbWFuYWdlJyk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFJlYWN0RG9jdW1lbnRUaXRsZSB0aXRsZT17dGl0bGV9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5iYXNlTGF5b3V0fT5cclxuICAgICAgICAgICAgICAgICAgICA8SGVhZGVyLz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRhaW5lcn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubGVmdE1lbnV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyT25lTWVudSh0aGlzLnN0YXRlLm1lbnVDb25maWcpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5yaWdodENvbnRlbnR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTd2l0Y2g+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlRGF0YS5tYXAoaXRlbSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJvdXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4YWN0PXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0ucGF0aH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aD17aXRlbS5wYXRofVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ9e2l0ZW0uY29tcG9uZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1JvdXRlPikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1N3aXRjaD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9SZWFjdERvY3VtZW50VGl0bGU+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL3JvdXRlcnMvbGF5b3V0cy9CYXNlTGF5b3V0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///834\n");

/***/ })

})
webpackHotUpdate(3,{

/***/ 568:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _extends2 = __webpack_require__(231);\n\nvar _extends3 = _interopRequireDefault(_extends2);\n\nvar _getIterator2 = __webpack_require__(201);\n\nvar _getIterator3 = _interopRequireDefault(_getIterator2);\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _router = __webpack_require__(51);\n\nvar _routerConfig = __webpack_require__(602);\n\nvar _routerConfig2 = _interopRequireDefault(_routerConfig);\n\nvar _dynamic = __webpack_require__(386);\n\nvar _dynamic2 = _interopRequireDefault(_dynamic);\n\nvar _HomePage = __webpack_require__(206);\n\nvar _HomePage2 = _interopRequireDefault(_HomePage);\n\nvar _BaseLayout = __webpack_require__(834);\n\nvar _BaseLayout2 = _interopRequireDefault(_BaseLayout);\n\nvar _lodash = __webpack_require__(837);\n\nvar _lodash2 = _interopRequireDefault(_lodash);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// wrapper of dynamic\nvar dynamicWrapper = function dynamicWrapper(app, _models, component) {\n    return (0, _dynamic2.default)({\n        app: app,\n        models: function models() {\n            return _models.map(function (m) {\n                return __webpack_require__(839)(\"./\" + m + '.js');\n            });\n        },\n        component: component\n    });\n};\n\n//获取当前路由的name\n\n// import browserHistory from 'history/createBrowserHistory';\nfunction _getTitle(routeData) {\n    var title = '利源-后台管理系统';\n    if (routeData && routeData.length > 0) {\n        var _iteratorNormalCompletion = true;\n        var _didIteratorError = false;\n        var _iteratorError = undefined;\n\n        try {\n            for (var _iterator = (0, _getIterator3.default)(routeData), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n                var route = _step.value;\n\n                if (matchPath(route.path, location.pathname)) {\n                    title = route.name;\n                }\n            }\n        } catch (err) {\n            _didIteratorError = true;\n            _iteratorError = err;\n        } finally {\n            try {\n                if (!_iteratorNormalCompletion && _iterator.return) {\n                    _iterator.return();\n                }\n            } finally {\n                if (_didIteratorError) {\n                    throw _iteratorError;\n                }\n            }\n        }\n    }\n    return title;\n}\n\n//匹配路由和当前路径是否相同\nvar matchPath = function matchPath(path, url) {\n    var pathList = path.split(\"/\");\n    var urlList = url.split(\"/\");\n    var flag = true;\n    if (pathList.length != urlList.length) {\n        //路由长度不相同，直接返回\n        return false;\n    }\n    for (var i = 0; i < pathList.length; i++) {\n        //跳过通配符的匹配\n        if (pathList[i].indexOf(\":\") > -1 || pathList[i].indexOf(\"*\") > -1 || pathList[i].indexOf(\"(\") > -1) {\n            continue;\n        } else {\n            if (urlList[i] != pathList[i]) {\n                flag = false;\n                break;\n            }\n        }\n    }\n    return flag;\n};\n\n//封装路由信息\nfunction getRouteData(rootRouter, app) {\n    if (rootRouter && rootRouter.length > 0) {\n        var _iteratorNormalCompletion2 = true;\n        var _didIteratorError2 = false;\n        var _iteratorError2 = undefined;\n\n        try {\n            for (var _iterator2 = (0, _getIterator3.default)(rootRouter), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n                var oneRoute = _step2.value;\n                //遍历所有一级路由\n                //封装路由组件\n                if (oneRoute.component) {\n                    oneRoute.component = dynamicWrapper(app, oneRoute.model, oneRoute.component);\n                }\n                if (oneRoute.children) {\n                    //如果存在子路由，则拼接路由路径\n                    var _iteratorNormalCompletion3 = true;\n                    var _didIteratorError3 = false;\n                    var _iteratorError3 = undefined;\n\n                    try {\n                        for (var _iterator3 = (0, _getIterator3.default)(oneRoute.children), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {\n                            var twoRoute = _step3.value;\n\n                            twoRoute.path = oneRoute.path + \"/\" + twoRoute.path;\n                        }\n                    } catch (err) {\n                        _didIteratorError3 = true;\n                        _iteratorError3 = err;\n                    } finally {\n                        try {\n                            if (!_iteratorNormalCompletion3 && _iterator3.return) {\n                                _iterator3.return();\n                            }\n                        } finally {\n                            if (_didIteratorError3) {\n                                throw _iteratorError3;\n                            }\n                        }\n                    }\n\n                    getRouteData(oneRoute.children, app);\n                }\n            }\n        } catch (err) {\n            _didIteratorError2 = true;\n            _iteratorError2 = err;\n        } finally {\n            try {\n                if (!_iteratorNormalCompletion2 && _iterator2.return) {\n                    _iterator2.return();\n                }\n            } finally {\n                if (_didIteratorError2) {\n                    throw _iteratorError2;\n                }\n            }\n        }\n    }\n    return rootRouter;\n}\n\nfunction getRouteRender(_ref) {\n    var history = _ref.history,\n        app = _ref.app;\n\n    var routerConfig = (0, _lodash2.default)(_routerConfig2.default);\n    var routeData = getRouteData(routerConfig, app);\n    var title = _getTitle(routeData);\n    var renderProps = {\n        app: app,\n        routeData: routeData,\n        getTitle: function getTitle(data) {\n            return _getTitle(data);\n        },\n        history: history\n    };\n    return _react2.default.createElement(\n        _router.Router,\n        { history: history },\n        _react2.default.createElement(\n            _router.Switch,\n            null,\n            _react2.default.createElement(_router.Route, { path: '/home', render: function render(props) {\n                    return _react2.default.createElement(_HomePage2.default, (0, _extends3.default)({}, props, renderProps));\n                } }),\n            _react2.default.createElement(_router.Route, { path: '/manage', render: function render(props) {\n                    return _react2.default.createElement(_BaseLayout2.default, (0, _extends3.default)({}, props, renderProps));\n                } }),\n            _react2.default.createElement(_router.Route, { path: '/', render: function render(props) {\n                    return _react2.default.createElement(_HomePage2.default, (0, _extends3.default)({}, props, renderProps));\n                } })\n        )\n    );\n}\n\nexports.default = getRouteRender;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93ZWIvcm91dGVyUmVuZGVyLmpzPzgyZTgiXSwibmFtZXMiOlsiZHluYW1pY1dyYXBwZXIiLCJhcHAiLCJtb2RlbHMiLCJjb21wb25lbnQiLCJtYXAiLCJtIiwiZ2V0VGl0bGUiLCJyb3V0ZURhdGEiLCJ0aXRsZSIsImxlbmd0aCIsInJvdXRlIiwibWF0Y2hQYXRoIiwicGF0aCIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJuYW1lIiwidXJsIiwicGF0aExpc3QiLCJzcGxpdCIsInVybExpc3QiLCJmbGFnIiwiaSIsImluZGV4T2YiLCJnZXRSb3V0ZURhdGEiLCJyb290Um91dGVyIiwib25lUm91dGUiLCJtb2RlbCIsImNoaWxkcmVuIiwidHdvUm91dGUiLCJnZXRSb3V0ZVJlbmRlciIsImhpc3RvcnkiLCJyb3V0ZXJDb25maWciLCJSb3V0ZXJDb25maWciLCJyZW5kZXJQcm9wcyIsImRhdGEiLCJwcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUdBO0FBQ0EsSUFBTUEsaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFDQyxHQUFELEVBQU1DLE9BQU4sRUFBY0MsU0FBZDtBQUFBLFdBQTRCLHVCQUFRO0FBQ3ZERixnQkFEdUQ7QUFFdkRDLGdCQUFRO0FBQUEsbUJBQU1BLFFBQU9FLEdBQVAsQ0FBVztBQUFBLHVCQUFLLGdDQUFtQkMsQ0FBbkIsU0FBTDtBQUFBLGFBQVgsQ0FBTjtBQUFBLFNBRitDO0FBR3ZERjtBQUh1RCxLQUFSLENBQTVCO0FBQUEsQ0FBdkI7O0FBTUE7O0FBZkE7QUFnQkEsU0FBU0csU0FBVCxDQUFrQkMsU0FBbEIsRUFBNkI7QUFDekIsUUFBSUMsUUFBUSxXQUFaO0FBQ0EsUUFBSUQsYUFBYUEsVUFBVUUsTUFBVixHQUFtQixDQUFwQyxFQUF1QztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNuQyw0REFBa0JG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aEMsZ0JBRGdCO0FBRWhCTSxtQkFBV0EsU0FGSztBQUdoQkQsa0JBQVUsa0JBQUM0QixJQUFEO0FBQUEsbUJBQVU1QixVQUFTNEIsSUFBVCxDQUFWO0FBQUEsU0FITTtBQUloQkosaUJBQVFBO0FBSlEsS0FBcEI7QUFNQSxXQUNJO0FBQUMsc0JBQUQ7QUFBQSxVQUFRLFNBQVNBLE9BQWpCO0FBQ0k7QUFBQywwQkFBRDtBQUFBO0FBQ0ksMENBQUMsYUFBRCxJQUFPLE1BQU0sT0FBYixFQUFzQixRQUFRLGdCQUFDSyxLQUFEO0FBQUEsMkJBQVcsOEJBQUMsa0JBQUQsNkJBQWNBLEtBQWQsRUFBeUJGLFdBQXpCLEVBQVg7QUFBQSxpQkFBOUIsR0FESjtBQUVJLDBDQUFDLGFBQUQsSUFBTyxNQUFNLFNBQWIsRUFBd0IsUUFBUSxnQkFBQ0UsS0FBRDtBQUFBLDJCQUFXLDhCQUFDLG9CQUFELDZCQUFnQkEsS0FBaEIsRUFBMkJGLFdBQTNCLEVBQVg7QUFBQSxpQkFBaEMsR0FGSjtBQUdJLDBDQUFDLGFBQUQsSUFBTyxNQUFNLEdBQWIsRUFBa0IsUUFBUSxnQkFBQ0UsS0FBRDtBQUFBLDJCQUFXLDhCQUFDLGtCQUFELDZCQUFjQSxLQUFkLEVBQXlCRixXQUF6QixFQUFYO0FBQUEsaUJBQTFCO0FBSEo7QUFESixLQURKO0FBU0g7O2tCQUVjSixjIiwiZmlsZSI6IjU2OC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdXRlciwgUm91dGUsIFN3aXRjaCwgcm91dGVyUmVkdXgsIEluZGV4Um91dGUgfSBmcm9tICdkdmEvcm91dGVyJztcclxuLy8gaW1wb3J0IGJyb3dzZXJIaXN0b3J5IGZyb20gJ2hpc3RvcnkvY3JlYXRlQnJvd3Nlckhpc3RvcnknO1xyXG5pbXBvcnQgUm91dGVyQ29uZmlnIGZyb20gJy4vcm91dGVyQ29uZmlnJztcclxuaW1wb3J0IGR5bmFtaWMgZnJvbSAnZHZhL2R5bmFtaWMnO1xyXG5pbXBvcnQgSG9tZVBhZ2UgZnJvbSAnLi9yb3V0ZXJzL2hvbWUvSG9tZVBhZ2UnO1xyXG5pbXBvcnQgQmFzZUxheW91dCBmcm9tICcuL3JvdXRlcnMvbGF5b3V0cy9CYXNlTGF5b3V0JztcclxuaW1wb3J0IGNsb25lRGVlcCBmcm9tICdsb2Rhc2guY2xvbmVEZWVwJztcclxuXHJcblxyXG4vLyB3cmFwcGVyIG9mIGR5bmFtaWNcclxuY29uc3QgZHluYW1pY1dyYXBwZXIgPSAoYXBwLCBtb2RlbHMsIGNvbXBvbmVudCkgPT4gZHluYW1pYyh7XHJcbiAgICBhcHAsXHJcbiAgICBtb2RlbHM6ICgpID0+IG1vZGVscy5tYXAobSA9PiBpbXBvcnQoYC4vbW9kZWxzLyR7bX0uanNgKSksXHJcbiAgICBjb21wb25lbnRcclxufSk7XHJcblxyXG4vL+iOt+WPluW9k+WJjei3r+eUseeahG5hbWVcclxuZnVuY3Rpb24gZ2V0VGl0bGUocm91dGVEYXRhKSB7XHJcbiAgICBsZXQgdGl0bGUgPSAn5Yip5rqQLeWQjuWPsOeuoeeQhuezu+e7nyc7XHJcbiAgICBpZiAocm91dGVEYXRhICYmIHJvdXRlRGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgZm9yIChsZXQgcm91dGUgb2Ygcm91dGVEYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChtYXRjaFBhdGgocm91dGUucGF0aCwgbG9jYXRpb24ucGF0aG5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZSA9IHJvdXRlLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGl0bGU7XHJcbn1cclxuXHJcbi8v5Yy56YWN6Lev55Sx5ZKM5b2T5YmN6Lev5b6E5piv5ZCm55u45ZCMXHJcbmNvbnN0IG1hdGNoUGF0aCA9IChwYXRoLCB1cmwpID0+IHtcclxuICAgIGxldCBwYXRoTGlzdCA9IHBhdGguc3BsaXQoXCIvXCIpO1xyXG4gICAgbGV0IHVybExpc3QgPSB1cmwuc3BsaXQoXCIvXCIpXHJcbiAgICBsZXQgZmxhZyA9IHRydWU7XHJcbiAgICBpZiAocGF0aExpc3QubGVuZ3RoICE9IHVybExpc3QubGVuZ3RoKSB7Ly/ot6/nlLHplb/luqbkuI3nm7jlkIzvvIznm7TmjqXov5Tlm55cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhMaXN0Lmxlbmd0aDsgaSsrKSB7Ly/ot7Pov4fpgJrphY3nrKbnmoTljLnphY1cclxuICAgICAgICBpZiAocGF0aExpc3RbaV0uaW5kZXhPZihcIjpcIikgPiAtMSB8fCBwYXRoTGlzdFtpXS5pbmRleE9mKFwiKlwiKSA+IC0xIHx8IHBhdGhMaXN0W2ldLmluZGV4T2YoXCIoXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHVybExpc3RbaV0gIT0gcGF0aExpc3RbaV0pIHtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZsYWc7XHJcbn1cclxuXHJcbi8v5bCB6KOF6Lev55Sx5L+h5oGvXHJcbmZ1bmN0aW9uIGdldFJvdXRlRGF0YShyb290Um91dGVyLCBhcHApIHtcclxuICAgIGlmIChyb290Um91dGVyICYmIHJvb3RSb3V0ZXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGZvciAobGV0IG9uZVJvdXRlIG9mIHJvb3RSb3V0ZXIpIHsvL+mBjeWOhuaJgOacieS4gOe6p+i3r+eUsVxyXG4gICAgICAgICAgICAvL+Wwgeijhei3r+eUsee7hOS7tlxyXG4gICAgICAgICAgICBpZiAob25lUm91dGUuY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgICAgICBvbmVSb3V0ZS5jb21wb25lbnQgPSBkeW5hbWljV3JhcHBlcihhcHAsIG9uZVJvdXRlLm1vZGVsLCBvbmVSb3V0ZS5jb21wb25lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvbmVSb3V0ZS5jaGlsZHJlbikgey8v5aaC5p6c5a2Y5Zyo5a2Q6Lev55Sx77yM5YiZ5ou85o6l6Lev55Sx6Lev5b6EXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB0d29Sb3V0ZSBvZiBvbmVSb3V0ZS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHR3b1JvdXRlLnBhdGggPSBvbmVSb3V0ZS5wYXRoICsgXCIvXCIgKyB0d29Sb3V0ZS5wYXRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2V0Um91dGVEYXRhKG9uZVJvdXRlLmNoaWxkcmVuLCBhcHApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJvb3RSb3V0ZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFJvdXRlUmVuZGVyKHsgaGlzdG9yeSwgYXBwIH0pIHtcclxuICAgIGNvbnN0IHJvdXRlckNvbmZpZyA9IGNsb25lRGVlcChSb3V0ZXJDb25maWcpO1xyXG4gICAgY29uc3Qgcm91dGVEYXRhID0gZ2V0Um91dGVEYXRhKHJvdXRlckNvbmZpZywgYXBwKTtcclxuICAgIGNvbnN0IHRpdGxlID0gZ2V0VGl0bGUocm91dGVEYXRhKTtcclxuICAgIGNvbnN0IHJlbmRlclByb3BzID0ge1xyXG4gICAgICAgIGFwcCxcclxuICAgICAgICByb3V0ZURhdGE6IHJvdXRlRGF0YSxcclxuICAgICAgICBnZXRUaXRsZTogKGRhdGEpID0+IGdldFRpdGxlKGRhdGEpLFxyXG4gICAgICAgIGhpc3Rvcnk6aGlzdG9yeVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Um91dGVyIGhpc3Rvcnk9e2hpc3Rvcnl9PlxyXG4gICAgICAgICAgICA8U3dpdGNoPlxyXG4gICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9eycvaG9tZSd9IHJlbmRlcj17KHByb3BzKSA9PiA8SG9tZVBhZ2Ugey4uLnByb3BzfSB7Li4ucmVuZGVyUHJvcHN9IC8+fSAvPlxyXG4gICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9eycvbWFuYWdlJ30gcmVuZGVyPXsocHJvcHMpID0+IDxCYXNlTGF5b3V0IHsuLi5wcm9wc30gey4uLnJlbmRlclByb3BzfSAvPn0gLz5cclxuICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPXsnLyd9IHJlbmRlcj17KHByb3BzKSA9PiA8SG9tZVBhZ2Ugey4uLnByb3BzfSB7Li4ucmVuZGVyUHJvcHN9IC8+fSAvPlxyXG4gICAgICAgICAgICA8L1N3aXRjaD5cclxuICAgICAgICA8L1JvdXRlcj5cclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdldFJvdXRlUmVuZGVyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9yb3V0ZXJSZW5kZXIuanMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///568\n");

/***/ })

})
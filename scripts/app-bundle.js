define('app',["require", "exports", "react", "./datagrid/SortDirection", "./store"], function (require, exports, React, SortDirection_1, store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App(people, gridHeaders, gridSorting) {
            this.people = people;
            this.gridHeaders = gridHeaders;
            this.gridSorting = gridSorting;
            this.store = store_1.store;
            var peopleMapped = [
                { id: 1, name: 'Danilo', email: 'danilo@beakyn.com' },
                { id: 2, name: 'Abraao', email: 'abraao@beakyn.com' },
                { id: 3, name: 'Ricardo', email: 'ricardo@beakyn.com' },
                { id: 4, name: 'Juan', email: 'juan@beakyn.com' }
            ];
            this.people = peopleMapped.map(function (p) { return ({
                id: p.id,
                name: p.name,
                email: React.createElement("a", { href: "mailto:" + p.email }, p.email)
            }); });
            this.gridHeaders = [
                {
                    key: 'name',
                    render: 'Name'
                },
                {
                    key: 'email',
                    render: React.createElement("strong", { style: { color: 'red', textTransform: 'uppercase' } }, "Name")
                }
            ];
            this.gridSorting = {
                columnKey: 'name',
                direction: SortDirection_1.SortDirection.Asc
            };
            var state = this.store.getState();
            console.log(state.datagrid);
            this.store.subscribe(this.update.bind(this));
        }
        App.prototype.update = function () {
            var state = this.store.getState();
            console.log(state.datagrid);
        };
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('store',["require", "exports", "redux", "./datagrid/reducers"], function (require, exports, redux_1, reducers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var reducers = redux_1.combineReducers({
        datagrid: reducers_1.datagrid
    });
    exports.store = redux_1.createStore(reducers);
});

define('datagrid/actions',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SORT = 'datagrid.components.actions.SORT';
    exports.sortByColumnName = function (columnKey) { return ({
        type: exports.SORT,
        columnKey: columnKey
    }); };
});

define('datagrid/reducers',["require", "exports", "./actions", "./SortDirection"], function (require, exports, actions_1, SortDirection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var initialState = {
        sortColumnKey: 'updatedAt',
        sortDirection: SortDirection_1.SortDirection.Asc
    };
    exports.datagrid = function (state, action) {
        if (state === void 0) { state = initialState; }
        switch (action.type) {
            case actions_1.SORT:
                var sortDirection = state.sortColumnKey === action.columnKey
                    ? (state.sortDirection === SortDirection_1.SortDirection.Asc ? SortDirection_1.SortDirection.Desc : SortDirection_1.SortDirection.Asc)
                    : SortDirection_1.SortDirection.Asc;
                return Object.assign({}, state, {
                    sortColumnKey: action.columnKey,
                    sortDirection: sortDirection
                });
            default:
                return state;
        }
    };
});

define('datagrid/SortDirection',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SortDirection;
    (function (SortDirection) {
        SortDirection[SortDirection["Asc"] = 0] = "Asc";
        SortDirection[SortDirection["Desc"] = 1] = "Desc";
    })(SortDirection = exports.SortDirection || (exports.SortDirection = {}));
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('datagrid/datagrid',["require", "exports", "react", "react-dom", "aurelia-framework", "./components/Datagrid", "./actions", "./../store"], function (require, exports, React, ReactDOM, aurelia_framework_1, Datagrid_1, actions_1, store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DatagridCustomElement = (function () {
        function DatagridCustomElement(element) {
            var _this = this;
            this.element = element;
            this.store = store_1.store;
            this.sort = function (column) {
                _this.store.dispatch(actions_1.sortByColumnName(column));
            };
            this.element = element;
            var state = this.store.getState();
            this.sorting = this.sorting || {
                columnKey: state.datagrid.sortColumnKey,
                direction: state.datagrid.sortDirection
            };
        }
        DatagridCustomElement.prototype.render = function () {
            ReactDOM.render(React.createElement(Datagrid_1.Datagrid, { data: this.data, headers: this.headers, sorting: this.sorting, onSort: this.sort }), this.element);
        };
        DatagridCustomElement.prototype.bind = function () {
            this.render();
        };
        DatagridCustomElement.prototype.dataChanged = function (newVal) {
            this.bind();
        };
        return DatagridCustomElement;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Array)
    ], DatagridCustomElement.prototype, "data", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Array)
    ], DatagridCustomElement.prototype, "headers", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], DatagridCustomElement.prototype, "sorting", void 0);
    DatagridCustomElement = __decorate([
        aurelia_framework_1.noView(),
        aurelia_framework_1.inject(Element),
        __metadata("design:paramtypes", [Element])
    ], DatagridCustomElement);
    exports.DatagridCustomElement = DatagridCustomElement;
});

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('datagrid/components/Datagrid',["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Datagrid = (function (_super) {
        __extends(Datagrid, _super);
        function Datagrid(props) {
            var _this = _super.call(this, props) || this;
            _this.dataPropertiesForRenderTableCells = _this.props.headers.map(function (c) { return c.key; });
            return _this;
        }
        Datagrid.prototype.render = function () {
            if (!this.props.data.length) {
                return null;
            }
            return (React.createElement("div", null,
                React.createElement("table", null,
                    React.createElement("thead", null, this.renderHeaders()),
                    React.createElement("tbody", null, this.renderBody()))));
        };
        Datagrid.prototype.renderHeaders = function () {
            var _a = this.props, headers = _a.headers, onSort = _a.onSort;
            return headers.map(function (c, index) {
                return (React.createElement("th", { key: index, onClick: function () { return onSort(c.key); } }, c.render));
            });
        };
        Datagrid.prototype.renderBody = function () {
            var _this = this;
            var _a = this.props, headers = _a.headers, data = _a.data;
            return data.map(function (d, index) {
                return React.createElement("tr", { key: index }, _this.renderCells(d));
            });
        };
        Datagrid.prototype.renderCells = function (data) {
            return this.dataPropertiesForRenderTableCells.map(function (property, index) {
                return React.createElement("td", { key: index }, data[property]);
            });
        };
        return Datagrid;
    }(React.Component));
    Datagrid.defaultProperties = {
        data: []
    };
    exports.Datagrid = Datagrid;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./datagrid/datagrid\"></require><datagrid data.bind=\"people\" headers.bind=\"gridHeaders\" sorting.bind=\"gridSorting\"></datagrid></template>"; });
//# sourceMappingURL=app-bundle.js.map
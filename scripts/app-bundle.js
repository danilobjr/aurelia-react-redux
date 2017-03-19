define('app',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App(people, gridConfig) {
            this.people = people;
            this.gridConfig = gridConfig;
            this.people = [
                { id: 1, name: 'Danilo', email: 'danilo@beakyn.com' },
                { id: 2, name: 'Abraao', email: 'abraao@beakyn.com' },
                { id: 3, name: 'Ricardo', email: 'ricardo@beakyn.com' },
                { id: 4, name: 'Juan', email: 'juan@beakyn.com' }
            ];
            this.gridConfig = [
                {
                    key: 'name',
                    name: 'Name'
                },
                {
                    key: 'email',
                    name: 'Email'
                }
            ];
        }
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
define('bkn-datagrid/bkn-datagrid',["require", "exports", "react", "react-dom", "aurelia-framework", "./components/BknDatagrid"], function (require, exports, React, ReactDOM, aurelia_framework_1, BknDatagrid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BknDatagridCustomElement = (function () {
        function BknDatagridCustomElement(element) {
            this.element = element;
        }
        BknDatagridCustomElement.prototype.render = function () {
            ReactDOM.render(React.createElement(BknDatagrid_1.BknDatagrid, { data: this.data, config: this.config }), this.element);
        };
        BknDatagridCustomElement.prototype.bind = function () {
            this.render();
        };
        BknDatagridCustomElement.prototype.dataChanged = function (newVal) {
            this.bind();
        };
        return BknDatagridCustomElement;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Array)
    ], BknDatagridCustomElement.prototype, "data", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Array)
    ], BknDatagridCustomElement.prototype, "config", void 0);
    BknDatagridCustomElement = __decorate([
        aurelia_framework_1.noView(),
        aurelia_framework_1.inject(Element),
        __metadata("design:paramtypes", [Element])
    ], BknDatagridCustomElement);
    exports.BknDatagridCustomElement = BknDatagridCustomElement;
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
define('bkn-datagrid/components/BknDatagrid',["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BknDatagrid = (function (_super) {
        __extends(BknDatagrid, _super);
        function BknDatagrid(props) {
            var _this = _super.call(this, props) || this;
            _this.dataPropertiesForRenderTableCells = _this.props.config.map(function (c) { return c.key; });
            return _this;
        }
        BknDatagrid.prototype.render = function () {
            if (!this.props.data.length) {
                return null;
            }
            return (React.createElement("div", null,
                React.createElement("table", null,
                    React.createElement("thead", null, this.renderHeaders()),
                    React.createElement("tbody", null, this.renderBody()))));
        };
        BknDatagrid.prototype.renderHeaders = function () {
            return this.props.config.map(function (c, index) {
                return React.createElement("th", { key: index }, c.name);
            });
        };
        BknDatagrid.prototype.renderBody = function () {
            var _this = this;
            var _a = this.props, config = _a.config, data = _a.data;
            return data.map(function (d, index) {
                return React.createElement("tr", { key: index }, _this.renderCells(d));
            });
        };
        BknDatagrid.prototype.renderCells = function (data) {
            return this.dataPropertiesForRenderTableCells.map(function (property, index) {
                return React.createElement("td", { key: index }, data[property]);
            });
        };
        return BknDatagrid;
    }(React.Component));
    BknDatagrid.defaultProperties = {
        data: []
    };
    exports.BknDatagrid = BknDatagrid;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./bkn-datagrid/bkn-datagrid\"></require><bkn-datagrid data.bind=\"people\" config.bind=\"gridConfig\"></bkn-datagrid></template>"; });
//# sourceMappingURL=app-bundle.js.map
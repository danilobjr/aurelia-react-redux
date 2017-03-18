define('app',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App(people) {
            this.people = people;
            this.people = [
                { id: 1, name: 'Danilo' },
                { id: 2, name: 'Abraao' },
                { id: 3, name: 'Ricardo' },
                { id: 4, name: 'Juan' }
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

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('bkn-datagrid/react-element',["require", "exports", "react", "react-dom", "aurelia-framework", "./components/MyReactElement"], function (require, exports, React, ReactDOM, aurelia_framework_1, MyReactElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ReactElement = (function () {
        function ReactElement(element) {
            this.element = element;
        }
        ReactElement.prototype.render = function () {
            ReactDOM.render(React.createElement(MyReactElement_1.MyReactElement, { data: this.data }), this.element);
        };
        ReactElement.prototype.bind = function () {
            this.render();
        };
        ReactElement.prototype.dataChanged = function (newVal) {
            this.bind();
        };
        return ReactElement;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Array)
    ], ReactElement.prototype, "data", void 0);
    ReactElement = __decorate([
        aurelia_framework_1.noView(),
        aurelia_framework_1.inject(Element),
        aurelia_framework_1.customElement('react-element'),
        __metadata("design:paramtypes", [Element])
    ], ReactElement);
    exports.ReactElement = ReactElement;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
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
define('bkn-datagrid/components/MyReactElement',["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MyReactElement = (function (_super) {
        __extends(MyReactElement, _super);
        function MyReactElement(props) {
            return _super.call(this, props) || this;
        }
        MyReactElement.prototype.render = function () {
            if (!this.props.data.length) {
                return null;
            }
            return (React.createElement("div", null,
                React.createElement("hr", null),
                React.createElement("p", null, "Hello, I am a React component being rendered inside of Aurelia."),
                React.createElement("p", null, "This file is located in: src/components/react-components/my-react-element.jsx and is being included from within src/components/custom-elements/react-element.js"),
                React.createElement("p", null, "Let's loop through any provided data:"),
                React.createElement("ul", null, this.props.data.map(function (item) {
                    return React.createElement("li", { key: item.key },
                        React.createElement("strong", null, item.name));
                }))));
        };
        return MyReactElement;
    }(React.Component));
    MyReactElement.defaultProperties = {
        data: []
    };
    exports.MyReactElement = MyReactElement;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./bkn-datagrid/react-element\"></require><react-element data.bind=\"people\"></react-element></template>"; });
//# sourceMappingURL=app-bundle.js.map
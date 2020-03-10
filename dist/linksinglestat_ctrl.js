'use strict';

System.register(['app/plugins/sdk', '@grafana/data'], function (_export, _context) {
    "use strict";

    var MetricsPanelCtrl, PanelEvents, _createClass, LinkSingleStatCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_appPluginsSdk) {
            MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
        }, function (_grafanaData) {
            PanelEvents = _grafanaData.PanelEvents;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('LinkSingleStatCtrl', LinkSingleStatCtrl = function (_MetricsPanelCtrl) {
                _inherits(LinkSingleStatCtrl, _MetricsPanelCtrl);

                function LinkSingleStatCtrl($scope, $injector) {
                    _classCallCheck(this, LinkSingleStatCtrl);

                    var _this = _possibleConstructorReturn(this, (LinkSingleStatCtrl.__proto__ || Object.getPrototypeOf(LinkSingleStatCtrl)).call(this, $scope, $injector));

                    var panelDefaults = {
                        textTemplate: '',
                        urlTemplate: '',
                        valueFontSize: '80%'
                    };

                    for (var prop in panelDefaults) {
                        if (!(prop in _this.panel)) {
                            _this.panel[prop] = panelDefaults[prop];
                        }
                    }

                    _this.events.on(PanelEvents.editModeInitialized, _this.onInitEditMode.bind(_this));
                    _this.events.on(PanelEvents.dataReceived, _this.onDataReceived.bind(_this));
                    _this.events.on(PanelEvents.panelSizeChanged, _this.adjustFontSize.bind(_this));
                    _this.events.on(PanelEvents.panelInitialized, _this.adjustFontSize.bind(_this));
                    return _this;
                }

                _createClass(LinkSingleStatCtrl, [{
                    key: 'onInitEditMode',
                    value: function onInitEditMode() {
                        this.fontSizes = ['20%', '30%', '50%', '70%', '80%', '100%', '110%', '120%', '150%', '170%', '200%'];
                        this.addEditorTab('Options', 'public/plugins/grafana-linksinglestat-panel/editor.html');
                    }
                }, {
                    key: 'onDataReceived',
                    value: function onDataReceived(dataList) {
                        if (!dataList.length) {
                            return;
                        }

                        var results = dataList[0];

                        if (!results) {
                            return;
                        }

                        var data = results.rows && results.rows[0];

                        // Imitate the "templating" syntax of the table panel plugin
                        this.text = this.panel.textTemplate.replace(/\${__cell_(\d+)}/g, function (match, cellNumber) {
                            return data[cellNumber];
                        });
                        this.url = this.panel.urlTemplate.replace(/\${__cell_(\d+)}/g, function (match, cellNumber) {
                            return data[cellNumber];
                        });
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        this.adjustFontSize();
                    }
                }, {
                    key: 'adjustFontSize',
                    value: function adjustFontSize() {
                        var BASE_FONT_SIZE = 38;
                        this.fontPixelSize = parseInt(this.panel.valueFontSize, 10) / 100 * BASE_FONT_SIZE;
                    }
                }]);

                return LinkSingleStatCtrl;
            }(MetricsPanelCtrl));

            LinkSingleStatCtrl.templateUrl = 'module.html';

            _export('LinkSingleStatCtrl', LinkSingleStatCtrl);
        }
    };
});
//# sourceMappingURL=linksinglestat_ctrl.js.map

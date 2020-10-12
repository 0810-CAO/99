"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _elementUi = require("element-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_elementUi.Button);

_vue["default"].use(_elementUi.Form);

_vue["default"].use(_elementUi.FormItem);

_vue["default"].use(_elementUi.Input);

_vue["default"].use(_elementUi.Container);

_vue["default"].use(_elementUi.Aside);

_vue["default"].use(_elementUi.Main);

_vue["default"].use(_elementUi.Header);

_vue["default"].use(_elementUi.Menu);

_vue["default"].use(_elementUi.Submenu);

_vue["default"].use(_elementUi.MenuItemGroup);

_vue["default"].use(_elementUi.MenuItem);

_vue["default"].use(_elementUi.Breadcrumb);

_vue["default"].use(_elementUi.BreadcrumbItem);

_vue["default"].use(_elementUi.Card);

_vue["default"].use(_elementUi.Row);

_vue["default"].use(_elementUi.Col);

_vue["default"].use(_elementUi.Table);

_vue["default"].use(_elementUi.TableColumn);

_vue["default"].use(_elementUi.Switch);

_vue["default"].use(_elementUi.Pagination);

_vue["default"].use(_elementUi.Tooltip);

_vue["default"].use(_elementUi.Dialog);

_vue["default"].use(_elementUi.Tag);

_vue["default"].use(_elementUi.Tree);

_vue["default"].use(_elementUi.Select);

_vue["default"].use(_elementUi.Option);

_vue["default"].use(_elementUi.Cascader);

_vue["default"].use(_elementUi.Alert);

_vue["default"].use(_elementUi.Tabs);

_vue["default"].use(_elementUi.TabPane);

_vue["default"].use(_elementUi.Steps);

_vue["default"].use(_elementUi.Step);

_vue["default"].use(_elementUi.CheckboxGroup);

_vue["default"].use(_elementUi.Checkbox);

_vue["default"].use(_elementUi.Upload);

_vue["default"].use(_elementUi.Timeline);

_vue["default"].use(_elementUi.TimelineItem); //这样挂载后可以在vue中使用this访问


_vue["default"].prototype.$message = _elementUi.Message;
_vue["default"].prototype.$confirm = _elementUi.MessageBox.confirm;
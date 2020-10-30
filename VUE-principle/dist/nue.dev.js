"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CompilerUtil = {
  getValue: function getValue(vm, value) {
    // time.h--[time,h]
    return value.split('.').reduce(function (data, currentKey) {
      // 1、data-$data currentKey-time
      // 2、data-time currentKey-h
      return data[currentKey.trim()];
    }, vm.$data);
  },
  getContent: function getContent(vm, value) {
    var _this = this;

    var reg = /\{\{(.+?)\}\}/gi;
    var val = value.replace(reg, function () {
      // console.log(args)[{{name}},name,0,{{name}}]
      return _this.getValue(vm, arguments.length <= 1 ? undefined : arguments[1]); //此处是一个循环{{name}}-{{age}}逐个匹配替换
    }); // console.log(val)李华

    return val;
  },
  setValue: function setValue(vm, attr, newValue) {
    attr.split('.').reduce(function (data, currentAttr, index, arr) {
      if (index === arr.length - 1) {
        //最后一层eg:time.h.s
        data[currentAttr] = newValue;
      }

      return data[currentAttr];
    }, vm.$data);
  },
  model: function model(node, value, vm) {
    var _this2 = this;

    // node.value = vm.$data[value] time.h无法解决
    //node-<input type="text" v-model="name" />   value-name
    // 步骤一   在第一次渲染，给所有属性添加观察者
    new Wather(vm, value, function (newValue, oldValue) {
      node.value = newValue;
    });
    var val = this.getValue(vm, value);
    node.value = val; // 界面驱动数据更新

    node.addEventListener('input', function (e) {
      var newValue = e.target.value;

      _this2.setValue(vm, value, newValue);
    });
  },
  html: function html(node, value, vm) {
    new Wather(vm, value, function (newValue, oldValue) {
      node.innerHTML = newValue;
    });
    var val = this.getValue(vm, value);
    node.innerHTML = val;
  },
  text: function text(node, value, vm) {
    new Wather(vm, value, function (newValue, oldValue) {
      node.innerText = newValue;
    });
    var val = this.getValue(vm, value);
    node.innerText = val;
  },
  content: function content(node, value, vm) {
    var _this3 = this;

    // console.log(value) {{name}}->name->$data[name]
    // let val = this.getContent(vm, value)
    var reg = /\{\{(.+?)\}\}/gi;
    var val = value.replace(reg, function () {
      new Wather(vm, arguments.length <= 1 ? undefined : arguments[1], function (newValue, oldValue) {
        node.textContent = _this3.getContent(vm, value); //{{name}}-{{age}}
      });
      return _this3.getValue(vm, arguments.length <= 1 ? undefined : arguments[1]);
    });
    node.textContent = val;
  },
  // 事件
  on: function on(node, value, vm, type) {
    node.addEventListener(type, function (e) {
      vm.$methods[value].call(vm, e); //value-Fn  修改this为vm(vue实例)
    });
  }
};

var Nue =
/*#__PURE__*/
function () {
  function Nue(options) {
    _classCallCheck(this, Nue);

    // 保存创建时传递来的类
    if (this.isElement(options.el)) {
      this.$el = options.el;
    } else {
      this.$el = document.querySelector(options.el);
    }

    this.$data = options.data; // 将数据保存到vue实例上以便可以使用this.name使用

    this.proxyData(this.$data);
    this.$methods = options.methods; // 实现computed

    this.$computed = options.computed; // 将computed中方法添加到$data中，在渲染是可以从$data获取

    this.computed2data(); // 根据指定区域和数据去编译渲染页面

    if (this.$el) {
      // 1、给外界传入的所有数据添加get、set方法 可以监听数据变化
      new Oberver(this.$data);
      new Compier(this);
    }
  }

  _createClass(Nue, [{
    key: "computed2data",
    value: function computed2data() {
      var _this4 = this;

      var _loop = function _loop(key) {
        Object.defineProperty(_this4.$data, key, {
          get: function get() {
            return _this4.$computed[key].call(_this4);
          }
        });
      };

      for (var key in this.$computed) {
        _loop(key);
      }
    }
  }, {
    key: "proxyData",
    value: function proxyData() {
      var _this5 = this;

      var _loop2 = function _loop2(key) {
        Object.defineProperty(_this5, key, {
          get: function get() {
            return _this5.$data[key];
          }
        });
      };

      for (var key in this.$data) {
        _loop2(key);
      }
    } // 判断是否是一个元素

  }, {
    key: "isElement",
    value: function isElement(node) {
      return node.nodeType === 1;
    }
  }]);

  return Nue;
}();

var Compier =
/*#__PURE__*/
function () {
  function Compier(vm) {
    _classCallCheck(this, Compier);

    this.vm = vm; // 1、将网页上元素放到内存中

    var fragment = this.node2fragment(this.vm.$el); // console.log(fragment)
    // 2、利用指定的数据编译内存中元素

    this.buildTemplate(fragment); // 3、将编译好的内容重新渲染到网页上

    this.vm.$el.appendChild(fragment);
  }

  _createClass(Compier, [{
    key: "node2fragment",
    value: function node2fragment(app) {
      // 1、创建一个空的文档碎片对象
      var fragment = document.createDocumentFragment(); // 2、编译循环取到每一个元素

      var node = app.firstChild;

      while (node) {
        // 只要将元素添加到文档碎片对象中，自动从网页消失
        fragment.appendChild(node);
        node = app.firstChild;
      } // 返回存储了所有元素的文档碎片对象


      return fragment;
    }
  }, {
    key: "buildTemplate",
    value: function buildTemplate(fragment) {
      var _this6 = this;

      var nodelist = _toConsumableArray(fragment.childNodes); // console.log(nodelist)


      nodelist.forEach(function (node) {
        // 判断当前遍历节点是元素（有无v-model）还是文本（有无{{}}）
        if (_this6.vm.isElement(node)) {
          // console.log('元素', node)
          _this6.buildElement(node); // 处理子元素


          _this6.buildTemplate(node);
        } else {
          // console.log('非元素', node)
          _this6.buildText(node);
        }
      });
    }
  }, {
    key: "buildElement",
    value: function buildElement(node) {
      var _this7 = this;

      // console.log(node)
      // 返回指定节点的属性集合(type,v-model等)
      var attrs = _toConsumableArray(node.attributes);

      attrs.forEach(function (attr) {
        //v-model="name"  name=v-model/value=name
        //v-on:click="Fn"  name=v-on:click/value=Fn
        var name = attr.name,
            value = attr.value; //  console.log('vue指令', name, value)

        if (name.startsWith('v-')) {
          var _name$split = name.split(':'),
              _name$split2 = _slicedToArray(_name$split, 2),
              directiveName = _name$split2[0],
              directiveType = _name$split2[1]; //v-on:click


          var _directiveName$split = directiveName.split('-'),
              _directiveName$split2 = _slicedToArray(_directiveName$split, 2),
              directive = _directiveName$split2[1]; // console.log(directive)


          CompilerUtil[directive](node, value, _this7.vm, directiveType); //value-time.h
        }
      });
    }
  }, {
    key: "buildText",
    value: function buildText(node) {
      var content = node.textContent;
      var reg = /\{\{.+?\}\}/gi;

      if (reg.test(content)) {
        // console.log('是{{}}文本', content)
        CompilerUtil['content'](node, content, this.vm);
      }
    }
  }]);

  return Compier;
}();

var Oberver =
/*#__PURE__*/
function () {
  // 只要监听类对象传递到此处，可以快速给那个类添加get、set方法
  function Oberver(data) {
    _classCallCheck(this, Oberver);

    this.observer(data);
  }

  _createClass(Oberver, [{
    key: "observer",
    value: function observer(obj) {
      if (obj && _typeof(obj) === 'object') {
        // 遍历传入对象所有属性并添加方法
        for (var key in obj) {
          this.defineRecative(obj, key, obj[key]);
        }
      }
    } // obj:需要操作对象 attr：需要新增的get、set方法的属性 value：新增方法属性取值

  }, {
    key: "defineRecative",
    value: function defineRecative(obj, attr, value) {
      var _this8 = this;

      // 如果属性的取值又是一个对象则需要给该对象所有属性添加get、set方法
      this.observer(value);
      var dep = new Dep(); //创建属于当前属性的发布订阅对象（功能）

      Object.defineProperty(obj, attr, {
        get: function get() {
          // 步骤二 将当前属性的所有观察者对象都放到当前属性的发布订阅对象中管理
          Dep.target && dep.addSub(Dep.target); // debugger

          return value;
        },
        set: function set(newvalue) {
          if (value !== newvalue) {
            // 如果添加属性是一个对象，需要给属性对象的属性添加
            _this8.observer(newvalue);

            value = newvalue; // console.log('修改数据')
            // 步骤三 当前属性发生变化就让发布订阅对象发出通知

            dep.notify();
          }
        }
      });
    }
  }]);

  return Oberver;
}(); // 通过定义发布订阅模式来实现数据更新后界面更新。通过定义一个观察者类，在定义一个发布订阅类，通过发布订阅类管理观察者类


var Dep =
/*#__PURE__*/
function () {
  function Dep() {
    _classCallCheck(this, Dep);

    // 管理一个属性所有的观察者对象
    this.subs = [];
  } // 订阅观察方法


  _createClass(Dep, [{
    key: "addSub",
    value: function addSub(watcher) {
      this.subs.push(watcher);
    } // 发布订阅方法

  }, {
    key: "notify",
    value: function notify() {
      this.subs.forEach(function (watcher) {
        return watcher.update();
      });
    }
  }]);

  return Dep;
}();

var Wather =
/*#__PURE__*/
function () {
  function Wather(vm, attr, cb) {
    _classCallCheck(this, Wather);

    this.vm = vm; //vue实例

    this.attr = attr; //观察的属性

    this.cb = cb; //回调函数
    // 创建观察者对象时就去获取当前的旧值

    this.oldValue = this.getOldValue();
  }

  _createClass(Wather, [{
    key: "getOldValue",
    value: function getOldValue() {
      Dep.target = this;
      var oldValue = CompilerUtil.getValue(this.vm, this.attr);
      Dep.target = null;
      return oldValue;
    } // 判断新值与旧值是否相等

  }, {
    key: "update",
    value: function update() {
      var newValue = CompilerUtil.getValue(this.vm, this.attr);

      if (this.oldValue !== newValue) {
        this.cb(newValue, this.oldValue);
      }
    }
  }]);

  return Wather;
}();
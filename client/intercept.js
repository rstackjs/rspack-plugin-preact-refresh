/**
 * The following code is modified based on
 * https://github.com/preactjs/prefresh/blob/018f5cc907629b82ffb201c32e948efe4b40098a/packages/webpack/src/utils/Runtime.js
 *
 * MIT Licensed
 * Author JoviDeCroock
 * Copyright (c) 2021-Present Preact Team
 * https://github.com/preactjs/prefresh/blob/018f5cc907629b82ffb201c32e948efe4b40098a/LICENSE
 */

var createRefreshSig = function () {
  var status = 'begin';
  var savedType;

  return function (type, key, forceReset, getCustomHooks) {
    if (!savedType) savedType = type;
    status = self.__PREFRESH__.sign(
      type || savedType,
      key,
      forceReset,
      getCustomHooks,
      status,
    );
    return type;
  };
};

var noopRefreshReg = function () {};

// Components declared during render call $RefreshSig$ after their module
// factory has completed, so the hook must remain callable outside that scope.
if (typeof self.$RefreshSig$ !== 'function') {
  self.$RefreshSig$ = createRefreshSig;
}
if (typeof self.$RefreshReg$ !== 'function') {
  self.$RefreshReg$ = noopRefreshReg;
}

__webpack_require__.i.push(function (options) {
  var originalFactory = options.factory;
  options.factory = function (moduleObject, moduleExports, webpackRequire) {
    var prevRefreshReg = self.$RefreshReg$;
    var prevRefreshSig = self.$RefreshSig$;
    self.$RefreshSig$ = createRefreshSig;
    var reg = function (currentModuleId) {
      self.$RefreshReg$ = function (type, id) {
        self.__PREFRESH__.register(type, currentModuleId + ' ' + id);
      };
    };
    reg(moduleObject.id);
    try {
      originalFactory.call(this, moduleObject, moduleExports, webpackRequire);
    } finally {
      // Restore the parent module hook, or detach registration at the root.
      self.$RefreshReg$ =
        typeof prevRefreshReg === 'function' ? prevRefreshReg : noopRefreshReg;
      self.$RefreshSig$ =
        typeof prevRefreshSig === 'function'
          ? prevRefreshSig
          : createRefreshSig;
    }
  };
});

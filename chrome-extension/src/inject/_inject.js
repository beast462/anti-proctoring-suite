(function () {
  var realAddEventListener = window.addEventListener;

  function isNotChar(event) {
    return event.key.length === 0;
  }

  function removeSpecialKey(event) {
    event.altKey = false;
    event.ctrlKey = false;
    event.shiftKey = false;
  }

  function keyboardInterceptor(listener) {
    return function (event) {
      if (isNotChar(event)) return;
      removeSpecialKey(event);

      listener(event);
    };
  }

  function newAddEventListener(type, listener, useCapture, wantsUntrusted) {
    var interceptedListener;

    switch (type) {
      case 'blur':
      case 'focus':
        return;

      case 'keydown':
      case 'keypress':
      case 'keyup':
        interceptedListener = keyboardInterceptor(listener);

        break;

      default:
        interceptedListener = listener;
        break;
    }

    realAddEventListener(type, interceptedListener, useCapture, wantsUntrusted);
  }

  window.addEventListener = newAddEventListener;
})();

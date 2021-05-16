console.log('Anti proctoring suite extension');

(function () {
  const script = document.createElement('script');
  const scriptSrc = chrome.runtime.getURL('src/inject/_inject.js');
  const xhr = new XMLHttpRequest();
  xhr.open('GET', scriptSrc, false);
  xhr.send();
  script.innerHTML = xhr.responseText;
  document.documentElement.appendChild(script);
})();

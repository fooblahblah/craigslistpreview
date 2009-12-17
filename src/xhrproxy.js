var XHR_PROXY_PORT_NAME_ = 'XHRProxy_';

/**
 * Should be called by the background page.
 */
function setupXHRProxy() {
  chrome.extension.onConnect.addListener(function(port) {
    if (port.name != XHR_PROXY_PORT_NAME_)
      return;
    
    port.onMessage.addListener(function(xhrOptions) {
      var xhr = new XMLHttpRequest();
      xhr.open(xhrOptions.method || "GET", xhrOptions.url, true);
      xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
          port.postMessage({
            status: this.status,
            data: this.responseText,
            xhr: this
          });
        }
      }
      xhr.send();
    });
  });
}

/**
 * Should be called by the content script.
 */
function proxyXHR(xhrOptions) {
  xhrOptions = xhrOptions || {};
  xhrOptions.onComplete = xhrOptions.onComplete || function(){};
  
  var port = chrome.extension.connect({name: XHR_PROXY_PORT_NAME_});
  port.onMessage.addListener(function(msg) {
    xhrOptions.onComplete(msg.status, msg.data, msg.xhr);
  });
  port.postMessage(xhrOptions);
}
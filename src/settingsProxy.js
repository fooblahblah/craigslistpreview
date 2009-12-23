var SETTINGS_PROXY_PORT_NAME_ = 'SettingsProxy_';

/**
 * Should be called by the background page.
 */
function setupSettingsProxy() 
{
    chrome.extension.onConnect.addListener(
	function(port) 
	{
	    if (port.name != SETTINGS_PROXY_PORT_NAME_)
		return;
    
	    port.onMessage.addListener(
		function(options) 
		{
		    var settings = loadSettings();
		    port.postMessage(
			{
			    settings: settings
			});
		});
	});

}

/**
 * Should be called by the content script.
 */
function proxySettings(options) 
{
    options = options || {};
    options.onComplete = options.onComplete || function(){};

    var port = chrome.extension.connect({name: SETTINGS_PROXY_PORT_NAME_});
    port.onMessage.addListener(
	function(msg) 
	{
	    options.onComplete(msg.settings);
	});
    port.postMessage(options);
}
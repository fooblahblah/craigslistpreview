$(function() 
{
    var hrefs = [];

    $('p span.p').each(
	function() 
	{
	    var a = $(this).siblings("a").filter(
		function() {
		    return this.href.match(/.*[0-9]+\.html/);
		}
	    );

	    var entryDiv =$(this).parent().wrap('<div class="entryDiv"></div>').
		parent().get(0);
	    var clPrevImg = $(entryDiv).append('<div class="clPrevImg"></div>').find(".clPrevImg");
	    hrefs.push({ href: $(a).attr("href"), div: $(clPrevImg) });
	}
    );   
    
    loadSettings(
	function(settings) 
	{
	    getImages(hrefs, settings);    
	});
});


getImages = function(hrefs, settings) 
{
    var obj = hrefs.shift();
    var maxSize = settings.maxSize;
    var maxImages = settings.maxImages;

    if(!obj) 
    {
	return;
    }

    getAdPage(obj.href,
	      function(data)
	      {
		  $(data).find("img:lt(" + maxImages + ")").appendTo(obj.div).each(
		      function()
		      {
      			  $(this).css({ "max-height": maxSize, "max-width": maxSize });
			  $(this).wrap('<a href="' + obj.href + '"></a>');
		      }
		  );
		  
		  $.doTimeout(50, function() { getImages(hrefs, settings); });
	      });
}

loadSettings = function(callback)
{
    proxySettings(
	{
	    onComplete: function(settings) 
	    {
		if(settings)
		{
		    callback(settings);    
		}
		else 
		{
		    console.log("Error proxying settings");
		}	      
	    }
	});
}

getAdPage = function(href, callback)
{
    if(href.indexOf("http://") < 0)
    {
	href = location.protocol + "//" + location.hostname + href; 
    }

    proxyXHR(
	{
	    method: 'GET',
	    url: href,
	    onComplete: function(status, data) 
	    {
		if (status == 200) 
		{
		    callback(data);
		} 
		else 
		{
		    console.log("HTTP Error " + status + " while retrieving data for " + href);
		}
	    }
	});
}


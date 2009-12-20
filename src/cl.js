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
    
    getImages(hrefs);
});

getImages = function(hrefs) 
{
    var obj = hrefs.shift();

    if(!obj) 
    {
	return;
    }

    getAdPage(obj.href,
	      function(data)
	      {
		  $(data).find('img:lt(4)').appendTo(obj.div).each(
		      function()
		      {
			  $(this).wrap('<a href="' + obj.href + '"></a>');
		      }
		  );
		  
		  $.doTimeout(50, function() { getImages(hrefs); });
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


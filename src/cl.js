$(function() 
{
    $('p span:contains("pic"), p span:contains("img")').each(
	function() 
	{
	    var a = $(this).siblings("a").filter(
		function() {
		    return this.href.match(/.*[0-9]+\.html/);
		}
	    );

	    var entryDiv =$(this).parent().wrap('<div class="entryDiv"></div>').
		parents('.entryDiv');
	    var clPrevImg = $(entryDiv).append('<div class="clPrevImg"></div>').find(".clPrevImg");

	    getAdPage($(a).attr("href"),
		      function(data)
		      {
			  $(data).find('img:lt(4)').appendTo($(clPrevImg));
			  $(entryDiv).find('.clPrevImg > img').each(
			      function()
			      {
				  $(this).wrap('<a href="' + $(a).attr('href') + '"></a>');
			      }
			  );
		      });
	}
    );   
});

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


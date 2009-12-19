$(function() 
{
    $('p span.p').each(
	function() 
	{
	    var a = $(this).siblings("a").filter(
		function() {
		    return this.href.match(/.*[0-9]+\.html/);
		}
	    );
	    
	    var entryDiv = $(this).parent().wrap('<div class="entryDiv"></div>').
		parent().get(0);
	    var clPrevImg = null;

	    var insertImgFn = function() {
		console.log($(a).attr("href"));
		clPrevImg = $(entryDiv).append('<div class="clPrevImg"></div>').find(".clPrevImg");
		getAdPage($(a).attr("href"), function(data)	{
			$(data).find('img:lt(4)').appendTo($(clPrevImg)).each(function() {
				$(this).wrap('<a href="' + $(a).attr('href') + '"></a>');
			    });
		    });
	    }

	    var fnScroll = function()
		{
		    console.log("scroll");
		    if(isScrolledIntoView(a))
			{
			    $(window).unbind("scroll", fnScroll);
			    if(clPrevImg == null)
				{
				    insertImgFn();
				}
			}
		};

	    if(isScrolledIntoView(a)) {
		insertImgFn();
	    } else {
		$(window).bind("scroll", fnScroll);
	    }
	});   
});

getAdPage = function(href, callback)
{
    if(href.indexOf(location.protocol + "//") < 0)
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
};

    
isScrolledIntoView = function(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
	    && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
};
    
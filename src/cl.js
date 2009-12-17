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

//	    $(a).addClass("highlight");
	    
	    var entryDiv =$(this).parent().wrap('<div class="entryDiv"></div>').
		parents('.entryDiv');
	    $(entryDiv).append('<div class="clPrevImg"></div>');
	    $(entryDiv).find('.clPrevImg').
		load($(a).attr("href") + " img:lt(4)",
		     function()
		     {
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
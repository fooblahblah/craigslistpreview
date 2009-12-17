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

	    $(this).parent().wrap('<div class="entryDiv"></div>');
	    $(this).parents('.entryDiv').append('<div class="clPrevImg"></div>');
	    $(this).parents('.entryDiv').find('.clPrevImg').load($(a).attr("href") + " img:lt(4)");
	}
    );   
});
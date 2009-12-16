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

	    var parent = $(a).parent().get(0);

	    $(parent).
		wrap('<div class="entryDiv"></div>').
		append('<div class="clPrevImg"></div>');

	    $(parent).find(".clPrevImg").
		append($(this).load($(a).attr("href") + " img:lt(4)"));
	}
    );   
});
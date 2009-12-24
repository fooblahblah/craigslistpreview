$(function() 
  {
      var settings = loadSettings();
      var maxSize;
      var maxImages;

      if($(settings).attr("maxSize"))
      {
	  maxSize = settings.maxSize;
	  adjustImageSize(maxSize);

	  // Initialize label
	  $("#imageSize").val(maxSize);
      }

      if($(settings).attr("maxImages"))
      {
	  maxImages = settings.maxImages;

	  // Initialize label
	  $("#maxImages").val(maxImages);
      }

      $("#sizeSlider").slider(
	  { 
	      "min": 25, 
	      "max": 1000, 
	      "value": maxSize, 
	      "slide": function(event, ui) 
	      {
		  $("#imageSize").val(ui.value);
		  adjustImageSize(ui.value);
	      },
	      "change": function(event, ui)
	      {
		  saveSettings({ "maxSize": ui.value , "maxImages": $("#numSlider").slider("value") });
	      }
	  });

      $("#numSlider").slider(
	  { 
	      "min": 1, 
	      "max": 8, 
	      "value": maxImages,
	      "slide": function(event, ui) 
	      {
		  $("#maxImages").val(ui.value);
	      },
	      "change": function(event, ui)
	      {
		  saveSettings({ "maxSize": $("#sizeSlider").slider("value"), "maxImages": ui.value });
	      }
	  });
  }
);

adjustImageSize = function(maxSize)
{
    $(".clPrevImg > img").each(
      	function()
      	{
      	    $(this).css({ "max-height": maxSize, "max-width": maxSize });
      	});    
}
  

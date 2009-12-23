$(function() 
  {
      $("#sizeSlider").slider(
	  { 
	      "min": 25, 
	      "max": 1000, 
	      "value": 200, 
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
	      "value": 4,
	      "slide": function(event, ui) 
	      {
		  $("#maxImages").val(ui.value);
	      },
	      "change": function(event, ui)
	      {
		  saveSettings({ "maxSize": $("#sizeSlider").slider("value"), "maxImages": ui.value });
	      }
	  });


      var settings = loadSettings();
      if($(settings).attr("maxSize"))
      {
	  var maxSize = settings.maxSize;
	  adjustImageSize(maxSize);

	  // Initialize label
	  $("#imageSize").val(maxSize);
      }

      if($(settings).attr("maxImages"))
      {
	  var maxImages = settings.maxImages;
//	  adjustImageSize(maxSize);

	  // Initialize label
	  $("#maxImages").val(maxImages);
      }

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
  

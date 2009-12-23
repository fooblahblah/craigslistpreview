loadSettings = function()
{
    var settings = {};
    var maxSize = localStorage["maxSize"];
    var maxImages = localStorage["maxImages"];

    if(!maxSize)
    {
	maxSize = 200;
    }

    settings["maxSize"] = maxSize;

    if(!maxImages)
    {
	maxImages = 4;
    }
    
    settings.maxImages = maxImages;

    return settings;
}

saveSettings = function(settings)
{
    localStorage["maxSize"] = settings.maxSize;
    localStorage["maxImages"] = settings.maxImages;
}

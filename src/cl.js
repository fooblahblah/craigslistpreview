$(function()
{
    var hrefs = [];

    $('p.row').each(
        function()
        {
            var a = $(this).find("a");
            var entryDiv = $(this).wrap('<div class="entryDiv"></div>').parent().get(0);
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
    var maxSize = 200; //settings.maxSize;
    var maxImages = settings.maxImages;

    if(!obj)
    {
        return;
    }

    getAdPage(obj.href,
              function(data)
              {
                  var thumbs = $(data).find("div.tn > a:lt(" + maxImages + ")").map(
                      function()
                      {
                          obj.div.append('<a href="' + obj.href + '"><img src="' + $(this).attr('href') + '"></a>');
                          obj.div.css({ "max-height": maxSize, "max-width": maxSize });
                          return obj.div;
                      }
                  );

                  if(thumbs.length == 0) {
                      $(data).find("img:lt(" + maxImages + ")").appendTo(obj.div).each(
                          function()
                          {
                              $(this).css({ "max-height": maxSize, "max-width": maxSize });
                              $(this).wrap('<a href="' + obj.href + '"></a>');
                          }
                      );
                  }

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
                if (status != 200)
                {
                    console.log("HTTP Error " + status + " while retrieving data for " + href);
                }

                callback(data);
            }
        });
}

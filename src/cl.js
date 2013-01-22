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

    getImages(hrefs, {});

    // loadSettings(
    //     function(settings)
    //     {
    //         getImages(hrefs, settings);
    //     });
});


getImages = function(hrefs, settings)
{
    var obj = hrefs.shift();
    var maxImages = 4;

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
                          return obj.div;
                      }
                  );

                  if(thumbs.length == 0) {
                      $(data).find("img:lt(" + maxImages + ")").appendTo(obj.div).each(
                          function()
                          {
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

getAdPage = function(url, callback)
{
    if(url.indexOf("http://") < 0)
    {
        url = location.protocol + "//" + location.hostname + url;
    }

    var request = new XMLHttpRequest();

    request.open('GET', url, true);
    request.onreadystatechange = function (e) {
        if (request.readyState == 4) {
            if (request.status == 200) {
                callback(request.responseText);
            } else {
                console.log("request failed");
            }
        }
    };
    request.send(null);
}

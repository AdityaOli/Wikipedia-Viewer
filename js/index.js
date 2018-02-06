$("#randomSearch").click(function()
{
  var URL = "https://en.wikipedia.org/wiki/Special:Random";
  var w = $(window).width();
  var h = $(window).height();
  $(".OutputPanels").html("<br/><iframe frameborder='0'  class='iframe' src='"+URL+"' width='"+w+"' height='"+h+"'></iframe>");
  
  
});

var search = $('.searchButton');
var result = $('.OutputPanels');
var input = $('input');
$(search).click(function() 
{
  
  if (input.val() === '') 
  {
    result.html('');
    return;
  }
  
  $.ajax({
    url: '//en.wikipedia.org/w/api.php',
    data: { action: 'query', list: 'search', srsearch: input.val(), format: 'json' },
    dataType: 'jsonp',
    success: function (x) 
    {
      var html  = '  <!-- result -->';
          html += '  <div class="row row-centered">';
          
      x.query.search.map(function(w) {
        html += '    <div class="col-xs-10 col-centered"  style="background-color:lightgreen; border-radius:25px;">';
        html += '      <a href="https://en.wikipedia.org/wiki/' + w.title + '" target="_blank">';
        html += '        <div id="panel panel-default">';
        html += '          <div id="panel-heading">';
        html += '            <h3 id="panel-title" style="text-align:center">' + w.title + '</h3>';
        html += '          </div>';
        html += '          <div class="panel-body" style="text-align:center">';
        html += '            ' + w.snippet;
        html += '          </div>';
        html += '        </div>';
        html += '      </a>';
        html += '    </div>';
      });
      
      html += '  </div>';
      
      result.html(html);      
    }
  });
});
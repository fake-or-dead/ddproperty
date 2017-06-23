$(function() {
  $('.btn-submit').on('click', function(e){
    getLog($('input.search').val(), {}, function(data){ $('#result').html(data); });
  });

  $('#result').on('click', 'button', function(e) {
    e.preventDefault();
    getLog($('input.search').val(), {page: this.getAttribute('data-page')}, function(data){$('#result').html(data);});
  });

  function getLog(filename, options, callback) {
    options.filename = filename;

    $.ajax({
      url: "/",
      type: 'POST',
      data: options,
      success: function(data, status){
        callback(data);
      }
    });
  }
});

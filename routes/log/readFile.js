function readFile(req, res) {
  var fs = require('fs');
  var path = require('path');

  var log_path = './log';
  var page = parseInt(req.body.page) || 1;
  var per_page = parseInt(req.body.per_page) || 10;
  var result =[];

  var file_path = path.join(log_path, req.body.filename || '');

  var processLog = function(data) {
    var array = data.toString().split("\n");
    var max_length = 0;
    var min_page = 1;
    var max_page = Math.ceil(array.length / per_page);

    if((page * per_page) > array.length) {
      max_length = array.length
    }
    else {
      max_length = (page * per_page)
    }

    for(i = ((page-1) * per_page) + 1; i <= max_length; i++) {
      result.push(array[i]);
    }

    json = { data: result,
             page: page,
             per_page: per_page,
             pagination: { min_page: min_page,
                           max_page: max_page,
                           prev: (page - 1) < min_page ? min_page : page - 1,
                           next: (page + 1) > max_page ? max_page : page + 1,
                           current_page: page
                         }
           };
    return json;
  }

  if (fs.existsSync(file_path)) {
    fs.readFile(file_path, "utf8", function (err, data) {
      if (err) throw( err );

      return res.render('components/table', processLog(data));
    });
  }
  else {
    return res.render('components/table', {error: 'File not found' });
  }
};

module.exports = readFile;

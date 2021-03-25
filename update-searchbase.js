var fs = require('fs');

const packageJSON = require('./packages/searchbase/package.json');

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

walk(__dirname, function(err, results) {
  if (err) throw err;
  var filesToUpdate = results
    .filter(item => item.includes('package.json'))
    .filter(item => item.includes('searchbox'))
    .filter(item => !item.includes('node_modules'));
  filesToUpdate.forEach(file => {
    var jsonFile = require(file);
    if (
      true &&
      jsonFile.dependencies &&
      jsonFile.dependencies['@appbaseio/searchbase']
    ) {
      console.log('Updating version of', file.replace('$var', ''));
      jsonFile.dependencies['@appbaseio/searchbase'] = packageJSON.version;
      var updatedJSON = JSON.stringify(jsonFile, null, 4);
      fs.writeFile(file, updatedJSON, 'utf8', err => {
        if (err) {
          console.log(
            'Error while updating version of',
            file.replace('$var', '')
          );
          throw err;
        }
      });
    }
  });
});

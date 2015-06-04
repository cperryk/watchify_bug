var browserify = require('browserify');
var watchify = require('watchify');
var fs = require('fs');

var b = browserify({
	cache: {},
  packageCache: {},
  ignoreMissing: true
})
.add('./test.js')
.require('./mymodule.js');

b.bundle(writeBundle);

var w = watchify(b, {
  delay: 0
})
.on('update', function(){
  w.bundle(writeBundle);
});

function writeBundle(err, buff, map){
	if(err){
		console.log(err);
	}
	fs.writeFileSync('out.js', buff);
  console.log('written: out.js');
}

# [gulp](https://github.com/wearefractal/gulp)-check-constants
> Find numbers that should be extracted to a declaration statement using [check-constants](https://github.com/pgilad/check-constants)

[![NPM Version](http://img.shields.io/npm/v/gulp-check-constants.svg?style=flat)](https://npmjs.org/package/gulp-check-constants)
[![NPM Downloads](http://img.shields.io/npm/dm/gulp-check-constants.svg?style=flat)](https://npmjs.org/package/gulp-check-constants)
[![Build Status](http://img.shields.io/travis/pgilad/gulp-check-constants.svg?style=flat)](https://travis-ci.org/pgilad/gulp-check-constants)

*Issues with the output should be reported on the check-constants [issue tracker](https://github.com/pgilad/check-constants/issues).*

## Install

Install with [npm](https://npmjs.org/package/gulp-check-constants)

```bash
$ npm install --save-dev gulp-check-constants
```

## Usage

```js
var gulp = require('gulp');
var checkConstants = require('gulp-check-constants');

//example with basic css copying
gulp.task('js', function() {
    gulp.src('./src/js/**/*.js')
        .pipe(checkConstants())
        .pipe(gulp.dest('./public/js'));
});

//example with custom options
gulp.task('js', function() {
    gulp.src('./src/js/**/*.js')
        .pipe(checkConstants({
                enforceConst: true,
                ignore: [0, 1, 2, 3, 10]
        }))
        .pipe(gulp.dest('./public/js'));
});
```

## API

See the `check-constants` [Options](https://github.com/pgilad/check-constants#api)
except for `file` which is handled for you.

## License

MIT ©2014 **Gilad Peleg**

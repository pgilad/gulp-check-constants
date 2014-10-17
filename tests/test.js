/* global describe, it */
'use strict';
var expect = require('expect.js');
var path = require('path');
var fs = require('fs');

var gutil = require('gulp-util');
var checkConstants = require('../index');

describe('gulp-check-constants', function () {
    it('empty files should pass', function (cb) {
        var stream = checkConstants();

        stream.on('data', function (file) {
            expect(file.path).to.contain('basic.js');
            cb();
        });
        var file = './tests/fixtures/basic.js';

        stream.write(new gutil.File({
            base: path.basename(file),
            path: file,
            contents: new Buffer('')
        }));

        stream.end();
    });

    it('should throw error on basic validation', function (cb) {
        var stream = checkConstants();

        stream.on('error', function (err) {
            expect(err.message).to.contain('Found 2 constants that could be extracted.');
            cb();
        });
        var file = './tests/fixtures/basic.js';

        stream.write(new gutil.File({
            base: path.basename(file),
            path: file,
            contents: new Buffer(fs.readFileSync(file).toString())
        }));

        stream.end();
    });

    it('should handle faulty js', function (cb) {
        var stream = checkConstants();

        stream.on('error', function (err) {
            expect(err.plugin).to.contain('gulp-check-constants');
            expect(err.message).to.contain('Error parsing contents');
            cb();
        });
        var file = './tests/fixtures/basic.js';

        stream.write(new gutil.File({
            base: path.basename(file),
            path: file,
            contents: new Buffer('var sjf28jf @D@D')
        }));

        stream.end();
    });

    it('should be ok with a good js file', function (cb) {
        var stream = checkConstants();

        stream.on('error', function (err) {
            expect(err).to.not.be.ok();
        }).on('data', function (data) {
            expect(data).to.be.ok();
            expect(path.basename(data.path)).to.be('basic.js');
        }).on('end', cb);
        var file = './tests/fixtures/basic.js';

        stream.write(new gutil.File({
            base: path.basename(file),
            path: file,
            contents: new Buffer('console.log("all is good")')
        }));

        stream.end();
    });
});

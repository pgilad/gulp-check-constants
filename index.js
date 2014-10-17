'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var assign = require('lodash.assign');
var checkConstants = require('check-constants');

var pluginName = 'gulp-check-constants';
var PluginError = gutil.PluginError;

module.exports = function (options) {
    options = options || {};

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }
        if (file.isStream()) {
            cb(new PluginError(pluginName, 'Streaming not supported'));
            return;
        }
        var params = assign(options, {
            file: file.path
        });
        var data = file.contents.toString('utf8');
        var results;
        try {
            results = checkConstants.inspect(data, params);
        } catch (err) {
            cb(new PluginError(pluginName, err, {
                fileName: file.relative || file.path
            }));
            return;
        }

        // All is good
        if (!results.length) {
            cb(null, file);
            return;
        }

        checkConstants.log.reporters.table(results);
        cb(new PluginError(pluginName, 'Found ' + results.length + ' constants that could be extracted.'));
    });
};

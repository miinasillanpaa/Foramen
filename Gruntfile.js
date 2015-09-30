module.exports = function(grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        distDir: 'dist',

        clean: {
            dist: [
                '.tmp',
                '<%= distDir %>'
            ]
        },

        useminPrepare: {
            html: 'index.html',
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    //dot: true,
                    cwd: '',
                    dest: '<%= distDir %>/',
                    src: [
                        'index.html',
                        'assets/**'
                    ]
                }]
            }
        },

        uglify: {
            options: {
                preserveComments: false,
                mangle: false,
                compress: {
                    drop_console: true
                }
            }
        },

        usemin: {
            html: '<%= distDir %>/index.html'
        },

        manifest: {
            generate: {
                options: {
                    basePath : "<%= distDir %>",
                    network: ["http://*", "https://*"],
                    preferOnline: true,
                    timestamp: true
                },
                src: [
                    "index.html",
                    "js/app.js",
                    "css/styles.css",
                    "assets/img/*.png",
                    "assets/img/*.gif",
                    "assets/img/potpuri/**/*.jpg",
                    "assets/pics/**/*.png",
                    "assets/pics/*.png",
                    "assets/sounds/audio/elaimet/*.mp3",
                    "assets/sounds/*.mp3",
                    "assets/*.pdf"
                ],
                dest: "<%= distDir %>/manifest.appcache"
            }
        },

        'string-replace': {
            inline: {
                files : {
                    '<%= distDir %>/index.html': '<%= distDir %>/index.html',
                },
                options: {
                    replacements: [{
                        pattern: '<html>',
                        replacement: '<html manifest="manifest.appcache">'
                    }]
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    removeComments: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= distDir %>',
                    src: 'index.html',
                    dest: '<%= distDir %>'
                }]
            }
        }

    });

    grunt.registerTask('build', [
        'clean',
        'useminPrepare',
        'copy',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'usemin',
        'manifest',
        'string-replace',
        'htmlmin'
    ]);


};

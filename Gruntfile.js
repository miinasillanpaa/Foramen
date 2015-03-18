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
        'htmlmin'
    ]);


};

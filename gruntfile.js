module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        'http-server' : {
            'dev' : {
                root: '',
                port: '8000',
                host: '0.0.0.0',
                showDir : true,
                autoIndex: true,
                ext: "html",
                runInBackground: false,
                openBrowser: true
            }
        },

        watch: {
            less: {
                files: ['**/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            },
            jshint: {
                files: ['src/*.js'],
                tasks: ['jshint']
            }
        },
        bower: {
            dev: {
                dest: 'library'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-bower');

    grunt.registerTask('default', ['bower', 'less', 'http-server:dev']);
};
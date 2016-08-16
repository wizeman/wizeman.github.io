module.exports = function(grunt) {
	grunt.initConfig({
		htmllint: {
			all: ["data/**/*.html"]
		},
		bootlint: {
			options: {
				showallerrors: true,
			},
			files: ['data/**/*.html']
		},
		csslint: {
			strict: {
				src: ['data/*.css']
			}
		},
		eslint: {
			target: ['data/**/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-html');
	grunt.loadNpmTasks('grunt-bootlint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-eslint');

	grunt.registerTask('default', ['htmllint', 'bootlint', 'csslint', 'eslint']);
};

module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			jade: {
				files: ['views/*'],
				options: {
					livereload: true// 当文件出现改动时，重新启动服务
				}
			},
			js: {
				files: ['public/js/**', 'models/**/.js', 'schemas/**/*.js'],
				// tasks: ['jshint'],
				options: {
					livereload: true
				}
			}
		},
		nodemon: {
			dev: {
				options: {
					file: 'app.js',// 入口文件
					args: [],
					ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
					watchedExtensions: ['js'],
					watchedFolders: ['app', 'config'],
					debug: true,
					delayTime: 1,
					env: {
						PORT: 3000
					},
					cwd: __dirname
				}
			}
		},
		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-watch')// 只要有文件的修改，就会重新执行在它里面的任务
	grunt.loadNpmTasks('grunt-nodemon')// 实时监听app.js
	grunt.loadNpmTasks('grunt-concurrent')// 针对慢任务，如sass、less，优化构建时间，还能跑多个任务组

	grunt.option('force', true)
	grunt.registerTask('default', ['concurrent'])
}
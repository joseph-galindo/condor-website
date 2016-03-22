module.exports = function(grunt) {
	
	//cfg of stock tasks
	grunt.initConfig({

		copy: {
			build: {
				cwd: 'src',
				src: ['**', '!markup/**', '!styles/**'],
				dest: 'dist',
				expand:true,
				dot:true
			}
		},

		frontmatter: {
			build: {
				options: {
					minify: false,
					width:60
				},
				files: {
					'src/markup/yaml.json': ['src/markup/pages/*.jade']
				}
			}
		},

		jade: {
			build: {
				options: {
					pretty:true,
					debug:false,
					basedir: 'src/markup',
					data: function(dest,src) {

						//read json made by frontmatter task - concats all yaml into one file

						var fs = require('fs');
						var yaml = JSON.parse(fs.readFileSync('src/markup/yaml.json','utf8'));

						//get filename of current jade page currently being compiled

						var filename = src[0].replace('src/markup/pages/', '').replace('.jade', '').split('/').pop();

						//loop through json of all page YAMLs to find the one page YAML that matches the jade page currently being compiled

						var pageYAML = null;

						for(object in yaml) {
							if(yaml[object]['section'] === filename) {
								pageYAML = yaml[object];
							}
						}

						//return the pageYAML found above

						return {
							from: src,
							to: dest,
							page: pageYAML
						};
					}
				},
				files: [{
					cwd: 'src/markup/pages',
					dest: 'dist/',
					src: ['**/*.jade'],
					expand:true,
					filter: 'isFile',
					ext: '.html'
				}]
			}
		},

		sass: {
			build: {
		        options: {
		            style: 'expanded',
		            sourceMap: true
		        },
		        // files: [{
		        //     expand: true,
		        //     src: ['**/*.scss', '!**/_*.scss'],
		        //     cwd: 'src/styles',
		        //     dest: 'dist/css',
		        //     ext: '.css'
		        // }]
		        files: {
		        	'dist/css/styles.css' : 'src/styles/styles.scss'
		        }
		    }
		},

		clean: {
			build: {
				src: ['dist']
			}
		},

		autoprefixer: {
			build: {
				expand:true,
				cwd: 'dist',
				src: ['**/*.css'],
				dest: 'dist'
			}
		},

		watch: {
		    options: {
		        dot: true,
		        interrupt: false,
		        livereload: true,
		        livereloadOnError: false,
		        spawn: false
		    },
		    markup: {
		        files: ['src/markup/**/*.jade', '!src/markup/pages/**/*.jade'],
		        tasks: ['markup:build']
		    },
		    markup_pages: {
		        files: ['src/markup/pages/**/*.jade'],
		        tasks: ['markup:watch']
		    },
		    styles: {
		        files: ['src/styles/**/*.scss'],
		        tasks: ['styles:build']
		    },
		    data: {
		    	files: ['src/data/**'],
		    	tasks: ['data:watch']
		    },
		    js: {
		    	files: ['src/js/**'],
		    	tasks: ['newer:copy']
		    }
		},

		connect: {
			build: {
				options: {
				    hostname: '*',
				    // hostname: '<%= grunt.config.get("ip") %>',
				    port: 3000,
				    base: 'dist/',
				    target: 'http://localhost:3000',
				    appName: 'open',
				    open: true,
				    livereload: true
				}
			}
		}

	});

	//loading of stock tasks
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-frontmatter');
	grunt.loadNpmTasks('grunt-newer');

	//defining of custom tasks for CLI use
	grunt.registerTask('markup:build', ['frontmatter', 'jade']);
	grunt.registerTask('markup:watch', ['frontmatter', 'newer:jade']);

	grunt.registerTask('styles:build', ['sass', 'autoprefixer']);
	grunt.registerTask('styles:watch', ['newer:sass', 'newer:autoprefixer']);

	grunt.registerTask('data:watch', ['newer:copy']);

	grunt.registerTask('default','Creates build and serves it for dev purposes', ['clean','copy', 'markup:build', 'styles:build', 'connect', 'watch']);
	grunt.registerTask('prod','Creates prod build in dist directory', ['clean','copy', 'markup:build', 'styles:build']);
};
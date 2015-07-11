(function(){
    'use strict'

    var dependens = [
        'fs', 'path', 'gulp', 'gulp-csso', 'gulp-uglify','color', 
        'gulp-concat', 'gulp-less', 'gulp-bower', 'gulp-watch', 
        'main-bower-files', 'child_process', 'gulp-rename',
        'gulp-html-tag-include', 'gulp-babel', 'gulp-sourcemaps', 'yargs', 'gulp-livereload', 'gulp-browserify', 'gulp-connect'
    ];

    dependens.forEach(function(name) {
        global[name.replace('gulp-', '')] = require(name);
    });

    var path = {
        public: './_public',
        dev: './'
    };

    var modules = fs.readdirSync(path.dev +'/modules/');

    gulp.task('install', gulpInstall);
    gulp.task('icons', gulpIcons);
    gulp.task('build', gulpBuild);
    gulp.task('help', function(){
        console.log('gulp install -- устанавливает зависимости и собирает vendor');
        console.log('gulp build [-w, -m] -- сборка [вотчинг, минификация]');
    });

    function gulpBuild(){
        var w = yargs.argv ? 'w' in yargs.argv : null;
        var min = yargs.argv ? 'm' in yargs.argv : null;

        connect.server({
            livereload: true
        });

        if(w){
            console.log(('           Watching mode').bold.yellow);
            console.log('-----------------------------------------');
        }

        for(var id in modules){
            js(modules[id]);
            assets(modules[id]);
            styles(modules[id]);

            if(w){watch(modules[id]);}
        }

        function watch(module){
            
            var src = path.dev + '/modules/'+ module +'*(components|js|views)/**';
            var htmlSrc = path.dev + "/modules/" + module + "/**/*.html";

            gulp.watch(src + '/*(*.less|*.css)', function(){
               styles(module);
               console.log('     ' + module + ' styles updating');
               console.log('-----------------------------------------');
            });

            gulp.watch(src + '/*.js', function(){ 
               js(module);
               console.log('     ' + module + ' js updating');
               console.log('-----------------------------------------');
            });

            gulp.watch(htmlSrc , function(){ 
               assets(module);
               console.log('     ' + module + ' assets updating');
               console.log('-----------------------------------------');
            });
        }
        
        function styles(module){
            var src = path.dev + '/modules/'+ module +'*(components|js|views)/**/*(*.less|*.css)';
            var dest = path.public + (module === 'global' ? '' : '/modules/' + module);
            
            var thread = gulp.src(src)
                .pipe(less()).on('error', errorLog)
                .pipe(concat(module + '.css'))
                .pipe(connect.reload());

            if(min){
                console.log(module + ' css minification...'.bold.green);
                thread.pipe(csso());
            }

            thread.pipe(gulp.dest(dest));
        }

        function js(module){
            var src = path.dev + '/modules/'+ module +'*(components|js|views)/**/!(assets)/*.js';
            var dest = path.public + (module === 'global' ? '' : '/modules/' + module);
                
            var thread = gulp.src(src)
                .pipe(concat(module + '.js')).on('error', errorLog)
                .pipe(sourcemaps.init())
                .pipe(babel())
                .pipe(browserify({
                  insertGlobals : true,
                  //debug : !gulp.env.production
                }))
                .pipe(connect.reload());

            if(min){
                console.log(module + ' js minification...'.bold.green);
                thread.pipe(uglify());
            }

            
            thread.pipe(sourcemaps.write("."))
                .pipe(gulp.dest(dest));
        }

        function assets(module) {
            var src = path.dev + '/modules/' + module + '/assets/**/';
            var dest = path.public + (module === 'global' ? '' : '/modules/' + module)

            gulp.src(src + "!(*.html)")
                .pipe(gulp.dest(dest))
                .pipe(connect.reload());

            gulp.src(path.dev + "/modules/" + module + "/**/*.html")
                .pipe(rename(renameCallback))
                .pipe(gulp.dest(dest))
                .pipe(connect.reload());;

            function renameCallback(path){
                if(path.dirname.match('assets')){
                    path.dirname = '';
                }

            }
        }
    }

    function gulpIcons(){
        buildIcons();

        function buildIcons(){
            var src = path.dev + 'bower_components/material-design-icons/**/**/production/*.svg';

            gulp.src(src, {matchBase: true})
                .pipe(rename(renameCallback))
                .pipe(gulp.dest(path.public + '/img/icons'));

            function renameCallback(path){
                path.dirname = '';
            }
        }
    }
        
    function gulpInstall(){
        setTimeout(function(){
            console.log("build vendor...".bold.blue.underline);
        }, 0);
        
        buildBowerFonts();
        buildVendors();

        function buildVendors(){
            var bowerJs = mainBowerFiles(/\.js/);
            var bowerCss = mainBowerFiles(/\.css/);

            bowerJs.push(path.dev + '/libraries/**/*.js');
            bowerCss.push(path.dev + '/libraries/**/*.css');

            gulp.src(bowerJs)
                .pipe(concat('vendor.js'))
                .pipe(uglify())
                .pipe(gulp.dest(path.public));

            gulp.src(bowerCss)
                .pipe(concat('vendor.css'))
                .pipe(csso())
                .pipe(gulp.dest(path.public));
        }

        function buildBowerFonts(){
            gulp.src(mainBowerFiles(/\.eot$|\.svg$|\.ttf$|\.woff$/))
                .pipe(gulp.dest(path.public + 'fonts'));
        }

        function mainBowerFiles(filter) {
            var bowerComp = global['main-bower-files']({
                paths: path.dev,
                filter: filter
            });

            return bowerComp;             
        }
    
        function log(error, stdout, stderr){
            if(stdout){
                console.log('child_process.exec stdout: ' + stdout);
            }
            if(stderr){
                console.log('child_process.exec stderr: ' + stderr);
            }

            if (error !== null) {
                console.log([
                    '=== child_process.exec error start! ==='.bold.red.underline,
                    'bower exec error: ' + error,
                    '=== child_process.exec error end! ==='.bold.red.underline,
                ]);
            }
        }
    }

    function errorLog(error) {
        console.log([
            '',
            "----------ERROR MESSAGE START----------".bold.red.underline,
            '','',
            ("[" + error.name + " in " + error.plugin + "]").red.bold.inverse,
            '',
            error.message,
            '','',
            "----------ERROR MESSAGE END----------".bold.red.underline,
            ''
        ].join('\n'));
        this.end();
    }
})();





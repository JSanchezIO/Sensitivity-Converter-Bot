const chalk = require('chalk');
const del = require('del');
const gulp = require('gulp');
const mkdirp = require('mkdirp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('./tsconfig.json');

const compile = () => {
  const result = tsProject.src().pipe(tsProject());

  return result.js.pipe(gulp.dest(tsProject.options.outDir));
};

compile.description = 'compiles scripts and copies the compiled result to the output directory';

const move = () => {
  return gulp.src(tsProject.options.outDir + '/src/**').pipe(gulp.dest(tsProject.options.outDir));
};

const purge = cb => {
  del([tsProject.options.outDir + '/src', tsProject.options.outDir + '/gulpfile.js']).then(() => {
    cb();
  });
};

const clean = cb => {
  del([tsProject.options.outDir]).then(() => {
    mkdirp(tsProject.options.outDir, err => {
      if (err) {
        console.log(chalk.red(err));
      }

      cb();
    });
  });
};

clean.description = 'cleans the output directory';

gulp.task(clean);

gulp.task('build', gulp.series(clean, compile, move, purge));

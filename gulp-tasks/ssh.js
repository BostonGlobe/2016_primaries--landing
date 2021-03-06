'use strict';

const gulp        	= require('gulp');
const fs 			= require('fs');
const shell       	= require('shelljs');
const argv        	= require('yargs').argv;
const configPath = process.cwd() + '/data/config.json';
const config     	= JSON.parse(fs.readFileSync(configPath, 'utf8'));
const base        	= '/web/bgapps/html/election-results/2016';
const host        	= 'shell.boston.com';

gulp.task('ssh-prod', function(cb) {
	const username = argv.u;
	const files = argv.html ? 'index.html' : '.';
	const filepath = base;
	const configured = checkConfiguration(username);

	let command = '';

	if (configured) {
		command = '(cd dist/prod; scp -r ' + files + ' ' + username + '@' + host + ':' + filepath + ')';
		shell.exec(command, cb);
	} else {
		cb();
	}
});

const checkConfiguration = function(username) {
	// if (!config.path) {
	// 	console.log('*** setup ssh-config.js "path" to upload to apps ***');
	// }
	if (!username) {
		console.log('*** enter your username with "gulp prod -u username" ***');
	}
	return username && typeof username === 'string';
};

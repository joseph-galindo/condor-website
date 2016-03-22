# condor-website README  

## Requirements:  

[nodejs (for npm)](https://nodejs.org)   
[grunt (for dev work/assembling build)](http://gruntjs.com/)  

## Current build:  

After installing nodejs, npm should be installed. From there you will need to install Grunt if you have not done so already. To do this run this in your CLI of choice:  

`npm install -g grunt-cli`  

Afterwards, clone this repo and run this within the project root.  

`npm i`  

This will install all the node modules needed, as listed in `package.json`. Once that's complete, just run  

`grunt`  

to assemble the build and automatically serve it in your browser, or you can run  
 
`grunt prod`  

to assemble the build in `dist/` without serving it.  

The grunt build will probably evolve with more fine grain file control (as assets, etc. are brought in), and also probably include jshint, but for now this is a pretty decent starting build.  

For now, markup is [jade](http://jade-lang.com/) that is compiled to HTML, and styles are [SCSS](http://sass-lang.com/) that is compiled to CSS.  

For jade, only files within `src/markup/pages` are actually compiled into `dist/`, this is because jade is great for building reusable templates, which will likely be part of this build, but not necessarily compiled (think of HTML partials that can be included and reused in several views).  

For sass, it should try to compile all sass files found. The only exception is if a file has a leading underscore, like `_partial.scss`. This is done for a similar reason to the jade partials above; sass identifies partial files by whether or not they have a leading underscore, and while partials may be used in whole stylesheets, they shouldn't be compiled on their own into `dist/`.  

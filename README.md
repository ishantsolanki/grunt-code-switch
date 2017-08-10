# grunt-code-switch

> Toggle comments in HTML and JS files.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-code-switch --save-dev
```

Once the plugin has been installed, load it as an NPM task in gruntfile.js

```js
grunt.loadNpmTasks('grunt-code-switch');
```

## The "code_switch" task

### Overview
In your Grunt configuration, add a section named `code_switch` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  code_switch: {
    options: {
      environment: grunt.option('env') || 'dev',
      env_char: '#',
      blocks: [{
        code_tag: 'env:dev',
        grunt_option: 'dev'
      }, {
        code_tag: 'env:prod',
        grunt_option: 'prod'
      }]
    },
    files: {
      'app/utils/appConfig.js': 'app/utils/appConfig.js',
      'index.html': 'index.html'
    }
  }
});
```

In `JS` files add the code switch blocks in the following manner.

**Note:** The spaces does matter.

```js
  /* [code_tag] *[env_char]/
   { your code goes here }
  /* [code_tag]:end */
```
Example

```js
    /* env:dev */
    var webServerUrl = "www.dev-yoursite.com";
    /* env:dev:end */
    /* env:prod *#/
    var webServerUrl = "www.prod-yoursite.com";
    /* env:prod:end */
```

In `HTML` files add the code switch blocks in following manner.

**Note:** The spaces does matter.

```html
  <!-- [code_tag] --[env_char]>
   { your code goes here }
  <!-- [code_tag]:end -->
```
Example

```html
    <!-- env:dev -->
    <div> DEV version </div>
    <!-- env:dev:end -->
    <!-- env:prod --#>
    <div> PROD version </div>
    <!-- env:prod:end -->
```

Run the grunt command for development

```shell
grunt code_switch --env=dev
```

Run the grunt command for production

```shell
grunt code_switch --env=prod
```

### Options

#### environment
Type: `String`

A string value that specifies the allowable parameters to pass to make the code switch.

#### env_char
Type: `String`
Default value: `#`

A single symbol that is added to code for enabling or disabling code blocks. `#` will work for most cases.

#### blocks
Type: `Array`

A array block defining the possible switches. It contains 'code_tag' and its corresponding 'grunt_option'

#### files
Type: `Array`

A array of files to include which containing the code switching blocks


##Example
I use the following setup in my development environment

In the grunt file
```js
grunt.initConfig({
  code_switch: {
    start: {
    options: {
      environment: 'prod',
      env_char: '#',
      blocks: [{
        code_tag: 'env:dev',
        grunt_option: 'dev'
      }, {
        code_tag: 'env:prod',
        grunt_option: 'prod'
      }]
    },
    files: {
      'app/scripts/config.js': 'app/scripts/config.js'
    }
    },
    end: {
      options: {
        environment: 'dev',
        env_char: '#',
        blocks: [{
          code_tag: 'env:dev',
          grunt_option: 'dev'
        }, {
          code_tag: 'env:prod',
          grunt_option: 'prod'
        }]
      },
      files: {
        'app/scripts/config.js': 'app/scripts/config.js'
      }
    }
  }
});

grunt.registerTask('build', [
  'code_switch:start',
  ,
  ,
  '...tasks for generating production build...',
  ,
  ,
  'code_switch:end'
]);
```

This will switch the build to production only during creation of build and on completion, it will switch back to development.


## Release History
0.1.0 Initial Release

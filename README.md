# grunt-code-switch

> Used to switch between previously defined HTML and JS comment blocks in project files to change based on specified parameters.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-code-switch --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-code-switch');
```

## The "code_switch" task

### Overview
In your project's Gruntfile, add a section named `code_switch` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    code_switch: {
            start: {
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
            },
    }
});
```

In your appConfig.js file add a dev and prod switch blocks

```js
    /* env:dev */
    var webServerUrl = "www.dev-yoursite.com";
    /* env:dev:end */
    /* env:prod *#/
     var webServerUrl = "www.prod-yoursite.com";
     /* env:prod:end */
```

In your index.html file add the dev and prod switch blocks

```html
    <!-- env:dev -->
    <div> DEV version </div>
    <!-- env:dev:end -->
    <!-- env:prod -->
    <div> PROD version </div>
    <!-- env:prod:end -->
```

### Options

#### environment
Type: `String`
Default value: `',  '`

A string value that specifies the allowable parameters to pass to make the code switch.

#### env_char
Type: `String`
Default value: `#`

A single symbol that is added to code for enabling or disabling code blocks.

#### blocks
Type: `Array`

A array block defining the possible switches. It contains 'code_tag' and its corresponding 'grunt_option'

#### files
Type: `Array`

A array of files to include which containing the code switching blocks

## Release History
0.1.0 Initial Release

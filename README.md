[![build status](https://secure.travis-ci.org/vojtajina/grunt-coffeelint.png)](http://travis-ci.org/vojtajina/grunt-coffeelint)
# grunt-coffeelint

**Lint your CoffeeScript with [CoffeeLint].**

## Installation

Install npm package, next to your project's `Gruntfile.js` file:

    npm install grunt-coffeelint

Add this line to your project's `Gruntfile.js`:

    grunt.loadNpmTasks('grunt-coffeelint');

## Options

A few additional options are supported:

### force
Type: `Boolean`
Default value: `false`

Set `force` to `true` to report CoffeeLint errors but not fail the task.

### rules
Type: `Array`
Default value: `[]`

List of npm packages to be loaded as custom rules. They have to be requirable so included in project's package.json or available as global package.

## Configuration

`coffeelint` is a multitask, so you can use it similary to `lint`, `watch` etc...

````javascript
grunt.initConfig({
    ...
    coffeelint: {
      app: ['app/*.coffee', 'scripts/*.coffee']
    },
    ...
});
````

### Options per target

````javascript
grunt.initConfig({
    ...
    coffeelint: {
      app: ['app/*.coffee', 'scripts/*.coffee'],
      tests: {
        files: {
          src: ['tests/*.coffee']
        },
        options: {
          'no_trailing_whitespace': {
            'level': 'error'
          }
        }
      }
    },
    ...
});
````

### Global - default options

````javascript
grunt.initConfig({
    ...
    coffeelint: {
      options: {
        'no_trailing_whitespace': {
          'level': 'error'
        }
      }
    },
    ...
});
````

### Custom rules

````javascript
grunt.initConfig({
    ...
    coffeelint: {
      rules: ['coffeelint-complex-conditions']
    },
    ...
});
````

### Loading external config

````javascript
grunt.initConfig({
    ...
    coffeelint: {
      options: {
        configFile: 'coffeelint.json'
      }
    },
    ...
});
````
Task `options` take precedence over `configFile` options.

For available options see [coffeelint homepage].

[CoffeeLint]: http://www.coffeelint.org/
[coffeelint homepage]: http://www.coffeelint.org/

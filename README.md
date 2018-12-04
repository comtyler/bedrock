# Bedrock

A jumping-off point for creating a custom Wordpress theme leveraging modern front-end tooling.

### Install

Simply clone this repository to start a new theme:

```
$ git clone https://github.com/comtyler/bedrock.git my-wordpress-theme && rm .git
```

> Note: This repository does not include the Wordpress install files. You will need to download those from [Wordpress.org](https://wordpress.org/download/) and navigate to the `wp-content/themes` folder before cloning.

Once cloned, you will need to install all of the NPM dependencies (from the new theme folder):

```
$ cd my-wordpress-theme
$ npm install
```


### Usage

Once the NPM dependencies are installed, we will need to start our Gulp task to watch for SASS file changes to compile our main stylesheet.

```
$ gulp
```

**Don't forget to fill in the Wordpress theme details in the main SASS file!**

:thumbsup: :neckbeard:

### Tools

- **Gulp** - A simple build tool for compiling SASS and Javascript dependencies
- **Bootstrap (popper.js)** - A front-end framework written in SASS and jQuery
- **jQuery** - A Javascript framework for speeding script development

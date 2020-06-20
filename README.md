# Bedrock

A jumping-off point for creating a custom Wordpress theme leveraging modern front-end tooling.

### Install


#### Wordpress

Create a new project directory then download and install Wordpress.

This repository does not include the Wordpress install files. If you are using the WP CLI:

```
$ wp core download --version=latest --locale=en_US --skip-content
```

Otherwise, you will need to download Wordpress from [Wordpress.org](https://wordpress.org/download/) and navigate to the `wp-content/themes` directory before cloning.

#### Igniter

Simply clone this repository to start a new theme:

```
$ git clone https://github.com/comtyler/bedrock.git my-wordpress-theme
```

Once cloned, you will need to remove the Git configuration folder to avoid conflicts with the project's Git configuration. We also need to install all of the NPM dependencies:

```
$ cd my-wordpress-theme
$ find . -name ".git* .git" -delete
$ npm install
```


### Usage

Once the NPM dependencies are installed, we will need to start our Gulp task to watch for SASS file changes to compile our main stylesheet.

```
$ gulp
```

**Don't forget to fill in the Wordpress theme details in the main SASS file!**

### Helpful GISTS

- [.gitignore](https://gist.github.com/comtyler/40fb0452f58ae1ae66cd6e8b2a11c57d)
- [wp-config.php](https://gist.github.com/comtyler/56b0f8b8b89f592fd30f3b46c0bfbaa6)
- [wp-config-local.php](https://gist.github.com/comtyler/a8b77f261a4b4e26837788c4f1c742b8)

:thumbsup: :neckbeard:

### Tools

- **Gulp** - A simple build tool for compiling SASS and Javascript dependencies
- **Bootstrap (popper.js)** - A front-end framework written in SASS and jQuery
- **jQuery** - A Javascript framework for speeding script development

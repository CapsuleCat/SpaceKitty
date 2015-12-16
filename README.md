Space Kitty
===========

An opinionated command line utility for quickly creating Meteor projects.

```
npm install -g space-kitty
```

# Gettings Started

```
mpm install -g space-kitty
kitty meow
kitty create MyProject
cd MyProject
meteor
```

# Opinions

* CamelCase file names and class names
* React is used for views
* Namespaced components are the norm
* Automatic BEM classnames
* SCSS
* Materialize
* Flow Router for routing

# Commands

## kitty meow

Make sure you have the CLI installed correctly, should just print `Meow` to the stdout.

## kitty create ProjectName

This command will copy the project scaffolding into `./ProjectName`.

## kitty make:view [Namespace] ViewName

This command will create a module consisting of:

```
client
└──components
    └──[Namespace]
        └── ViewName
            ├── ViewName.jsx
            └── _ViewName.scss
```

It will also add an import statement to `client/styles/main.scss` to import your new
`.scss` file.

## kitty make:command [Namespace] CommandName [server|client|(both)]

This command will create a command (defaults to both a client and server):

```
lib
└──commands
    └──[Namespace]
        └── CommandName.js
```

## kitty make:collection [Namespace] CollectionName [--self-publishes] [--with-schema]

This command will create a Mongo Collection:

```
lib
└──collections
    └──[Namespace]
        └── CollectionName.js
```

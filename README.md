Space Kitty
===========

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

An [opinionated](http://stackoverflow.com/questions/802050/what-is-opinionated-software) command line utility for quickly creating Meteor projects.

```
npm install -g space-kitty
```

# Getting Started

```
mpm install -g space-kitty
kitty meow
kitty create MyProject
cd MyProject
meteor
```

# Opinions

* CamelCase file names and class names (except for migrations, which are timestamps and dashed)
* React is used for views
* Namespaced components are the norm
* Automatic BEM classnames
* SCSS
* Materialize
* Flow Router for routing
* [percolate:migrations](https://atmospherejs.com/percolate/migrations) for data migrations

# Opinion Reasoning

* There is no reason to pick CamelCase over dash delimited. However, much of the community uses CamelCase.
* Migrations are dashed because of the timestamp that proceeds them.
* React is a very thin and flexible view layer.
* Blaze is being deprecated by MDG.
* BEM is used to keep in the spirit of React styles.
* BEM keeps a shallow hierarchy, making CSS faster to render.
* SCSS is used due to the shortcomings of inline React styles, namely psuedo-selectors and media queries are not supported.
* Materialize is included by default, feel free to swap this out with no repercussions.
* Flow Router is preferred over Iron Router within the Meteor community.
* Percolate migrations were chosen due to their popularity and simplicity.

# Commands

* [meow](#meow)
* [create](#create)
* [make:collection](#makecollection)
* [make:command](#makecommand)
* [make:migration](#makemigration)
* [make:view](#makeview)
* [remind-me](#remind-me)

### meow

```sh
kitty meow
```

Make sure you have the CLI installed correctly, should just print `Meow` to the stdout.

## create

```sh
kitty create ProjectName
```

This command will copy the project scaffolding into `./ProjectName`.

## make:collection

```sh
kitty make:collection [Namespace] CollectionName [--self-publishes] [--with-schema] [--local] [--class]
```

This command will create a Mongo Collection:

```
lib
└──collections
    └──[Namespace]
        └── CollectionName.js
```

## make:command

```sh
kitty make:command [Namespace] CommandName [server|client|(both)]
```

This command will create a command (defaults to both a client and server):

```
lib
└──commands
    └──[Namespace]
        └── CommandName.js
```

You can then call your command using `dispatch(CommandName, arg1, arg2)` or `dispatchAsync(CommandName, arg1, arg2, callback);`.

## make:meteor-method

```sh
kitty make:meteor-method [Namespace] MethodName
```

This command will create a new file containing a single Meteor method.

```
server
└──methods
    └──[Namespace]
        └── MethodName.js
```

The side-effect of using this command is that you will have many different files with one Meteor method in each of them, which is different than how most developers are used to writing Meteor methods.

## make:migration

```sh
kitty make:migration [Namespace] MigrationName
```

This command will create a Migration using [percolate:migrations](https://atmospherejs.com/percolate/migrations):

```
server
└──migrations
    └──[Namespace]
        └── timestamp-migration-name.js
```

Migrations are automatically versioned by the timestamp of when they were created.

The migration package and project scaffolding will not be created until you create your first migration. The `.meteor/packages` files will have `percolate:migrations` added to it if does not already exist. `server/RunMigrations.js` will automatically be created if it does not already exist.

## make:view

```sh
kitty make:view [Namespace] ViewName
```

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

## remind-me

Space Kitty is there for you by having reminders on how to do common stuff:

```sh
remind-me:meteor-call
remind-me:react-loops
```


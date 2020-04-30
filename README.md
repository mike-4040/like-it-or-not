# Like It or Or Not

Simple app to let User save and retrieve their experience.
## [Try it](https://ka-mk-lion.herokuapp.com/)
Just create and account and use the app.

## Admin login
If you want to check admin functionality use email: `admin@lion.com` and password: `admin`.


## Motivation
How often you ware staring on the menu in the restaurant trying to remember the item you enjoyed last time or looking at the shelf at the wine store with "What was that great wine I've tried in Donovan's?" in your head?

You like something (or not) - make a note, next time when you considering ordering / buying something check your records.

We are building an app to let you keep track of your experience and check it with ease.


## Local install

### Prerequisite - MongoDB
You will need MongoDB installed if you want to run this application locally.

Follow the instruction from
````
https://docs.mongodb.com/manual/administration/install-community/
````

### Installing

Git clone the repository to your local machine: 

```
git clone https://github.com/mike-4040/like-it-or-not.git
```

Next, cd into the repository you cloned and install the necessary dependencies by running:
````
$ npm i
````

Set environment variables. Follow the instruction in:
````
.env.instruction
````

You will then be able to start the app locally by runnning:
````
$ npm start
````

## Stack
### Front
- react - javascript ui library
- material-ui - component library
- formik - form helper
- yup - validation

### Back
- node - javascript runtime
- express - web framework for node
- passport - authentication middleware for express
- joi - validation
- bcrypt - password hashing and validation
- mongodb - nosql database
- mongoose - mongo object modelling

### Dev
- jest - unit testing
- cypress - end to end testing
- heroku - hosting
- mlab - mongo db hosting
- hithub - version control, project
- jsdoc - documentation

## Authors

See the list of [contributors](https://github.com/mike-4040/like-it-or-not/graphs/contributors) who participated in this project along with individual commit history. 

## Planned updates

At the moment, this app is a work in process.

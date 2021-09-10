![alt filmOpediaAngularLogo](https://github.com/danielvonboros/filmopedia-angular-client/blob/master/src/assets/filmopediaAngularLogo.png?raw=true)

<p>The Angular client to: Not just another internet movie database</p>

<hr>

<p>Angular frontend application for <a href="https://github.com/danielvonboros/filmOpedia">filmopedia API</a></p>
<p>Client side single page application</p>

### Description

Internet movie database that allows registered users to browse movies by Title, Genre, Director.
Users can change their username, email adress and birthday. While browsing the movies collection, users can add movies to their list of favorites.

### Tools used

| Property          | Tool             |
| ----------------- | ---------------- |
| Language          | TypeScript       |
| Library           | Angular          |
| Library           | RxJS             |
| Route handling    | Angular          |
| Styling Framework | Angular Material |

### Dependencies

<ul>
<li>angular</li>
<li>rxjs</li>
<li>tslib</li>
<li>parcel-bundler</li>
<li>prop-types</li>
<li>react-dom</li>
<li>react-router-dom</li>
<li>babel</li>
</ul>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.4.

### User Stories

<ul>
<li>As a user, I want to be able to access information on movies, directors, and genres so that I
can learn more about movies I’ve watched or am interested in.</li>
<li>As a user, I want to be able to create a profile so I can save data about my favorite movies</li>
</ul>

### Application functions

The Filmopedia Application provides a collection of movies, that can be viewed by registered users. User data is also stored in a collection and API calls are made

### Setting up the tools:

First up, make sure you have Angular CLI installed globally. Angular CLI is the command line tool that is used to create the application, its components and make it accessible in your browser.

Do this by typing

```
$ npm install --global @angular/cli@latest
```

in your terminal

You can now download the repo to your computer, install the necessary modules by running:

```
$ npm install
```

Make sure there were no errors installing the necessary modules to your application.

### Start the application

Now start the development server by typing

```
$ ng serve
```

The console shows you the port on which the application is rendered. If your browser, doesn't open automatically, open it manually and navigate to the URL given in the terminal, in most cases: http://localhost:4200.
The app will automatically reload if you change any of the source files.

### Building additional components

To build a component, run

```
$ ng generate component <name of the component to create>
```

### Build the project

Type

```
$ ng build
```

in the console to build the project. The build files will be stored in the /dist directory.

### Unit Tests

To run unit-tests with [Karma](https://karma-runner.github.io), type

```
$ ng test
```

into the console.

### End-to-end tests

End to end tests can be started by typing

```
$ run e2e
```

in the console.

### Additional help

To get more help on the Angular CLI use

```
$ ng help
```

or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

### App structure

```
    filmOpedia-angular-client

    App
    |_  welcome-page
        |
        |_  user-registration-form
        |_  user-login-form
            |_  navbar
                |
                |_  movie-card
                |   |_  synopsis-card
                |   |_  genre-card
                |   |_  director-card
                |
                |_  favorites
                |   |_  synopsis-card
                |   |_  genre-card
                |   |_  director-card|
                |
                |_  profile-view
                    |_  profile-edit

```

#### Essential features of the Components

welcome-page

<ul>
<li>the landing page on the main route (/)</li>
<li>gives users the opportunity to navigate to either login or registration</li>
</ul>
login-view
<ul>
<li>Allows users to log in with a username and password</li>
</ul>
registration-view
<ul>
<li>Allows new users to register (username, password, email, birthday)</li>
</ul>
navbar
<ul>
<li>Logout a user</li>
<li>Return to home screen</li>
<li>Go to favorite movies</li>
<li>Go to user profile</li>
</ul>
movie-card
<ul>
<li>Returns a list of ALL movies to the user (each listed item with an image, title, and description)</li>
<li>Ability to select a movie for more details</li>
<li>Allows users to add a movie to their list of favorites</li>
</ul>
favorites
<ul>
<ul>Allows users to have a look at their favorite movies</li>
<li>Allows users to remove a movie from their list of favorites</li>
</ul>
profile-view
<ul>
<li>Allows users to view their profile information</li>
<li>Provides a link to the profile-edit</li>
</ul>
profile-edit
<ul>
<li>Allows users to update their user info (username, password, email, date of birth)</li>
<li>Allows existing users to deregister</li>
</ul>
genre-view
<ul>
<li>Returns data about a genre, with a name and description</li>
</ul>
director-view
<ul>
<li>Returns data about a director (name, bio, birth year, death year)</li>
</ul>

### Contact me!

Get in touch! Contact me <a href="https://linkedin.com/in/daniel-von-boros-92878a186">here</a> to talk about collaborations.

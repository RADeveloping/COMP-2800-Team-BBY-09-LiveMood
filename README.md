# LiveMood
* [Overview](#overview)
* [Team Information](#team-information)
* [Technologies Used](#technologies-used)
* [Hosting](#hosting)
* [File Structure](#file-structure)
* [To Do List](#to-do-list)

## Overview
LiveMood is a web application, made to track the user's mood, receive activity suggestions based on their mood. It is a group project for the 5-week CST course COMP 2800, at BCIT.

LiveMood also has a groups feature, where user can join or create groups, then view the average score for the whole group.

This team project demonstrates:
* Mobile responsiveness on various pages
* Create, read, update and delete data with firestore, a non-SQL database
* Use of firebase authentication and creation of users collection in firestore
* Handling of asynchronous in JavaScript

## Team Information
The team consists of two CST term 2 students [Laura Gillespie](https://github.com/legillespie5). and [Kyle Herrmann](https://github.com/kyle-herrmann)., and two CST term 1 students [Rahim Askarzadeh](https://github.com/RADeveloping) and [Jason Pan](https://github.com/Spoonzio). 

As a team, we developed this web application, using the Agile development process. This process had our team face new challenges and requirements weekly. In which, we vanquished through with daily scrums and weekly sprint planning.

## Technologies Used
Technologies that were used for this project:
* HTML, CSS
* JavaScript
* [Firebase Hosting](https://firebase.google.com/products/hosting)
* [Firebase Authentication ](https://firebase.google.com/products/auth)
* [Firebase Firestore Database](https://firebase.google.com/products/firestore)
* [JQuery](https://jquery.com/)
* [Bootstrap 4.0](https://getbootstrap.com/)
* [Bootstrap Theme - SB Admin 2](https://github.com/BlackrockDigital/startbootstrap-sb-admin-2)
* Social Media Share Integration
* Third-parties API ([Google Map](https://developers.google.com/maps/documentation) and [COVID-19 Data by Kyle Redelinghuys](https://covid19api.com/))

## Hosting
LiveMood is hosted publicly at [https://livemood-a14e0.web.app](https://livemood-a14e0.web.app). 

## File Structure
Content of the project folder:

```
 Top-level of project folder: 
├── .gitignore                   # Git ignore file
├── README.md

Firebase hosting files: 
├── .firebaserc                  # Firebase file
├── firebase.json                # Firebase file
├── firestore.indexes.json       # Firebase file
├── firestore.rules              # Rules for read/write to firestore

It has the following subfolders and files:
└── public
    ├── images                   # Folder for images and icons
    ├── scripts                  # Folder of scripts for various pages
        ├── config               # Configuration of dependencies
        ├── controllers          # The logic of the app, events and main functions
        ├── model                # The application's dynamic data structure
        └── views                # Representation of information
    ├── styles                   # Folder for styles
    ├── 404.html                 # File to display error
    ├── about.html               # An about us page, description of the app and our team
    ├── activity.html            # Display activities for users 
    ├── editProfile.html         # Page to edit and save your own profile info
    ├── forgot-password.html     # A page to edit account password
    ├── groups.html              # Perform group actions (CRUD)
    ├── index.html               # Landing page for the website
    ├── login.html               # Login form for the user to access the app
    ├── signup.html              # Register form for account creation
    └── survey.html              # Daily survey to capture users mood


```

## To Do List:
### Group Activity Suggestion 
* Based on the score of the group, suggests activities to all members for the day. 
### Dashboard and Groups Page Graph Improvement
* Make the graph more responsive - Allow user to select a custom time range.
* The interface was intended to be optimized for portrait as well as landscape view, however due to time constraints this was not fully implemented as intended. When viewing the dashboard, please adjust the view accordingly before using any of it's features.
Thank you for understanding and I apologize for the inconvenience.
## Installation:
Simply clone the repository from GitHub, and open public/index.html to begin. No credential required.

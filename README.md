# Our-First-ToDo

For this lab, we're going to embark on a very common path that web developers start off on new technologies with: creating a to-do list! You will create a to-do list data module for this lab lab, and test it yourself.

The major concepts of this lab are:

<li>Seperating concerns into different modules:</li>
<li><li>Database connection in one module</li></li>
Collections defined in another
Data manipulation in another
Further practicing the usage of promises for asynchronous code
Continuing our exercises of only linking these modules together as needed
Packages you will use:
You will use the uuid package in order to generate unique id's to use as your identifiers. You can read up on uuid (Links to an external site.)Links to an external site. on the Github project page. You may use either v4 or v1 ids.

You will also use the mongodb (Links to an external site.)Links to an external site. package.

You may use the lecture 4 code (Links to an external site.)Links to an external site. as a guide.

You must save all dependencies to your package.json file

Database Structure
You will use a database with the following organization:

The database will be called lab4
The collection for todo items will be called todoItems
todo.js
In todo.js, you will create and export four methods:

createTask(title, description);

This function will return a promise that resolves to a newly created to-do list object, with the following properties:

# Our-First-ToDo

For this lab, we're going to embark on a very common path that web developers start off on new technologies with: creating a to-do list! You will create a to-do list data module for this lab lab, and test it yourself.

The major concepts of this lab are:

<li>Seperating concerns into different modules:</li>
   <blockquote>Database connection in one module</blockquote>
    <li>Collections defined in another</li>
    <li>Data manipulation in another</li>
<li>Further practicing the usage of promises for asynchronous code</li>
<li>Continuing our exercises of only linking these modules together as needed</li>
<br><strong>Packages you will use:</strong></br>
You will use the <a href="https://www.npmjs.com/package/uuid">uuid</a> package in order to generate unique id's to use as your identifiers. You can read up on uuid (Links to an external site.)Links to an external site. on the Github project page. You may use either v4 or v1 ids.

You will also use the <a href="https://mongodb.github.io/node-mongodb-native/">mongodb</a>. Links to an external site. package.

You may use the <a href="https://github.com/Stevens-CS546/CS-546-WS-Summer-1/tree/master/Lecture%20Code/lecture_04">lecture 4 code</a> as a guide.

You must save all dependencies to your package.json file

<br><strong>Database Structure</strong></br>
You will use a database with the following organization:
The database will be called <strong>lab4</strong>
The collection for todo items will be called <strong>todoItems</strong>

<br><strong>todo.js</strong></br>
In todo.js, you will create and export four methods:

<br><strong>createTask(title, description);</strong></br>

This function will return a promise that resolves to a newly created to-do list object, with the following properties:
<code><pre>
{
    _id: "a unique identifier for the task; you will generate these using uuid package",
    title: "the title of the task",
    description: "a descriptive bio of the task",
    completed: false,
    completedAt: null
}   
</pre></code>
This task will be stored in the <strong>todoItems</strong> collection.
Important Note: <strong>you will create and set the <code>_id</code> field in the <code>createTask</code> method.</strong>
Important Note: as you can tell, the parameters only provide a title and description. You must still set the other fields before inserting them into the database.
If the task cannot be created, the method should reject.
You would use it as:
<code><pre>
const todoItems = require("./todo");

let createdTask = todoItems.createTask("My First Task", "This is the first thing I need to do today");

createdTask.then((newTask) => {
    console.log(newTask);
});
</pre></code>
<br><strong>getAllTasks();</strong></br>
This function will return a promise that resolves to an array of all tasks in the database.

<br><strong>getTask(id);</strong></br>

This function will return a promise that resolves to a task from the database, when given an id. For example, you would use this method as:
If no id is provided, the method should return a rejected promise.
If the task does not exist, the method should return a rejected promise.
<pre><code>
const todoItems = require("./todo");

let taskPromise = todoItems.getTask("9714a17c-f228-49e9-a772-9086f5ff8bfb");

taskPromise.then((task) => {
    console.log(task);
})
</code></pre>

<br><strong>completeTask(taskId)</strong></br>
This function will modify the task in the database. It will set <code>completed</code> to <code>true</code> and <code>completedAt</code> to the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date">current time</a>.
If no id is provided, the method should return a rejected promise.
If the task cannot be updated (does not exist, etc), the method should reject.
<pre><code>
const todoItems = require("./todo");

let taskPromise = todoItems.getTask("9714a17c-f228-49e9-a772-9086f5ff8bfb");

let finishedTask = taskPromise.then((task) => {    
    return todoItems.completeTask(task._id);    
});

finishedTask.then((task) => {
    console.log(task);
});
</code></pre>

Important note: for now, in completeTask you will want to get the task from the database, update the task in your JS code, and then run the update command.

If you would like to do something more advanced, you may also research using the $set (Links to an external site.)Links to an external site. command to accomplish this as well.

<br><strong>removeTask(id)</strong></br>
This function will remove the task from the database.
If no id is provided, the method should return a rejected promise.
If the task cannot be removed (does not exist), the method should reject.
<pre><code>
const todoItems = require("./todo");

let removeTask = todoItems.removeTask("9714a17c-f228-49e9-a772-9086f5ff8bfb");

let tryToGetTask = removeTask.then(() => {
    return todoItems.getTask("9714a17c-f228-49e9-a772-9086f5ff8bfb");
});

tryToGetTask.catch((error) => {
    // Should error out
    console.error(error);
})
</code></pre>

<br><strong>app.js</strong></br>
For your app.js file, you will:

<br><strong>1. Create a task with the following details:</strong></br>
<pre><code>
{
    title: "Ponder Dinosaurs",
    description: "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?"
}
</code></pre>
<br><strong>2. Log the task, and then create a new task with the following details:</strong></br>
<pre><code>
{
    title: "Play Pokemon with Twitch TV",
    description: "Should we revive Helix?"
}
</code></pre>
<strong>3. After the task is inserted, query all tasks and log them</strong>
<strong>4. After all the tasks are logged, remove the first task</strong>
<strong>5. Query all tasks and log them</strong>
<strong>6. Complete the remaining task</strong>
<strong>7. Query and log the remaining task.</strong>

<br><strong>General Requirements</strong></br>
1. You must not submit your node_modules folder
2. You must remember to save your dependencies to your package.json folder
3. You must do basic error checking in each function
    1. Check for arguments existing and of proper type.
    2. Throw if anything is out of bounds (ie, trying to perform an incalculable math operation or accessing data that does        not exist)
    3. If a function should return a promise, you will either throw inside of the Promise constructor or return a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject">rejected promise</a>.
4. You must remember to update your package.json file to set <code>app.js</code> as your starting script!
5. You must submit a zip, rar, tar.gz, or .7z archive or you will lose points, named in the followign format: <code>LastName_FirstName_CS546_SECTION.zip</code> (or, whatever the file extension may be). You will lose points for not submitting an archive.

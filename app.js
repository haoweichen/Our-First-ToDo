const todoList = require("./todo");
const connection = require("./mongoConnection");


//1. Create a task with the following details:
var firstTaskId;
var firstTask = {
    title: "Ponder Dinosaurs",
    description: "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?"
};

var addFirstTask = todoList.createTask(firstTask.title,firstTask.description)
						.then((data,err) => {
							firstTaskId = data._id;
							console.log(data);															
						});

//2. Log the task, and then create a new task with the following details:
var secondTask = {
    title: "Play Pokemon with Twitch TV",
    description: "Should we revive Helix?"
};

var addSecondTask = addFirstTask.then(() => {
    return todoList.createTask(secondTask.title,secondTask.description)
						.then((data) => {
						});				
})

//3. After the task is inserted, query all tasks and log them
var getAllTask = addSecondTask.then(() => {
	return todoList.getAllTasks()
					.then((data) => {
							data.toArray((err,dataArr) => {
								console.log(dataArr);
							});							
						});				
});

//4. After all the tasks are logged, remove the first task
var removeFirstTask = getAllTask.then(() => {
	//console.log(firstTaskId);
	return todoList.removeTask(firstTaskId).then(()=>{
		//console.log("id:"+firstTaskId+" delete suceess");
	});
						
});

//5. Query all tasks and log them
var getAllTaskSec = removeFirstTask.then(()=>{

	return todoList.getAllTasks()
					.then((data) => {
							remainTask = data;
							data.toArray((err,dataArr) => {
								console.log(dataArr);
							});							
						});				
});

//6. Complete the remaining task
var runCompleteTask = getAllTaskSec.then(()=>{
		return todoList.getAllTasks()
					.then((data) => {
							//console.log(data);
							data.toArray((err,dataArr) => {
								for (var i = dataArr.length - 1; i >= 0; i--) {
									todoList.completeTask(dataArr[i]['_id'],dataArr[i]['title'],dataArr[i]['description']);
									//console.log(dataArr[i]['_id']+':complete');
								};
													
								//7. Query and log the remaining task.
								todoList.getAllTasks()
									.then((data) => {
											data.toArray((err,dataArr) => {
												console.log(dataArr);
											});							
										})
									.then(() => {
											return connection();
										}).then((db) => {
											return db.close();
										});	
							})							
						});									 
});





const mongoCollections = require("./mongoCollections");
const todoItems = mongoCollections.todoItems;
const moment = require('moment');


var exportedMethods = {
    // This is a fun new syntax that was brought forth in ES6, where we can define
    // methods on an object with this shorthand!
    getTask(id) {
        if (!id || typeof id != "string") 
            return Promise.reject("You must provide an id to search for");
        
        return todoItems().then((taskCollection) => {  
           
           return taskCollection.findOne({_id: id});
            // taskCollection.findOne({_id:id},(err,data) => {
            //     console.log(2222,id,data,2222);
            //     findOneResult = data;}
            //     );
            // return findOneResult;
        });
    },
    getAllTasks() {
        return todoItems().then((taskCollection) => {
            return taskCollection.find();
        });
    },
    createTask(title, description) {
        if (!title || typeof title != "string" ) 
            return Promise.reject("You must provide title, title has to be a string");
        
        if (!description || typeof description != "string") 
            return Promise.reject("You must provide title, title has to be a string");
                
        
        return todoItems().then((taskCollection) => {
            
            //generate a id
            var nodeUuid = require('node-uuid');   
            var uuid = nodeUuid.v1();

            if(!uuid || typeof uuid!="string"){
                return Promise.reject("uuid generate error");
            }

            let newTask = {
                _id: uuid,
                title: title,
                description: description,
                completed: false,
                completedAt: null
            };

            return taskCollection
                .insertOne(newTask)
                .then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                })
                .then((newId) => {
                     return this.getTask(newId);
                 });
        });
    },
    removeTask(id) {
        if (!id) 
            return Promise.reject("You must provide an id to search for");
        
        return todoItems().then((taskCollection) => {
            return taskCollection
                .removeOne({_id: id})
                .then((deletionInfo) => {
                    if (deletionInfo.deletedCount === 0) {
                        throw(`Could not delete task with id of ${id}`)
                    }
                });
        });
    },
    completeTask(taskId,title,description) {
        if (!taskId) 
            return Promise.reject("You must provide an id to search for");
        
        return todoItems().then((taskCollection) => {
            var currentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            var updatedTask = {
                title:title,
                description:description,
                completed: true,
                completedAt: currentTime,
            };
            
            return taskCollection.updateOne({
                _id: taskId
            }, updatedTask,(err,data)=>{})
            .then((id) => {

                return this.getTask(id);
            });
        });
    },
}

module.exports = exportedMethods;


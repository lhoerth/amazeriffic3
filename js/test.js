// arrange objects in to headings by tags
var toDoObjects = [
	{
		"description" : "Make Pie",
		"tags" : [ "food", "chores" ]
	},
	{
		"description" : "Get groceries",
		"tags" : [ "shopping", "chores" ]
	},
	{
		"description" : "Make up some new ToDos",
		"tags" : [ "writing", "work" ]
	},
	{
		"description" : "Prep for Monday's class",
		"tags" : [ "work", "teaching" ]
	},
	{
		"description" : "Answer emails",
		"tags" : [ "work" ]
	},
	{
		"description" : "Take Gracie to the park",
		"tags" : [ "chores", "pets" ]
	},
	{
		"description" : "Finish writing this book",
		"tags" : [ "writing", "work" ]
	}
];

// gets array of unique tags from the toDos
var organizeByTags = function(toDoObjects){
	console.log("organizeByTags called!");
	
	// array of tags
	var tags = [];
	
	// iterate over all toDos to check all their tags
	toDoObjects.forEach(function(toDo){
		// iterate over each tag in current toDo to see if we need it
		toDo.tags.forEach(function(tag){
			/* make sure the current tag is not already
			** an element in the array of unique tags before pushing it*/
			if (tags.indexOf(tag) === -1){
				tags.push(tag);
			}
		});
	});
	console.log("Unique tags in list: ");
	console.log(tags);
	
	// build array of tag objects having toDos for corresponding tag
	var tagObjects = tags.map(function(tag){
		// empty array for toDos
		var toDosWithTag = [];
		toDoObjects.forEach(function(toDo){
			// check if current tag is member of current toDo
			if (toDo.tags.indexOf(tag) !== -1){
				// push it to list of toDos under current tag
				toDosWithTag.push(toDo.description);
			}
		});		
		
		// each tag is mapped to a toDo associated with it
		return {"name": tag, "toDos": toDosWithTag};
	});
	console.log("tag objects:");
	for(i in tagObjects){
		console.log(tagObjects[i]);
	}
};

var main = function(){
	"use strict";
	
	organizeByTags(toDoObjects);
};

$(document).ready(main);
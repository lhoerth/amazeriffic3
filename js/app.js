/**
 * Logan Hoerth - lhoerth@mail.greenriver.edu
 * JavaScript code for "Amazeriffic 3" - 2/2/2015
 * This is the third iteration of the fake website 
 * Amazeriffic! from Semmy Purewal's Learning Web App Development 
 * book. This version reads the todo list information from a JSON file.
 * */
 
// This function gets array of unique tags from the toDos
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
	return tagObjects;
};

var main = function (toDoObjects) {
	"use strict";
	
	// this was the staged todo list from amazeriffic 2--just an array
	/*
	** var toDos = [
	**"Finish writing this book",
	**"Take Gracie to the park",
	**"Answer emails",
	**"Prep for Monday's class",
	**"Make up some new ToDos",
	**"Get Groceries"
	**];
	*/
	
	// Here's how we'll make a new array still compatible:
	var toDos = toDoObjects.map(function(toDo){
		//return just description parts from each todos.json element
		return toDo.description;
	});
	
	// tab click handling
	$(".tabs a span").toArray().forEach(function(element) {
		// for each tab
		// setup each click event
		$(element).on("click", function() {
			var $element = $(element), //to not keep recreating $(element)
			$content, // html element inserted.
			$input, // Input field 
			$button, // and button for 3rd tab
			i; // iterator index for looping
			
			$(".tabs span").removeClass("active"); // remove active from all tabs
			$element.addClass("active"); // add active to clicked tab
			$("main .content").empty(); // clear the present tab contents
			
			// Specific tab click behaviors...
			// 1st tab:
			if ($element.parent().is(":nth-child(1)")) {
				console.log("FIRST TAB CLICKED!"); // some debugging
				$content = $("<ul>"); // content will consist of a ul
				for (i = toDos.length-1; i >= 0; i--) {
					//console.log(toDos[i]);
					// add li elements to the ul for each ToDo item
					$content.append($("<li>").text(toDos[i]));
				}
				// Put the content in the main content section
				$("main .content").append($content);
			// 2nd tab:
			} else if ($element.parent().is(":nth-child(2)")) {
				console.log("SECOND TAB CLICKED!");
				$content = $("<ul>");
				// append list items from todo
				toDos.forEach(function (todo) {
					$content.append($("<li>").text(todo));
				});
				$("main .content").append($content);
			// new 3rd (tags) tab:
			} else if ($element.parent().is(":nth-child(3)")){
				console.log("tags tab clicked!");
				 
				// New way: arrange objects in to headings by tags
				var organizedByTag = organizeByTags(toDoObjects);
				
				/*OLD WAY: 
				[
					{
						"name": "shopping",
						"toDos": ["Get groceries"]
					},					
					{	
						"name": "chores",
						"toDos": ["Get groceries", "Take Gracie to the park", "Make Pie"]
					},
					{
						"name": "writing",
						"toDos": ["Make up some new ToDos", "Finish writing this book"]
					},
					{
						"name": "work",
						"toDos": ["Make up some new ToDos", "Prep for Monday's class", "Answer emails", "Finish writing this book"]
					},
					{
						"name": "teaching",
						"toDos": ["Prep for Monday's class"]
					},
					{
						"name": "pets",
						"toDos": ["Take Gracie to the park"]
					},
					{
						"name": "food",
						"toDos": ["Make Pie"]
					}
				];*/
				//
				
				// Make headings and lists for each tag; append to main section
				organizedByTag.forEach(function(tag){
					var $tagName = $("<h3>").text(tag.name),
						$content = $("<ul>");
					
					// list item for each desc in current tag
					tag.toDos.forEach(function(description){
						var $li = $("<li>").text(description);
						$content.append($li);
					});
					
					$("main .content").append($tagName);
					$("main .content").append($content);
				});
			// Was 3rd tab, now 4th tab (Add):
			} else if ($element.parent().is(":nth-child(4)")) {
				console.log("FOURTH TAB CLICKED!");
				// present an input box and button
				$input = $("<input type='text'>");
				$button = $("<button>").text("+");
				
				// when clicked, push input value onto toDos array
				$button.on("click", function() {
					// but only if the field isn't empty
					if ($input.val() !== "") {
						toDos.push($input.val());
						$input.val(""); // then reset the field
					}
				});
				
				// Put the input, then the button, into a div and tack it onto the main content
				$content = $("<div>").append($input, $button);
				$("main .content").append($content);
			}
			return false;
		});
	});
	
	// default to first tab
	$(".tabs a:first-child span").trigger("click");
};

/* when the DOM's ready, get the todo objects from 
** todos.json and pass them to function main. */
$(document).ready(function(){
	$.getJSON("todos.json", function(toDoObjects) {
		main(toDoObjects);
	});
});

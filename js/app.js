/**
 * Logan Hoerth - lhoerth@mail.greenriver.edu
 * JavaScript code for "Amazeriffic 3" - 2/2/2015
 * This is the third iteration of the fake website 
 * Amazeriffic! from Semmy Purewal's Learning Web App Development 
 * book. This version reads the todo list information from a JSON file.
 * */
 
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
			// 3rd tab:
			} else if ($element.parent().is(":nth-child(3)")) {
				console.log("THIRD TAB CLICKED!");
				// present an input box and button
				var $input = $("<input type='text'>");
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
$(document).ready(function() {
	$getJSON("todos.json", function(toDoObjects) {
		main(toDoObjects);
	});
}


/**
 * The following code is for the JQueryUI accordian on faq.html
 * */
 
 $(function() {
    $( "#accordion" ).accordion({
      event: "click hoverintent"
    });
  });
 
  /*
   * hoverIntent | Copyright 2011 Brian Cherne
   * http://cherne.net/brian/resources/jquery.hoverIntent.html
   * modified by the jQuery UI team
   */
  $.event.special.hoverintent = {
    setup: function() {
      $( this ).bind( "mouseover", jQuery.event.special.hoverintent.handler );
    },
    teardown: function() {
      $( this ).unbind( "mouseover", jQuery.event.special.hoverintent.handler );
    },
    handler: function( event ) {
      var currentX, currentY, timeout,
        args = arguments,
        target = $( event.target ),
        previousX = event.pageX,
        previousY = event.pageY;
 
      function track( event ) {
        currentX = event.pageX;
        currentY = event.pageY;
      };
 
      function clear() {
        target
          .unbind( "mousemove", track )
          .unbind( "mouseout", clear );
        clearTimeout( timeout );
      }
 
      function handler() {
        var prop,
          orig = event;
 
        if ( ( Math.abs( previousX - currentX ) +
            Math.abs( previousY - currentY ) ) < 7 ) {
          clear();
 
          event = $.Event( "hoverintent" );
          for ( prop in orig ) {
            if ( !( prop in event ) ) {
              event[ prop ] = orig[ prop ];
            }
          }
          // Prevent accessing the original event since the new event
          // is fired asynchronously and the old event is no longer
          // usable (#6028)
          delete event.originalEvent;
 
          target.trigger( event );
        } else {
          previousX = currentX;
          previousY = currentY;
          timeout = setTimeout( handler, 100 );
        }
      }
 
      timeout = setTimeout( handler, 100 );
      target.bind({
        mousemove: track,
        mouseout: clear
      });
    }
  };

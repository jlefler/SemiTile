/*
 * TODO: License
 *
 *
*/
var curGrid = "1x3";
var gridRows = 1;
var gridColumns = 3;

function setGridSize(rows, columns) {
    curGrid = rows + "x" + columns;
    gridRows = rows;
    gridColumns = columns;
    print("curGrid set to " + curGrid);
}

function moveTo(client, row, column) {
    //size window
    var geo = client.geometry;
    var width = workspace.workspaceWidth / gridColumns;
    var height = workspace.workspaceHeight / gridRows;
    
    //move window
    var left = column * (workspace.workspaceWidth / gridColumns);
    var top = row * (workspace.workspaceHeight / gridRows);
    geo.width = width;
    geo.height = height;
    geo.x = left;
    geo.y = top;
    client.geometry = geo;
    
    //print("Effective moveResult for " + row + ", " + column + ":  " + width + "x" + height + " at " + left + ", " + top);
}

    
/*global registerUserActionsMenu*/
registerUserActionsMenu(function (client) {
	"use strict";
    
    var gridMenu = {
			text: "Choose Grid",
			items: [{
					text: "1x3",
					checkable: true,
					checked: curGrid === "1x3",
					triggered: function() {
						setGridSize(1, 3);
					}
			},
			{
				text: "2x3",
				checkable: true,
				checked: curGrid === "2x3",
				triggered: function() {
                    setGridSize(2, 3);
				}
			},
			{
				text: "1x4",
				checkable: true,
				checked: curGrid === "1x4",
				triggered: function() {
					setGridSize(1, 4);
				}
			},
			{
                text: "2x4",
                checkable: true,
                checked: curGrid === "2x4",
                triggered: function() {
                    setGridSize(2, 4);
                }
			}]
		};
        
        var moveItems = [];
        print("Step 3 - " + curGrid);
        for (row = 0; row < gridRows; row++) {
            for (column = 0; column < gridColumns; column++) {
                print("Row: " + row + ", Column: " + column);
                var newItem = {
                    text: "Move to " + (row + 1) + "x" + (column + 1),
                    checkable: false,
                    checked: false,
                    triggered: (function() {
                        var localRow = row;
                        var localColumn = column;
                        var localClient = client;
                        return function() {
                            moveTo(localClient, localRow, localColumn);
                        }
                    })()
                };
                moveItems.push(newItem);
            }
        }
        
        var windowMenu = {
            text: "Move Window",
            items: moveItems
        };
        
        var allMenu = {
            text: "SemiTile",
            items: [gridMenu, windowMenu]
        };
        
        return allMenu;
	});



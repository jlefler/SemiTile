/*
 * Copyright 2018 Josh Lefler. <jlefler@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
*/
function moveTo(client, column, row, columnMode, rowMode) {
    //size window
    var geo = client.geometry;
    var width = workspace.workspaceWidth / columnMode;
    var height = workspace.workspaceHeight / rowMode;
    
    //move window
    var left = column * (workspace.workspaceWidth / columnMode);
    var top = row * (workspace.workspaceHeight / rowMode);
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
        
        var modeMenus = [];
        
        for (columnMode = 2; columnMode < 5; columnMode++) {
            for (rowMode = 1; rowMode < 4; rowMode++) {
                var moveItems = [];
                for (column = 0; column < columnMode; column++) {
                    for (row = 0; row < rowMode; row++) {
                        var newItem = {
                            text: "Column " + (column + 1) + ", Row " + (row + 1),
                            checkable: false,
                            checked: false,
                            triggered: (function() {
                                var localColumn = column;
                                var localRow = row;
                                var localClient = client;
                                var localColumnMode = columnMode;
                                var localRowMode = rowMode;
                                return function() {
                                    moveTo(localClient, localColumn, localRow, localColumnMode, localRowMode);
                                }
                            })()
                        };
                        moveItems.push(newItem);
                    }
                }
                var modeMenu = {
                    text: columnMode + " Columns, " + rowMode + " Rows",
                    items: moveItems
                };
                modeMenus.push(modeMenu);
            }
        }
        
        
        var allMenu = {
            text: "SemiTile",
            items: modeMenus
        };
        
        return allMenu;
	});



const gameWindow = document.querySelector("#game-window");

// a class used to define the player
class Player {
    constructor(level, location) {
        this.level = level;
        this.location = location;
    }
}
// a class used to define objects the player will come across
class Item {
    constructor(name, location) {
        this.name = name;
        this.location = location;
    }
}

class Enemy extends Item {
    constructor(name, location, moveDirection, spaces) {
        super(name, location);
        this.moveDirection = moveDirection;
        this.spaces = spaces;
    }
}

class Chest extends Item {
    constructor(name, location, containsKey) {
        super(name, location);
        this.containsKey = containsKey;
    }
}

//Defines how movement works for the player or possibly AI
function move(event, objs) {
    if (event.keyCode == 38 && player.location.y != 0) {
        player.location.y -= 25;
        if (spaceOccupied(objs)) {
            player.location.y += 25;
        }
    } else if (event.keyCode == 39 && player.location.x != 575) {
        player.location.x += 25;
        if (spaceOccupied(objs)) {
            player.location.x -= 25;
        }
    } else if (event.keyCode == 40 && player.location.y != 575) {
        player.location.y += 25;
        if (spaceOccupied(objs)) {
            player.location.y -= 25;
        }
    } else if (event.keyCode == 37 && player.location.x != 0) {
        player.location.x -= 25;
        if (spaceOccupied(objs)) {
            player.location.x += 25;
        }
    }
}

// Determines if the player triggers game over
function isDead(enemy) {
    if (
        enemy.location.y == player.location.y &&
        enemy.location.x == player.location.x
    ) {
        return true;
    }
}

// Determines if a space has an object on it
function spaceOccupied(objs) {
    for (obj of objs) {
        if (
            obj.location.y == player.location.y &&
            obj.location.x == player.location.x
        ) {
            return true;
        }
    }
}
// helper function used to generate walls quickly
function generateWall(number, startCoordinates, direction, room, objectsList) {
    let pos = { x: startCoordinates.x, y: startCoordinates.y };
    for (i = 0; i < number; i++) {
        let wall = new Item("wall", { x: pos.x, y: pos.y });
        if (direction == "horizontal") {
            pos.x += 25;
        } else if (direction == "vertical") {
            pos.y += 25;
        }
        objectsList.push(wall);
        placeItem(wall, room);
    }
}

//places a list of items onto the screen
function placeItems(objs, room) {
    for (obj of objs) {
        placeItem(obj, room);
    }
}

// places an item onto the screen
function placeItem(obj, room) {
    let item = document.createElement("div");
    item.classList.add(obj.name);
    room.appendChild(item);
    item.style.top = obj.location.y + "px";
    item.style.left = obj.location.x + "px";
}

function moveGuard(enemy, room) {
    let selector = "." + enemy.name;
    let timer = 1;
    let totalTrip = enemy.spaces * 2 + 1;
    setInterval(() => {
        if (timer == totalTrip) {
            timer = 1;
        } else if (timer > enemy.spaces) {
            $(selector).remove();
            if (enemy.moveDirection == "left") {
                enemy.location.x += 25;
            } else if (enemy.moveDirection == "right") {
                enemy.location.x -= 25;
            } else if (enemy.moveDirection == "up") {
                enemy.location.y += 25;
            } else if (enemy.moveDirection == "down") {
                enemy.location.y -= 25;
            }

            placeItem(enemy, room);
            timer++;
        } else if (timer <= enemy.spaces) {
            $(selector).remove();
            if (enemy.moveDirection == "left") {
                enemy.location.x -= 25;
            } else if (enemy.moveDirection == "right") {
                enemy.location.x += 25;
            } else if (enemy.moveDirection == "up") {
                enemy.location.y -= 25;
            } else if (enemy.moveDirection == "down") {
                enemy.location.y += 25;
            }
            placeItem(enemy, room);
            timer++;
        }
        if (isDead(enemy)) {
            console.log("dead");
        }
    }, 800);
}

// puts in the startroomtemplate
function renderStartRoom(win) {
    let source = document.querySelector("#start-room-template").innerHTML;
    win.innerHTML = source;
}

//allows the player to move
function playerAction(objs) {
    document.addEventListener("keydown", event => {
        move(event, objs);
        document.querySelector(".player").style.top = player.location.y + "px";
        document.querySelector(".player").style.left = player.location.x + "px";
    });
}

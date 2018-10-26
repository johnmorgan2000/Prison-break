const gameWindow = document.querySelector("#game-window");

// a class used to define the player
class Player {
    constructor(level, location, hasKey) {
        this.level = level;
        this.location = location;
        this.hasKey = hasKey;
    }
}
// a class used to define objects the player will come across
class Item {
    constructor(name, id, location) {
        this.name = name;
        this.location = location;
        this.id = id;
    }
}

class Enemy extends Item {
    constructor(name, id, location) {
        super(name, id, location);
    }
}

class Chest extends Item {
    constructor(name, id, location, hasKey) {
        super(name, id, location);
        this.hasKey = hasKey;
    }
}

//determines if the player is at the chest
function atObject(objs, name) {
    for (obj of objs) {
        if (obj.name == name) {
            if (
                (player.location.x == obj.location.x - 25 &&
                    obj.location.y == player.location.y) ||
                (player.location.x == obj.location.x + 25 &&
                    obj.location.y == player.location.y) ||
                (player.location.y == obj.location.y - 25 &&
                    obj.location.x == player.location.x) ||
                (player.location.y == obj.location.y + 25 &&
                    obj.location.x == player.location.x)
            ) {
                return true;
            }
        }
    }
}

function openChest(obj, event) {
    if (event.keyCode == 67) {
        if (obj.hasKey) {
            player.hasKey = true;
            obj.hasKey = false;
            playerDialog("#keyFound");
        } else {
            if (player.hasKey) {
                playerDialog("#hasKey");
            } else {
                playerDialog("#noKey");
            }
        }
    }
}

//Defines how movement works for the player or possibly AI
function move(player, event, objs) {
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

function placePlayer() {}

// Determines if the player triggers game over
function isDead(enemy) {
    if (
        enemy.location.y == player.location.y &&
        enemy.location.x == player.location.x
    ) {
        renderGameOver(gameWindow);
    }
}

function reloadLevel() {
    if (player.level == 1) {
        startRoom();
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
        let wall = new Item("wall", "", { x: pos.x, y: pos.y });
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
    item.setAttribute("id", obj.id);
    room.appendChild(item);
    item.style.top = obj.location.y + "px";
    item.style.left = obj.location.x + "px";
}

//moves the guard enemy
function moveEnemy(enemy, direction, spaces) {
    let enemyDiv = document.getElementById(enemy.id);
    let timer = 1;
    let totalTrip = spaces * 2 + 1;
    let speed = 500;
    if (direction == "left") {
        setInterval(() => {
            if (timer == totalTrip) {
                timer = 0;
            } else if (timer > spaces) {
                enemy.location.x += 25;
            } else if (timer <= spaces) {
                enemy.location.x -= 25;
            }
            timer++;
            isDead(enemy);

            enemyDiv.style.left = enemy.location.x + "px";
        }, speed);
    } else if (direction == "right") {
        setInterval(() => {
            if (timer == totalTrip) {
                timer = 0;
            } else if (timer > spaces) {
                enemy.location.x -= 25;
            } else if (timer <= spaces) {
                enemy.location.x += 25;
            }
            timer++;
            isDead(enemy);
            enemyDiv.style.left = enemy.location.x + "px";
        }, speed);
    } else if (direction == "up") {
        setInterval(() => {
            if (timer == totalTrip) {
                timer = 0;
            } else if (timer > spaces) {
                enemy.location.y += 25;
            } else if (timer <= spaces) {
                enemy.location.y -= 25;
            }
            timer++;
            isDead(enemy);
            enemyDiv.style.top = enemy.location.y + "px";
        }, speed);
    } else if (direction == "down") {
        setInterval(() => {
            if (timer == totalTrip) {
                timer = 0;
            } else if (timer > spaces) {
                enemy.location.y -= 25;
            } else if (timer <= spaces) {
                enemy.location.y += 25;
            }
            timer++;
            isDead(enemy);
            enemyDiv.style.top = enemy.location.top + "px";
        }, speed);
    }
}

// puts in the startroomtemplate
function renderRoom(win) {
    let source = document.querySelector("#room-template").innerHTML;
    win.innerHTML = source;
}

function renderGameOver(win) {
    let source = document.querySelector("#game-over-screen").innerHTML;
    win.innerHTML = source;
}

// function renderDeadScreen(win) {
//     let source = document.querySelector("");
// }

function exitLevel() {
    if (player.hasKey) {
        alert("Level Complete");
    } else {
        playerDialog("#needKey");
    }
}

//allows the player to move
function playerAction(objs, enemies) {
    document.addEventListener("keydown", event => {
        move(player, event, objs);
        document.querySelector(".player").style.top = player.location.y + "px";
        document.querySelector(".player").style.left = player.location.x + "px";
        for (e of enemies) {
            isDead(e);
        }
        if (atObject(objs, "chest")) {
            openChest(obj, event);
        }
        if (atObject(objs, "exit")) {
            if (exitLevel() == true) {
                return true;
            }
        }
    });
}

function playerDialog(message) {
    let container = document.querySelector(".dialog");
    let msg = document.querySelector(message);
    let counter = 0;
    let timer = setInterval(() => {
        if (counter == 10) {
            container.style.display = "none";
            msg.style.display = "none";
            clearInterval(timer);
        } else {
            counter++;
            container.style.display = "block";
            msg.style.display = "block";
        }
    }, 100);
}

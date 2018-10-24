const gameWindow = document.querySelector("#game-window");

class Player {
    constructor(name, level, health, attack, defense, location) {
        this.name = name;
        this.level = level;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.location = location;
    }
}

class Item {
    constructor(name, location) {
        this.name = name;
        this.location = location;
    }
}

function move(event, objs) {
    if (event.keyCode == 38 && player.location.y != 0) {
        player.location.y -= 50;
        if (spaceOccupied(objs)) {
            console.log("yes");
            player.location.y += 50;
        }
    } else if (event.keyCode == 39 && player.location.x != 450) {
        player.location.x += 50;
        if (spaceOccupied(objs)) {
            player.location.x -= 50;
        }
    } else if (event.keyCode == 40 && player.location.y != 450) {
        player.location.y += 50;
        if (spaceOccupied(objs)) {
            player.location.y -= 50;
        }
    } else if (event.keyCode == 37 && player.location.x != 0) {
        player.location.x -= 50;
        if (spaceOccupied(objs)) {
            player.location.x += 50;
        }
    }
}

function spaceOccupied(objs) {
    for (obj of objs) {
        console.log(obj.location);
        console.log(player.location);
        if (
            obj.location.y == player.location.y &&
            obj.location.x == player.location.x
        ) {
            return true;
        }
    }
}

function generateWall(number, startCoordinates, direction, room, objectsList) {
    let pos = { x: startCoordinates.x, y: startCoordinates.y };
    for (i = 0; i < number; i++) {
        let wall = new Item("wall", { x: pos.x, y: pos.y });
        if (direction == "horizontal") {
            pos.x += 50;
        } else if (direction == "vertical") {
            pos.y += 50;
        }
        objectsList.push(wall);
        placeItem(wall, room);
    }
}

function placeItem(obj, room) {
    let item = document.createElement("div");
    console.log(item);
    item.classList.add(obj.name);
    room.appendChild(item);
    item.style.top = obj.location.y + "px";
    item.style.left = obj.location.x + "px";
}

function startRoom() {
    renderStartRoom(gameWindow);
    let room = document.querySelector("#start-room");

    let chest = new Item("chest", { x: 0, y: 50 });

    placeItem(chest, room);
    let objs = [chest];
    generateWall(8, { x: 100, y: 100 }, "vertical", room, objs);
    movePlayer(objs);
}
function renderStartRoom(win) {
    let source = document.querySelector("#start-room-template").innerHTML;
    win.innerHTML = source;
}

function movePlayer(objs) {
    document.addEventListener("keydown", event => {
        move(event, objs);
        document.querySelector(".player").style.top = player.location.y + "px";
        document.querySelector(".player").style.left = player.location.x + "px";
    });
}

const player = new Player("John", 1, 100, 10, 10, { x: 0, y: 0 });
startRoom();

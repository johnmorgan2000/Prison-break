//The first level

function startRoom() {
    renderStartRoom(gameWindow);
    let room = document.querySelector("#start-room");

    let chest = new Chest("chest", { x: 575, y: 50 }, true);
    let guard1 = new Enemy("guard", { x: 125, y: 0 }, "left", 3);

    let enemies = [guard1];
    let objs = [chest];

    generateWall(22, { x: 100, y: 50 }, "vertical", room, objs);
    generateWall(3, { x: 0, y: 25 }, "horizontal", room, objs);
    generateWall(23, { x: 150, y: 0 }, "vertical", room, objs);
    generateWall(3, { x: 0, y: 75 }, "horizontal", room, objs);
    generateWall(3, { x: 0, y: 125 }, "horizontal", room, objs);
    generateWall(3, { x: 0, y: 175 }, "horizontal", room, objs);
    generateWall(3, { x: 0, y: 225 }, "horizontal", room, objs);

    placeItems(enemies, room);
    placeItems(objs, room);

    playerAction(objs);
    moveGuard(guard1, room);
}

const player = new Player(1, { x: 0, y: 0 });
startRoom();

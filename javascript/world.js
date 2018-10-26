//The first level

function startRoom() {
    renderRoom(gameWindow);

    let room = document.querySelector(".room");

    let chest = new Chest("chest", "chest1", { x: 0, y: 50 }, false);
    let chest2 = new Chest("chest", "chest2", { x: 0, y: 150 }, true);
    let exit = new Item("exit", "", { x: 575, y: 575 });
    let guard1 = new Enemy("guard", "guard1", { x: 125, y: 0 });
    let guard2 = new Enemy("guard", "guard2", { x: 75, y: 150 });

    let enemies = [guard1, guard2];
    let objs = [chest, chest2, exit];

    generateWall(22, { x: 100, y: 50 }, "vertical", room, objs);
    generateWall(3, { x: 0, y: 25 }, "horizontal", room, objs);
    generateWall(23, { x: 150, y: 0 }, "vertical", room, objs);
    generateWall(3, { x: 0, y: 75 }, "horizontal", room, objs);
    generateWall(3, { x: 0, y: 125 }, "horizontal", room, objs);
    generateWall(3, { x: 0, y: 175 }, "horizontal", room, objs);
    generateWall(3, { x: 0, y: 225 }, "horizontal", room, objs);
    generateWall(15, { x: 0, y: 225 }, "vertical", room, objs);
    generateWall(15, { x: 25, y: 225 }, "vertical", room, objs);
    generateWall(15, { x: 50, y: 225 }, "vertical", room, objs);
    generateWall(18, { x: 150, y: 550 }, "horizontal", room, objs);

    placeItems(enemies, room);
    placeItems(objs, room);

    playerAction(objs, enemies);
    moveEnemy(guard1, "left", 3);
    moveEnemy(guard2, "up", 4);
}

const player = new Player(1, { x: 0, y: 0 }, false);
startRoom();

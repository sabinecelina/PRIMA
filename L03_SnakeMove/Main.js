"use strict";
var L03_SnakeMove;
(function (L03_SnakeMove) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    let snake;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.Debug.log(canvas);
        snake = new L03_SnakeMove.Snake();
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(50);
        cmpCamera.pivot.rotateY(180);
        L03_SnakeMove.viewport = new ƒ.Viewport();
        L03_SnakeMove.viewport.initialize("Viewport", snake, cmpCamera, canvas);
        ƒ.Debug.log(L03_SnakeMove.viewport);
        document.addEventListener("keydown", hndKeydown);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 5);
    }
    function update(_event) {
        L03_SnakeMove.viewport.draw();
        snake.moveSnake();
        console.log("Loop");
    }
    function hndKeydown(_event) {
        let oldDirection = snake.direction;
        switch (_event.code) {
            case ƒ.KEYBOARD_CODE.ARROW_UP:
                if (oldDirection.equals(ƒ.Vector3.Y(-1))) {
                    snake.direction = oldDirection;
                }
                else {
                    snake.direction = ƒ.Vector3.Y();
                }
                break;
            case ƒ.KEYBOARD_CODE.ARROW_DOWN:
                if (oldDirection.equals(ƒ.Vector3.Y())) {
                    snake.direction = oldDirection;
                }
                else {
                    snake.direction = ƒ.Vector3.Y(-1);
                }
                break;
            case ƒ.KEYBOARD_CODE.ARROW_RIGHT:
                if (oldDirection.equals(ƒ.Vector3.X(-1))) {
                    snake.direction = oldDirection;
                }
                else {
                    snake.direction = ƒ.Vector3.X();
                }
                break;
            case ƒ.KEYBOARD_CODE.ARROW_LEFT:
                if (oldDirection.equals(ƒ.Vector3.X())) {
                    snake.direction = oldDirection;
                }
                else {
                    snake.direction = ƒ.Vector3.X(-1);
                }
                break;
        }
    }
})(L03_SnakeMove || (L03_SnakeMove = {}));
//# sourceMappingURL=Main.js.map
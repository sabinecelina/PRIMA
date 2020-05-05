"use strict";
var L02_SnakeStart;
(function (L02_SnakeStart) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    let snake = new ƒ.Node("snake");
    let snakespeed = new ƒ.Vector3(0.1, -0.1, 0);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.Debug.log(canvas);
        let snake = createSnake();
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(10);
        cmpCamera.pivot.rotateY(180);
        L02_SnakeStart.viewport = new ƒ.Viewport();
        L02_SnakeStart.viewport.initialize("Viewport", snake, cmpCamera, canvas);
        ƒ.Debug.log(L02_SnakeStart.viewport);
        document.addEventListener("keydown", hndKey);
        ƒ.Loop.start();
        L02_SnakeStart.viewport.draw();
        moveSnake();
    }
    function hndKey(_event) {
        switch (_event.code) {
            case ƒ.KEYBOARD_CODE.ARROW_UP:
                snake.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));
                break;
            case ƒ.KEYBOARD_CODE.ARROW_DOWN:
                snake.cmpTransform.local.translate(ƒ.Vector3.Y(-0.3));
                break;
            case ƒ.KEYBOARD_CODE.ARROW_RIGHT:
                snake.cmpTransform.local.translate(ƒ.Vector3.X(0.3));
                break;
            case ƒ.KEYBOARD_CODE.ARROW_LEFT:
                snake.cmpTransform.local.translate(ƒ.Vector3.X(-0.3));
                break;
        }
        moveSnake();
        //Update Rendering ???
        L02_SnakeStart.viewport.draw();
    }
    function moveSnake() {
        snake.cmpTransform.local.translate(snakespeed);
    }
    function createSnake() {
        let mesh = new ƒ.MeshQuad();
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
        for (let i = 0; i < 4; i++) {
            let node = new ƒ.Node("Quad");
            let cmpMesh = new ƒ.ComponentMesh(mesh);
            node.addComponent(cmpMesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));
            let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
            node.addComponent(cmpMaterial);
            node.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(-1 * i, 0, 0))));
            snake.appendChild(node);
        }
        return snake;
    }
})(L02_SnakeStart || (L02_SnakeStart = {}));
//# sourceMappingURL=Main.js.map
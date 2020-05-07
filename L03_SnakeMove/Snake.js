"use strict";
var L03_SnakeMove;
(function (L03_SnakeMove) {
    var ƒ = FudgeCore;
    class Snake extends ƒ.Node {
        constructor() {
            super("Snake");
            this.direction = ƒ.Vector3.X();
            console.log("Creating Snake");
            this.createSegement(4);
        }
        moveSnake() {
            let nodes = this.getChildren();
            let nextTrans = nodes[0].mtxLocal.translation;
            let tempTrans = nodes[0].mtxLocal.translation;
            nodes[0].mtxLocal.translation = ƒ.Vector3.SUM(nextTrans, this.direction);
            for (let i = 1; i < nodes.length; i++) {
                tempTrans = nodes[i].mtxLocal.translation;
                nodes[i].mtxLocal.translation = nextTrans;
                nextTrans = tempTrans;
            }
        }
        createSegement(_segments) {
            let mesh = new ƒ.MeshQuad();
            let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("mediumvioletred")));
            for (let i = 0; i < _segments; i++) {
                let segment = new ƒ.Node("Segment");
                let cmpMesh = new ƒ.ComponentMesh(mesh);
                segment.addComponent(cmpMesh);
                cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));
                let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
                segment.addComponent(cmpMaterial);
                segment.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(-1 * i, 0, 0))));
                this.appendChild(segment);
            }
        }
    }
    L03_SnakeMove.Snake = Snake;
})(L03_SnakeMove || (L03_SnakeMove = {}));
//# sourceMappingURL=Snake.js.map
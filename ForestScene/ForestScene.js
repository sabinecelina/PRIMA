"use strict";
///<reference types="../FudgeCore.js"/> //Path to FudgeCore\
var ExampleSceneForest;
///<reference types="../FudgeCore.js"/> //Path to FudgeCore\
(function (ExampleSceneForest) {
    var ƒ = FudgeCore;
    window.addEventListener("DOMContentLoaded", init);
    let node;
    let camera;
    let viewPort;
    function init() {
        ƒ.RenderManager.initialize();
        createMiniForest();
        viewPort.draw();
        viewPort.showSceneGraph();
    }
    function createMiniForest() {
        let forest = new ƒ.Node("Forest");
        let clrLeaves = new ƒ.Color(0.2, 0.6, 0.3, 1);
        let clrNeedles = new ƒ.Color(0.1, 0.5, 0.3, 1);
        let clrTrunkTree = new ƒ.Color(0.5, 0.3, 0, 1);
        let clrCapMushroomBrown = new ƒ.Color(0.6, 0.4, 0, 1);
        let clrCapMushroomRed = new ƒ.Color(0.5, 0, 0, 1);
        let clrTrunkMushroom = new ƒ.Color(0.9, 0.8, 0.7, 1);
        let clrGround = new ƒ.Color(0.3, 0.6, 0.5, 1);
        let ground = createCompleteMeshNode("Ground", new ƒ.Material("Ground", ƒ.ShaderUniColor, new ƒ.CoatColored(clrGround)), new ƒ.MeshCube());
        let cmpGroundMesh = ground.getComponent(ƒ.ComponentMesh);
        cmpGroundMesh.pivot.scale(new ƒ.Vector3(6, 0.05, 6));
        node = ground;
        createViewport();
        let broadleaf = createBroadleaf("BroadLeaf", clrTrunkTree, clrLeaves, new ƒ.Vector3(0, 0, 0), new ƒ.Vector3(0.2, 0.5, 0.2));
        node.appendChild(broadleaf);
        //Creates a forest of conifers
        for (let i = 1; i <= 5; i++) {
            let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            let conifer = createConifer("Conifer" + i, clrTrunkTree, clrNeedles, new ƒ.Vector3(Math.random() * 3 * plusOrMinus, 0, Math.random() * 3 * plusOrMinus), new ƒ.Vector3(0.2, 0.5, 0.2));
            forest.appendChild(conifer);
        }
        //Creates mushrooms
        for (let i = 1; i <= 4; i++) {
            let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            let mushroomRed = createMushroom("MushroomRed" + i, clrTrunkMushroom, clrCapMushroomRed, new ƒ.Vector3(Math.random() * 2 * plusOrMinus, 0, Math.random() * 2 * plusOrMinus), new ƒ.Vector3(0.1, 0.2, 0.1));
            let mushroomBrown = createMushroom("MushroomBrown" + i, clrTrunkMushroom, clrCapMushroomBrown, new ƒ.Vector3(Math.random() * 2 * plusOrMinus, 0, Math.random() * 2 * plusOrMinus), new ƒ.Vector3(0.1, 0.2, 0.1));
            forest.appendChild(mushroomRed);
            forest.appendChild(mushroomBrown);
        }
        node.appendChild(forest);
    }
    function createCompleteMeshNode(_name, _material, _mesh) {
        let node = new ƒ.Node(_name);
        let cmpMesh = new ƒ.ComponentMesh(_mesh);
        let cmpMaterial = new ƒ.ComponentMaterial(_material);
        let cmpTransform = new ƒ.ComponentTransform();
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);
        node.addComponent(cmpTransform);
        return node;
    }
    function createViewport(_canvas = null) {
        if (!_canvas) {
            _canvas = document.createElement("canvas");
            _canvas.width = 800;
            _canvas.height = 600;
            document.body.appendChild(_canvas);
        }
        viewPort = new ƒ.Viewport();
        camera = createCamera();
        viewPort.initialize("viewport", node, camera.getComponent(ƒ.ComponentCamera), _canvas);
    }
    function createCamera(_translation = new ƒ.Vector3(1, 1, 10), _lookAt = new ƒ.Vector3()) {
        let camera = new ƒ.Node("Camera");
        let cmpTransform = new ƒ.ComponentTransform();
        cmpTransform.local.translate(_translation);
        cmpTransform.local.lookAt(_lookAt);
        camera.addComponent(cmpTransform);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.projectCentral(1, 45, ƒ.FIELD_OF_VIEW.DIAGONAL);
        camera.addComponent(cmpCamera);
        return camera;
    }
    function createBroadleaf(_name, _clrTrunk, _clrTop, _pos, _scale) {
        let tree = new ƒ.Node(_name);
        let treeTrunk = createCompleteMeshNode("TreeTrunk", new ƒ.Material("TrunkTree", ƒ.ShaderUniColor, new ƒ.CoatColored(_clrTrunk)), new ƒ.MeshCube);
        let cmpTrunkMesh = treeTrunk.getComponent(ƒ.ComponentMesh);
        cmpTrunkMesh.pivot.scale(_scale);
        cmpTrunkMesh.pivot.translateY(_scale.y / 2);
        let treeTop = createCompleteMeshNode("TreeTop", new ƒ.Material("TreeTop", ƒ.ShaderUniColor, new ƒ.CoatColored(_clrTop)), new ƒ.MeshCube);
        let cmpTreeTopMesh = treeTop.getComponent(ƒ.ComponentMesh);
        cmpTreeTopMesh.pivot.scale(new ƒ.Vector3((_scale.x * 2), (_scale.y * 3), (_scale.z * 2)));
        cmpTreeTopMesh.pivot.translateY((_scale.y * 2));
        tree.appendChild(treeTop);
        tree.appendChild(treeTrunk);
        tree.addComponent(new ƒ.ComponentTransform);
        tree.cmpTransform.local.translate(_pos);
        return tree;
    }
    function createConifer(_name, _clrTrunk, _clrTop, _pos, _scale) {
        let tree = new ƒ.Node(_name);
        let treeTrunk = createCompleteMeshNode("TreeTrunk", new ƒ.Material("TrunkTree", ƒ.ShaderUniColor, new ƒ.CoatColored(_clrTrunk)), new ƒ.MeshCube);
        let cmpTrunkMesh = treeTrunk.getComponent(ƒ.ComponentMesh);
        cmpTrunkMesh.pivot.scale(_scale);
        cmpTrunkMesh.pivot.translateY(_scale.y / 2);
        let treeTop = createCompleteMeshNode("TreeTop", new ƒ.Material("TreeTop", ƒ.ShaderUniColor, new ƒ.CoatColored(_clrTop)), new ƒ.MeshPyramid);
        let cmpTreeTopMesh = treeTop.getComponent(ƒ.ComponentMesh);
        cmpTreeTopMesh.pivot.scale(new ƒ.Vector3((_scale.x * 2), (_scale.y * 3), (_scale.z * 2)));
        cmpTreeTopMesh.pivot.translateY((_scale.y / 2));
        tree.appendChild(treeTop);
        tree.appendChild(treeTrunk);
        tree.addComponent(new ƒ.ComponentTransform);
        tree.cmpTransform.local.translate(_pos);
        return tree;
    }
    function createMushroom(_name, _clrTrunk, _clrCap, _pos, _scale) {
        let mushroom = new ƒ.Node(_name);
        let mushroomTrunk = createCompleteMeshNode("MushroomTrunk", new ƒ.Material("MushroomTrunk", ƒ.ShaderUniColor, new ƒ.CoatColored(_clrTrunk)), new ƒ.MeshCube);
        let cmpMesh = mushroomTrunk.getComponent(ƒ.ComponentMesh);
        cmpMesh.pivot.scale(_scale);
        cmpMesh.pivot.translateY(_scale.y / 2);
        let mushroomCap = createCompleteMeshNode("MushroomCapRed", new ƒ.Material("MushroomCapRed", ƒ.ShaderUniColor, new ƒ.CoatColored(_clrCap)), new ƒ.MeshCube);
        let cmpCapMesh = mushroomCap.getComponent(ƒ.ComponentMesh);
        cmpCapMesh.pivot.scale(new ƒ.Vector3((_scale.x * 2), (_scale.y - 0.05), (_scale.z * 2)));
        cmpCapMesh.pivot.translateY((_scale.y));
        mushroom.appendChild(mushroomCap);
        mushroom.appendChild(mushroomTrunk);
        mushroom.addComponent(new ƒ.ComponentTransform);
        mushroom.cmpTransform.local.translate(_pos);
        return mushroom;
    }
})(ExampleSceneForest || (ExampleSceneForest = {}));
//# sourceMappingURL=ForestScene.js.map
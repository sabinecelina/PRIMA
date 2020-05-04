namespace L02_SnakeStart {
  import ƒ = FudgeCore;

  window.addEventListener("load", hndLoad);
  export let viewport: ƒ.Viewport;
  let snake: ƒ.Node = new ƒ.Node("snake");
  let snakespeed: ƒ.Vector3 = new ƒ.Vector3(0.1, -0.1, 0);

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    ƒ.Debug.log(canvas);
    let snake: ƒ.Node = createSnake();
    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(10);
    cmpCamera.pivot.rotateY(180);

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", snake, cmpCamera, canvas);
    ƒ.Debug.log(viewport);
    document.addEventListener("keydown", hndKey);
    ƒ.Loop.start();
    viewport.draw();
    moveSnake();

  }
  function hndKey(_event: KeyboardEvent): void {
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
    viewport.draw();
  }
  function moveSnake(): void {
    snake.cmpTransform.local.translate(snakespeed);
  }

  function createSnake(): ƒ.Node {

    let mesh: ƒ.MeshQuad = new ƒ.MeshQuad();
    let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));

    for (let i: number = 0; i < 4; i++) {
      let node: ƒ.Node = new ƒ.Node("Quad");

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
      node.addComponent(cmpMesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
      node.addComponent(cmpMaterial);

      node.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(-1 * i, 0, 0))));

      snake.appendChild(node);
    }
    return snake;
  }
}
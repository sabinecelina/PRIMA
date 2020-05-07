namespace L03_SnakeMove {
  import ƒ = FudgeCore;

  window.addEventListener("load", hndLoad);
  export let viewport: ƒ.Viewport;
  let snake: Snake;

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    ƒ.Debug.log(canvas);

    snake = new Snake();

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(50);
    cmpCamera.pivot.rotateY(180);

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", snake, cmpCamera, canvas);
    ƒ.Debug.log(viewport);
    document.addEventListener("keydown", hndKeydown);
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 5);
  }

  function update(_event: ƒ.Eventƒ): void {
    viewport.draw();
    snake.moveSnake();
    console.log("Loop");
  }
  function hndKeydown(_event: KeyboardEvent): void {
    let oldDirection: ƒ.Vector3 = snake.direction;
    switch (_event.code) {
      case ƒ.KEYBOARD_CODE.ARROW_UP:
        if (oldDirection.equals(ƒ.Vector3.Y(-1))) {
          snake.direction = oldDirection;
        } else {
          snake.direction = ƒ.Vector3.Y();
        }
        break;
      case ƒ.KEYBOARD_CODE.ARROW_DOWN:
        if (oldDirection.equals(ƒ.Vector3.Y())) {
          snake.direction = oldDirection;
        } else {
          snake.direction = ƒ.Vector3.Y(-1);
        }
        break;
      case ƒ.KEYBOARD_CODE.ARROW_RIGHT:
        if (oldDirection.equals(ƒ.Vector3.X(-1))) {
          snake.direction = oldDirection;
        } else {
          snake.direction = ƒ.Vector3.X();
        }
        break;
      case ƒ.KEYBOARD_CODE.ARROW_LEFT:
        if (oldDirection.equals(ƒ.Vector3.X())) {
          snake.direction = oldDirection;
        } else {
          snake.direction = ƒ.Vector3.X(-1);
        }
        break;
    }
  }
}
namespace L03_SnakeMove {
  import ƒ = FudgeCore;

  export class Snake extends ƒ.Node {
    public direction: ƒ.Vector3 = ƒ.Vector3.X();

    constructor() {
      super("Snake");
      console.log("Creating Snake");
      this.createSegement(4);
    }

    public moveSnake(): void {
      let nodes: ƒ.Node[] = this.getChildren();
      let nextTrans: ƒ.Vector3 = nodes[0].mtxLocal.translation;
      let tempTrans: ƒ.Vector3 = nodes[0].mtxLocal.translation;

      nodes[0].mtxLocal.translation = ƒ.Vector3.SUM(nextTrans, this.direction);
      for (let i: number = 1; i < nodes.length; i++) {
        tempTrans = nodes[i].mtxLocal.translation;
        nodes[i].mtxLocal.translation = nextTrans;
        nextTrans = tempTrans;
      }
    }

    private createSegement(_segments: number): void {
      let mesh: ƒ.MeshQuad = new ƒ.MeshQuad();
      let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("mediumvioletred")));

      for (let i: number = 0; i < _segments; i++) {
        let segment: ƒ.Node = new ƒ.Node("Segment");

        let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
        segment.addComponent(cmpMesh);
        cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));

        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        segment.addComponent(cmpMaterial);

        segment.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(-1 * i, 0, 0))));

        this.appendChild(segment);
      }
    }
  }
}
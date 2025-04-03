import type LogicFlow from "@logicflow/core";
import { CurvedEdge, CurvedEdgeModel } from "@logicflow/extension";

class SmoothCurvedEdge extends CurvedEdge {}

class SmoothCurvedEdgeModel extends CurvedEdgeModel {
  initEdgeData(data: LogicFlow.EdgeData) {
    super.initEdgeData(data);
    this.radius = 20;
  }
}

export const SmoothCurved = {
  type: "smoothCurvedEdge",
  model: SmoothCurvedEdgeModel,
  view: SmoothCurvedEdge,
};

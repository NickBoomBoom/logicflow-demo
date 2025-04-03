import LogicFlow, {
  BaseNodeModel,
  EllipseNode,
  EllipseNodeModel,
  RectNode,
  RectNodeModel,
  type Model,
} from "@logicflow/core";

enum NODE_LEVEL {
  ROOT,
  SECOND,
  THREE,
}
export enum NODE_TYPE {
  ROOT = "root",
  SKILL = "skill",
  KNOWLEDGE = "knowledge",
  EXAMPLE = "example",
  DOT = "dot",
}
const INFO_MAP = {
  ROOT: {
    level: NODE_LEVEL.ROOT,
    includes: [NODE_LEVEL.SECOND],
    canDelete: false,
  },
  SECOND: {
    level: NODE_LEVEL.SECOND,
    includes: [NODE_LEVEL.ROOT, NODE_LEVEL.SECOND, NODE_LEVEL.THREE],
    canDelete: true,
  },
  THREE: {
    level: NODE_LEVEL.THREE,
    includes: [NODE_LEVEL.SECOND],
    canDelete: true,
  },
};

const commonModelConnectRule: Model.ConnectRule = {
  message: "该两个节点之间禁止连接",

  validate: (
    source?: BaseNodeModel,
    target?: BaseNodeModel,
    sourceAnchor?: Model.AnchorConfig,
    targetAnchor?: Model.AnchorConfig,
    /**
     * REMIND: 调整的边的 id
     * 在开启 adjustEdgeStartAndEnd 后调整边连接的节点时会传入
     * 详见：https://github.com/didi/LogicFlow/issues/926#issuecomment-1371823306
     */
    edgeID?: string
  ) => {
    const pinfo = (source as any).__info__;
    const cinfo = (target as any).__info__;
    // console.log(
    //   pinfo,
    //   cinfo,
    //   55555,
    //   source,
    //   target,
    //   sourceAnchor,
    //   targetAnchor,
    //   edgeID
    // );
    return pinfo.includes.includes(cinfo.level);
  },
};

class SecondRect extends RectNodeModel {
  __info__ = INFO_MAP.SECOND;

  setAttributes(): void {
    const { width } = this;
    const PADDING_X = 5;
    this.width = width + PADDING_X * 2;
    this.style = {
      rx: 10,
      ry: 10,
      strokeWidth: 5,
      stroke: "#FFA400",
      fill: "#FFA400",
    };
  }
  getConnectedSourceRules(): Model.ConnectRule[] {
    const rules = super.getConnectedSourceRules();
    rules.push(commonModelConnectRule);
    return rules;
  }
  getTextStyle(): LogicFlow.TextNodeTheme {
    return {
      fontSize: 14,
      overflowMode: "autoWrap",
      color: "#ffffff",
    };
  }
}

class RootRect extends RectNodeModel {
  __info__ = INFO_MAP.ROOT;

  setAttributes(): void {
    const { width } = this;
    const PADDING_X = 20;
    this.width = width + PADDING_X * 2;
    this.style = {
      rx: 10,
      ry: 10,
      strokeWidth: 5,
      stroke: "#FF6503",
      fill: "#FF6503",
    };
  }
  getConnectedSourceRules(): Model.ConnectRule[] {
    const rules = super.getConnectedSourceRules();
    rules.push(commonModelConnectRule);
    return rules;
  }
  getTextStyle(): LogicFlow.TextNodeTheme {
    return {
      fontSize: 14,
      overflowMode: "autoWrap",
      color: "#ffffff",
    };
  }
}
class DotEllipse extends EllipseNodeModel {
  __info__ = INFO_MAP.THREE;

  setAttributes(): void {
    this.rx = 35;
    this.ry = 35;
    this.style = {
      strokeWidth: 10,
      fill: "#74b9ff",
      stroke: "#74b9ff",
    };
  }

  getConnectedSourceRules(): Model.ConnectRule[] {
    const rules = super.getConnectedSourceRules();
    rules.push(commonModelConnectRule);
    return rules;
  }
  getTextStyle(): LogicFlow.TextNodeTheme {
    return {
      fontSize: 14,
      overflowMode: "autoWrap",
      color: "#ffffff",
    };
  }
}

export const customRects = [
  {
    type: NODE_TYPE.ROOT,
    view: RectNode,
    model: RootRect,
  },
  {
    type: NODE_TYPE.SKILL,
    view: RectNode,
    model: SecondRect,
  },
  {
    type: NODE_TYPE.KNOWLEDGE,
    view: RectNode,
    model: SecondRect,
  },
  {
    type: NODE_TYPE.EXAMPLE,
    view: RectNode,
    model: SecondRect,
  },
  {
    type: NODE_TYPE.DOT,
    view: EllipseNode,
    model: DotEllipse,
  },
];

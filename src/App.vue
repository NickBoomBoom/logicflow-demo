<template>
  <div class="home">
    <div class="home-l">
      <h3>块区</h3>
      <div class="block">
        <div
          v-for="item in list"
          @mousedown="handleDragItem(item)"
          style="
            border: 2px solid red;
            padding: 5px;
            margin-right: 10px;
            cursor: grab;
            user-select: none;
          "
        >
          {{ item.text }}
        </div>
      </div>
      <div class="container" ref="containerRef"></div>
    </div>

    <div class="home-r">
      <h3>操作</h3>
      <div style="margin: 10px 0">
        <button @click="preview">载入数据</button>
        <button @click="getData">获取数据</button>
        <button @click="clear">清空</button>
        <button @click="openEdit">编辑</button>
        <button @click="prev">上一步</button>
        <button @click="next">下一步</button>
      </div>

      <h3>数据JSON展示(点击获取数据)</h3>

      <div class="scroll-box">
        <JsonViewer
          :value="jsonData"
          copyable
          expanded
          :expandDepth="6"
          boxed
          sort
          theme="jv-light"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogicFlow from "@logicflow/core";
import "@logicflow/core/lib/style/index.css";
import { onMounted, ref } from "vue";
import { customRects, NODE_TYPE } from "./core/node";
import { SmoothCurved } from "./core/line";
import { Menu } from "@logicflow/extension";
import "@logicflow/extension/lib/style/index.css";
LogicFlow.use(Menu);

const containerRef = ref();
let lf: LogicFlow;
const jsonData = ref("");
const config: Partial<LogicFlow.Options> = {
  isSilentMode: false,
  edgeTextEdit: false,
  keyboard: {
    enabled: true,
    shortcuts: [
      {
        keys: ["backspace"],
        callback: () => {
          const els = lf.getSelectElements(true);
          const { edges, nodes } = els;
          lf.clearSelectElements();
          edges.forEach((edge) => lf.deleteEdge(edge.id));
          nodes.forEach((node) => {
            const isCanDelete = ![NODE_TYPE.ROOT].includes(node.type);
            if (isCanDelete) {
              lf.deleteNode(node.id);
            } else {
              alert("当前元素不可删除");
            }
          });
        },
      },
      {
        keys: ["cmd + z", "ctrl + z"],
        callback: () => {
          console.log(34444);
          lf.undo();
        },
      },
      {
        keys: ["cmd + y", "ctrl + y"],
        callback: () => {
          lf.redo();
        },
      },
    ],
  },
  grid: {
    size: 20,
    visible: true,
    type: "mesh",
    config: {
      color: "#ababab",
      thickness: 1,
    },
  },
  // plugins: [Menu],
};

const list = ref([
  {
    type: NODE_TYPE.ROOT,
    text: "主题",
    id: "root-1",
    properties: {
      isNew: true,
      _source: {
        a: 1,
        b: 2,
      },
    },
  },
  {
    type: NODE_TYPE.SKILL,
    text: "技能",
    id: "skill-1",
    properties: {
      _source: {
        a: 1,
        b: 2,
      },
    },
  },
  {
    type: NODE_TYPE.KNOWLEDGE,
    text: "知识点",
    id: "knowledge-1",
    properties: {
      _source: {
        a: 1,
        b: 2,
      },
    },
  },
  {
    type: NODE_TYPE.EXAMPLE,
    text: "案例",
    id: "example-1",
    properties: {
      _source: {
        a: 1,
        b: 2,
      },
    },
  },
  {
    type: NODE_TYPE.DOT,
    text: "技能点",
    id: "dot-1",
    properties: {
      _source: {
        a: 1,
        b: 2,
      },
    },
  },
]);
onMounted(() => {
  lf = new LogicFlow({
    ...config,
    container: containerRef.value,
  });
  lf.batchRegister([...customRects, SmoothCurved]);
  lf.setDefaultEdgeType("smoothCurvedEdge");

  lf.render({});

  lf.setTheme({
    baseEdge: {
      stroke: "#000000",
      strokeWidth: 2,
    },
    anchor: {
      stroke: "#000000",
      fill: "#FFFFFF",
      r: 8,
      hover: {
        fill: "#949494",
        fillOpacity: 0.5,
        stroke: "#949494",
        r: 12,
      },
    },
  });
  lf.on("connection:not-allowed", ({ data, msg }) => {
    console.error(3333, data, msg);
    alert(msg);
  });
  lf.on("node:delete", (data) => {
    console.log(333, data);
  });
  lf.on("text:update", (...arg) => {
    console.log(3333, arg);
  });
});

function handleDragItem(node: any) {
  lf?.dnd.startDrag(node);
}

function getData() {
  const data = lf.getGraphData();
  jsonData.value = data;
}

function preview() {
  const data = {
    nodes: [
      {
        id: "root-1",
        type: "root",
        x: 358,
        y: 160,
        properties: {
          isNew: true,
          _source: {
            a: 1,
            b: 2,
          },
          width: 180,
          height: 80,
        },
        text: {
          x: 358,
          y: 160,
          value: "主题",
        },
      },
      {
        id: "skill-1",
        type: "skill",
        x: 189,
        y: 305,
        properties: {
          _source: {
            a: 1,
            b: 2,
          },
          width: 120,
          height: 80,
        },
        text: {
          x: 189,
          y: 305,
          value: "技能",
        },
      },
      {
        id: "knowledge-1",
        type: "knowledge",
        x: 358,
        y: 308,
        properties: {
          _source: {
            a: 1,
            b: 2,
          },
          width: 120,
          height: 80,
        },
        text: {
          x: 358,
          y: 308,
          value: "知识点",
        },
      },
      {
        id: "example-1",
        type: "example",
        x: 550,
        y: 307,
        properties: {
          _source: {
            a: 1,
            b: 2,
          },
          width: 120,
          height: 80,
        },
        text: {
          x: 550,
          y: 307,
          value: "案例",
        },
      },
      {
        id: "dot-1",
        type: "dot",
        x: 267,
        y: 466,
        properties: {
          _source: {
            a: 1,
            b: 2,
          },
          width: 70,
          height: 70,
        },
        text: {
          x: 267,
          y: 466,
          value: "技能点",
        },
      },
      {
        id: "f8bfeb35-a067-4713-828a-71870b671b70",
        type: "dot",
        x: 459,
        y: 468,
        properties: {
          _source: {
            a: 1,
            b: 2,
          },
          width: 70,
          height: 70,
        },
        text: {
          x: 459,
          y: 468,
          value: "技能点",
        },
      },
    ],
    edges: [
      {
        id: "db5691bb-7a0b-4aef-b8d3-068958bffaf6",
        type: "smoothCurvedEdge",
        properties: {},
        sourceNodeId: "root-1",
        targetNodeId: "knowledge-1",
        sourceAnchorId: "root-1_2",
        targetAnchorId: "knowledge-1_0",
        startPoint: {
          x: 358,
          y: 200,
        },
        endPoint: {
          x: 358,
          y: 268,
        },
        pointsList: [
          {
            x: 358,
            y: 200,
          },
          {
            x: 358,
            y: 268,
          },
        ],
      },
      {
        id: "71bb5fd6-a49b-480d-8f27-0169971ea147",
        type: "smoothCurvedEdge",
        properties: {},
        sourceNodeId: "root-1",
        targetNodeId: "skill-1",
        sourceAnchorId: "root-1_2",
        targetAnchorId: "skill-1_0",
        startPoint: {
          x: 358,
          y: 200,
        },
        endPoint: {
          x: 189,
          y: 265,
        },
        pointsList: [
          {
            x: 358,
            y: 200,
          },
          {
            x: 358,
            y: 235,
          },
          {
            x: 189,
            y: 235,
          },
          {
            x: 189,
            y: 265,
          },
        ],
      },
      {
        id: "b22ca81b-8a3c-4c5a-9d35-394fe2dbee40",
        type: "smoothCurvedEdge",
        properties: {},
        sourceNodeId: "root-1",
        targetNodeId: "example-1",
        sourceAnchorId: "root-1_2",
        targetAnchorId: "example-1_0",
        startPoint: {
          x: 358,
          y: 200,
        },
        endPoint: {
          x: 550,
          y: 267,
        },
        pointsList: [
          {
            x: 358,
            y: 200,
          },
          {
            x: 358,
            y: 237,
          },
          {
            x: 550,
            y: 237,
          },
          {
            x: 550,
            y: 267,
          },
        ],
      },
      {
        id: "4bb13945-cab5-4d8c-b519-da8e0e551ab3",
        type: "smoothCurvedEdge",
        properties: {},
        sourceNodeId: "skill-1",
        targetNodeId: "dot-1",
        sourceAnchorId: "skill-1_2",
        targetAnchorId: "dot-1_0",
        startPoint: {
          x: 189,
          y: 345,
        },
        endPoint: {
          x: 267,
          y: 431,
        },
        pointsList: [
          {
            x: 189,
            y: 345,
          },
          {
            x: 189,
            y: 401,
          },
          {
            x: 267,
            y: 401,
          },
          {
            x: 267,
            y: 431,
          },
        ],
      },
      {
        id: "c4b153f3-fe62-4bc6-b926-211336c34743",
        type: "smoothCurvedEdge",
        properties: {},
        sourceNodeId: "knowledge-1",
        targetNodeId: "dot-1",
        sourceAnchorId: "knowledge-1_2",
        targetAnchorId: "dot-1_0",
        startPoint: {
          x: 358,
          y: 348,
        },
        endPoint: {
          x: 267,
          y: 431,
        },
        pointsList: [
          {
            x: 358,
            y: 348,
          },
          {
            x: 358,
            y: 401,
          },
          {
            x: 267,
            y: 401,
          },
          {
            x: 267,
            y: 431,
          },
        ],
      },
      {
        id: "4ae7a817-0efc-47d6-b493-b2a51d63739b",
        type: "smoothCurvedEdge",
        properties: {},
        sourceNodeId: "knowledge-1",
        targetNodeId: "f8bfeb35-a067-4713-828a-71870b671b70",
        sourceAnchorId: "knowledge-1_2",
        targetAnchorId: "f8bfeb35-a067-4713-828a-71870b671b70_0",
        startPoint: {
          x: 358,
          y: 348,
        },
        endPoint: {
          x: 459,
          y: 433,
        },
        pointsList: [
          {
            x: 358,
            y: 348,
          },
          {
            x: 358,
            y: 403,
          },
          {
            x: 459,
            y: 403,
          },
          {
            x: 459,
            y: 433,
          },
        ],
      },
      {
        id: "3f559364-3630-45dd-aa32-7de028b6becc",
        type: "smoothCurvedEdge",
        properties: {},
        sourceNodeId: "example-1",
        targetNodeId: "f8bfeb35-a067-4713-828a-71870b671b70",
        sourceAnchorId: "example-1_2",
        targetAnchorId: "f8bfeb35-a067-4713-828a-71870b671b70_0",
        startPoint: {
          x: 550,
          y: 347,
        },
        endPoint: {
          x: 459,
          y: 433,
        },
        pointsList: [
          {
            x: 550,
            y: 347,
          },
          {
            x: 550,
            y: 403,
          },
          {
            x: 459,
            y: 403,
          },
          {
            x: 459,
            y: 433,
          },
        ],
      },
    ],
  };
  lf.render(data);
  lf.focusOn(data.nodes[0].id);
}

function clear() {
  lf.clearData();
}

function openEdit() {
  lf.updateEditConfig({
    isSilentMode: false,
  });
}

function next() {
  lf.redo();
}

function prev() {
  lf.undo();
}
</script>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  overflow: hidden;
  padding: 10px 10px;
}
.home-l {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.block {
  display: flex;
  margin: 10px auto;
}

.container {
  flex: 1;
  border: 1px solid grey;
  width: 100%;
  height: 100%;
}

.home-r {
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.scroll-box {
  margin-top: 10px;
  overflow: auto;
  flex: 1;
}
</style>

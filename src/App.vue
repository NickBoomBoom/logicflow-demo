<template>
  <div class="home">
    <div class="home-l">
      <h3>块区</h3>
      <div class="block">
        <div
          v-for="item in list"
          :style="{
            border: `2px solid ${item.properties.style.stroke}`,
            borderRadius: '4px',
          }"
          @mousedown="handleDragItem(item)"
          style="
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
        <button style="margin-right: 10px" @click="preview">载入数据</button>
        <button @click="getData">获取数据</button>
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
import LogicFlow, { distance } from "@logicflow/core";
import "@logicflow/core/lib/style/index.css";
import { onMounted, ref } from "vue";

import { customRects, NODE_TYPE } from "./core/node";

import { SmoothCurved } from "./core/line";
const containerRef = ref();
let lf: LogicFlow;
const jsonData = ref("");
const config: Partial<LogicFlow.Options> = {
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
};

const list = ref([
  {
    type: "rect",
    text: "root1",
    properties: {
      style: {
        stroke: "blue",
      },
    },
  },
  {
    type: "rect",
    text: "root2",
    properties: {
      style: {
        stroke: "blue",
      },
    },
  },
  {
    type: "rect",
    text: "source1",
    properties: {
      style: {
        stroke: "red",
      },
    },
  },
  {
    type: "rect",
    text: "source2",
    properties: {
      style: {
        stroke: "red",
      },
    },
  },
]);
onMounted(() => {
  lf = new LogicFlow({
    ...config,
    container: containerRef.value,
  });
  lf.batchRegister(customRects);
  lf.setDefaultEdgeType("smoothCurvedEdge");
  lf.render({});
  lf.addNode({
    id: "root-10",
    type: NODE_TYPE.ROOT,
    x: 0,
    y: 0,
    text: "主题",
  });

  lf.addNode({
    id: "skill-10",
    type: NODE_TYPE.SKILL,
    properties: {
      b: 1,
      a: 2,
      c: 555,
    },
    x: 0,
    y: 90,
    text: "技能",
  });

  lf.addNode({
    id: "knowledge-10",
    type: NODE_TYPE.KNOWLEDGE,
    x: 250,
    y: 90,
    text: "知识点",
  });
  lf.addNode({
    id: "example-10",
    type: NODE_TYPE.EXAMPLE,
    x: 450,
    y: 90,
    text: "案例",
  });
  lf.addNode({
    id: "dot-10",
    type: NODE_TYPE.DOT,
    x: 40,
    y: 0,
    text: "技能点",
  });

  lf.focusOn({
    id: "root-10",
  });

  lf.setTheme({
    baseEdge: {
      stroke: "#000000",
      strokeWidth: 4,
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
});

function handleDragItem(node: any) {
  lf?.dnd.startDrag(node);
}

function getData() {
  const data = lf.getGraphData();
  jsonData.value = data;
}

function preview() {
  const data = {};
  lf.render(data);
  lf.focusOn("root-10");
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

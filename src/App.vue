<template>
  <div class="home">
    <div class="home-l">
      <h3>
        块区
      </h3>
      <div class="block">
        <div v-for="item in list" :style="{
          border: `2px solid ${item.properties.style.stroke}`,
          borderRadius: '4px'
        }" @mousedown="handleDragItem(item)" style="padding:5px; margin-right: 10px;cursor: grab;
  user-select: none;">
          {{ item.text }}
        </div>
      </div>
      <div class="container" ref="containerRef"></div>

    </div>

    <div class="home-r">
      <h3>操作</h3>
      <div style="margin:10px 0;">
        <button  style="margin-right: 10px;" @click="preview">载入数据</button>
        <button @click="getData">获取数据</button>
      </div>

      <h3>数据JSON展示(点击获取数据)</h3>

      <div class="scroll-box">

        <JsonViewer :value="jsonData" copyable expanded :expandDepth="6" boxed sort theme="jv-light" />
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">


import LogicFlow from "@logicflow/core";
import "@logicflow/core/lib/style/index.css";
import { onMounted, ref } from "vue";
// import "@logicflow/core/dist/style/index.css"; // 2.0版本前的引入方式
const containerRef = ref()
let lf: any = null
const jsonData = ref('')
const config: Partial<LogicFlow.Options> = {
  isSilentMode: false,
  stopScrollGraph: true,
  stopZoomGraph: false,
  textEdit:false,
  style: {
    rect: {
      rx: 5,
      ry: 5,
      strokeWidth: 2,
    },
    circle: {
      fill: '#f5f5f5',
      stroke: '#666',
    },
    ellipse: {
      fill: '#dae8fc',
      stroke: '#6c8ebf',
    },
    polygon: {
      fill: '#d5e8d4',
      stroke: '#82b366',
    },
    diamond: {
      fill: '#ffe6cc',
      stroke: '#d79b00',
    },
    text: {
      color: '#b85450',
      fontSize: 12,
    },
    // 下面的 style 移动到此处，不然会覆盖上面设置的各图形的主题样式
    inputText: {
      background: 'black',
      color: 'white',
    },
  },
};

const list = ref([
  {
    type: 'rect',
    text: 'root1',
    properties:{
      style:{
        stroke:"blue"
      }
    }
  },
  {
    type: 'rect',
    text: 'root2',
    properties:{
      style:{
        stroke:"blue"
      }
    }
  },
  {
    type: 'rect',
    text: 'source1',
    properties:{
      style:{
        stroke:"red"
      }
    }
  },
  {
    type: 'rect',
    text: 'source2',
    properties:{
      style:{
        stroke:"red"
      }
    }
  },
])
onMounted(() => {
  lf = new LogicFlow({
    ...config,
    container: containerRef.value,
    grid: true,
    idGenerator: (type) => {
      return type!+Date.now()
    }
  });
  lf.render();
})

function handleDragItem(node: any) {
  lf?.dnd.startDrag(node);
}

function getData() {
  const data = lf.getGraphData()
  jsonData.value =data
}

function preview() {
  const data = {
  "nodes": [
    {
      "id": "rect1742273971353",
      "type": "rect",
      "x": 142.3333330154419,
      "y": 147,
      "properties": {
        "style": {
          "stroke": "blue"
        },
        "width": 100,
        "height": 80
      },
      "text": {
        "x": 142.3333330154419,
        "y": 147,
        "value": "root1"
      }
    },
    {
      "id": "rect1742273971895",
      "type": "rect",
      "x": 337.3333330154419,
      "y": 179,
      "properties": {
        "style": {
          "stroke": "blue"
        },
        "width": 100,
        "height": 80
      },
      "text": {
        "x": 337.3333330154419,
        "y": 179,
        "value": "root2"
      }
    },
    {
      "id": "rect1742273972431",
      "type": "rect",
      "x": 463.3333330154419,
      "y": 267,
      "properties": {
        "style": {
          "stroke": "red"
        },
        "width": 100,
        "height": 80
      },
      "text": {
        "x": 463.3333330154419,
        "y": 267,
        "value": "source1"
      }
    },
    {
      "id": "rect1742273973824",
      "type": "rect",
      "x": 199.3333330154419,
      "y": 354,
      "properties": {
        "style": {
          "stroke": "red"
        },
        "width": 100,
        "height": 80
      },
      "text": {
        "x": 199.3333330154419,
        "y": 354,
        "value": "source2"
      }
    }
  ],
  "edges": [
    {
      "id": "polyline1742273975872",
      "type": "polyline",
      "properties": {},
      "sourceNodeId": "rect1742273971353",
      "targetNodeId": "rect1742273973824",
      "sourceAnchorId": "rect1742273971353_2",
      "targetAnchorId": "rect1742273973824_0",
      "startPoint": {
        "x": 142.3333330154419,
        "y": 187
      },
      "endPoint": {
        "x": 199.3333330154419,
        "y": 314
      },
      "pointsList": [
        {
          "x": 142.3333330154419,
          "y": 187
        },
        {
          "x": 142.3333330154419,
          "y": 250.5
        },
        {
          "x": 199.3333330154419,
          "y": 250.5
        },
        {
          "x": 199.3333330154419,
          "y": 314
        }
      ]
    },
    {
      "id": "polyline1742273978218",
      "type": "polyline",
      "properties": {},
      "sourceNodeId": "rect1742273971895",
      "targetNodeId": "rect1742273972431",
      "sourceAnchorId": "rect1742273971895_2",
      "targetAnchorId": "rect1742273972431_3",
      "startPoint": {
        "x": 337.3333330154419,
        "y": 219
      },
      "endPoint": {
        "x": 413.3333330154419,
        "y": 267
      },
      "pointsList": [
        {
          "x": 337.3333330154419,
          "y": 219
        },
        {
          "x": 337.3333330154419,
          "y": 249
        },
        {
          "x": 383.3333330154419,
          "y": 249
        },
        {
          "x": 383.3333330154419,
          "y": 267
        },
        {
          "x": 413.3333330154419,
          "y": 267
        }
      ]
    }
  ]
}
lf.render(data)
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
width: 60%;
height: 100%;
display: flex;
flex-direction: column;
}
.block {
  display: flex;
  margin: 10px auto;
}

.container {
  flex:1;
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

<template>
  <div class="home">
    <div class="home-l">
      <h3>
        块区
      </h3>
      <div class="block">
        <div v-for="item in list" @mousedown="handleDragItem(item)" style="padding:5px;border:1px solid black;margin-right: 10px;cursor: grab;
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
  stopZoomGraph: true,
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
    text: 'root1'
  },
  {
    type: 'rect',
    text: 'root2'
  },
  {
    type: 'rect',
    text: 'source1'
  },
  {
    type: 'rect',
    text: 'source2'
  },
])
onMounted(() => {
  lf = new LogicFlow({
    ...config,
    container: containerRef.value,
    grid: true,
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
      "id": "26558521-c078-4468-982f-5ae1b8e09560",
      "type": "rect",
      "x": 271.3333330154419,
      "y": 84.66666412353516,
      "properties": {
        "width": 100,
        "height": 80
      },
      "text": {
        "x": 271.3333330154419,
        "y": 84.66666412353516,
        "value": "root1"
      }
    },
    {
      "id": "11030f2f-9686-420a-a5c2-cde0c2444c72",
      "type": "rect",
      "x": 715.3333330154419,
      "y": 121.66666412353516,
      "properties": {
        "width": 100,
        "height": 80
      },
      "text": {
        "x": 715.3333330154419,
        "y": 121.66666412353516,
        "value": "source1"
      }
    },
    {
      "id": "22aa9fe6-9ea2-471a-8f3a-8303ac1c0c1d",
      "type": "rect",
      "x": 545.3333330154419,
      "y": 250.66666412353516,
      "properties": {
        "width": 100,
        "height": 80
      },
      "text": {
        "x": 545.3333330154419,
        "y": 250.66666412353516,
        "value": "root2"
      }
    }
  ],
  "edges": [
    {
      "id": "19f0cdb3-a97c-46ba-ab3c-44ddf56fbfff",
      "type": "polyline",
      "properties": {},
      "sourceNodeId": "26558521-c078-4468-982f-5ae1b8e09560",
      "targetNodeId": "22aa9fe6-9ea2-471a-8f3a-8303ac1c0c1d",
      "sourceAnchorId": "26558521-c078-4468-982f-5ae1b8e09560_1",
      "targetAnchorId": "22aa9fe6-9ea2-471a-8f3a-8303ac1c0c1d_3",
      "startPoint": {
        "x": 321.3333330154419,
        "y": 84.66666412353516
      },
      "endPoint": {
        "x": 495.3333330154419,
        "y": 250.66666412353516
      },
      "pointsList": [
        {
          "x": 321.3333330154419,
          "y": 84.66666412353516
        },
        {
          "x": 465.3333330154419,
          "y": 84.66666412353516
        },
        {
          "x": 465.3333330154419,
          "y": 250.66666412353516
        },
        {
          "x": 495.3333330154419,
          "y": 250.66666412353516
        }
      ]
    },
    {
      "id": "f6a6e409-2e03-49bf-a6aa-456d51d1ec8c",
      "type": "polyline",
      "properties": {},
      "sourceNodeId": "22aa9fe6-9ea2-471a-8f3a-8303ac1c0c1d",
      "targetNodeId": "11030f2f-9686-420a-a5c2-cde0c2444c72",
      "sourceAnchorId": "22aa9fe6-9ea2-471a-8f3a-8303ac1c0c1d_1",
      "targetAnchorId": "11030f2f-9686-420a-a5c2-cde0c2444c72_3",
      "startPoint": {
        "x": 595.3333330154419,
        "y": 250.66666412353516
      },
      "endPoint": {
        "x": 665.3333330154419,
        "y": 121.66666412353516
      },
      "pointsList": [
        {
          "x": 595.3333330154419,
          "y": 250.66666412353516
        },
        {
          "x": 635.3333330154419,
          "y": 250.66666412353516
        },
        {
          "x": 635.3333330154419,
          "y": 121.66666412353516
        },
        {
          "x": 665.3333330154419,
          "y": 121.66666412353516
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

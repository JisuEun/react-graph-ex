import React, { useState, useEffect } from 'react';
import { ForceGraph2D } from 'react-force-graph';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function initializeGraphData() {
  const nodes = [
    { id: "철수", name: "철수" },
    { id: "영희", name: "영희" },
    { id: "길동", name: "길동" }
  ];
  const links = [
    { source: "철수", target: "영희", relationship: "친구" },
    { source: "영희", target: "철수", relationship: "친구" },
    { source: "영희", target: "길동", relationship: "친구" },
    { source: "길동", target: "영희", relationship: "친구" },
    { source: "길동", target: "철수", relationship: "형제" }
  ];

  // 노드와 링크에 색상 추가
  nodes.forEach(node => {
    node.color = getRandomColor();  // 노드 색상 초기화
  });
  links.forEach(link => {
    link.color = 'black';  // 링크 색상 초기화
  });

  return { nodes, links };
}

function RelationGraph() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    setGraphData(initializeGraphData());  // 그래프 데이터 초기화
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ForceGraph2D
        graphData={graphData}
        nodeAutoColorBy="group"
        nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 12 / globalScale;
            ctx.fillStyle = node.color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 7, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.fillText(label, node.x, node.y);
        }}
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkCanvasObjectMode={() => 'before'}
        linkCanvasObject={(link, ctx, globalScale) => {
            const start = link.source;
            const end = link.target;
            const textPos = Object.assign(...['x', 'y'].map(c => ({
              [c]: start[c] + (end[c] - start[c]) / 2 // calculate midpoint
            })));
          
            // 텍스트 라벨의 위치를 조정
            const offset = link.source.id < link.target.id ? -5 : 5;
            
            ctx.font = `${12 / globalScale}px Sans-Serif`;
            ctx.fillStyle = 'black';
            ctx.fillText(link.relationship, textPos.x, textPos.y + offset);
          }}
      />
    </div>
  );
}

export default RelationGraph;

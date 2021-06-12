import React from 'react';
import { CartesianGrid, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import { clusteredData } from './Kmeans';
import { getGeneratedColors, getRandomColor } from './utils/getRandomColor';

function App() {
  console.log("------------")
  console.log(clusteredData)
  return (
    <>
      <ScatterChart
      width={400}
      height={400}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" />
        <YAxis type="number" dataKey="y"/>
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        {
          clusteredData.map(cluster => (
            <Scatter name="Cluster" data={cluster.getDots()} fill={getRandomColor()} shape="circle" />
          ))
        }
        {
          clusteredData.map(cluster => (
            <Scatter name="Centroid" data={[cluster.getCentroid()]} fill={getGeneratedColors()} shape="triangle"/>
          ))
        }
      </ScatterChart>
    </>
  );
}

export default App;

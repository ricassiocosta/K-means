import React from 'react';
import { CartesianGrid, Scatter, ScatterChart, XAxis, YAxis } from 'recharts';
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
        {
          clusteredData.map((cluster, index: number) => {
            return <Scatter name="Cluster" data={cluster.getDots()} fill={getRandomColor()} shape="circle" />
          })
        }
        {
          clusteredData.map((cluster, index: number) => {
            return <Scatter name="Centroid" data={[cluster.getCentroid()]} fill={getGeneratedColors()} shape="triangle"/>
          })
        }
      </ScatterChart>
    </>
  );
}

export default App;

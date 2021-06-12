import React from 'react';
import { CartesianGrid, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';
import { clusteredData } from './Kmeans';

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
        <ZAxis type="number" dataKey="z" range={[100, 150]}/>
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        {
          clusteredData.map((cluster, index: number) => {
            return <Scatter name="Cluster" data={cluster.getDots()} shape="triangle" />
          })
        }
        {
          clusteredData.map((cluster, index: number) => {
            return <Scatter name="Centroid" data={[cluster.getCentroid()]} shape="wye"/>
          })
        }
      </ScatterChart>
    </>
  );
}

export default App;

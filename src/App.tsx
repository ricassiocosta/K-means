import React from 'react';
import { CartesianGrid, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import { kmeans } from './Kmeans';
import { getColor } from './utils/getColor';

function App() {
  return (
    <>
      {
        kmeans.history && kmeans.history.map((clusteredData) => (
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
                clusteredData.map((cluster, index) => (
                  <Scatter name="Cluster" data={cluster.getDots()} fill={getColor(index)} shape="circle" />
                ))
              }
              {
                clusteredData.map((cluster, index) => (
                  <Scatter name="Centroid" data={[cluster.getCentroid()]} fill={getColor(index)} shape="triangle"/>
                ))
              }
            </ScatterChart>
        ))
      }
    </>
  );
}

export default App;

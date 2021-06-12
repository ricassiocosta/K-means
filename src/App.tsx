import React, { useEffect, useState } from 'react';
import { CartesianGrid, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Cluster } from './Cluster';
import { kmeans } from './Kmeans';
import { Button, ButtonsContainer, Container, SubTitle, Title } from './styles';
import { getColor } from './utils/getColor';

function App() {
  const [selectedIteration, setSelectedIteration] = useState<Cluster[]>([])
  const [iteration, setIteration] = useState(1)

  useEffect(() => {
    if(kmeans.history) {
      setSelectedIteration(kmeans.history[0])
    }
  }, [])

  function nextIteration() {
    if(kmeans.history) {
      let selectedIterationIndex = kmeans.history.indexOf(selectedIteration)
      const nextIterationIndex = selectedIterationIndex + 1
      const nextIteration = kmeans.history[nextIterationIndex]
      setSelectedIteration(nextIteration)
      setIteration(iteration + 1)
    }
  }

  function previousIteration() {
    if(kmeans.history) {
      let selectedIterationIndex = kmeans.history.indexOf(selectedIteration)
      const previousIterationIndex = selectedIterationIndex - 1
      const nextIteration = kmeans.history[previousIterationIndex]
      setSelectedIteration(nextIteration)
      setIteration(iteration - 1)
    }
  }

  return (
    <Container>
      <Title>K-means</Title>
      <SubTitle>{iteration}a iteração</SubTitle>
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
            selectedIteration.map((cluster, index) => (
              <Scatter name="Cluster" data={cluster.getDots()} fill={getColor(index)} shape="circle" />
            ))
          }
          {
            selectedIteration.map((cluster, index) => (
              <Scatter name="Centroid" data={[cluster.getCentroid()]} fill={getColor(index)} shape="triangle" />
            ))
          }
        </ScatterChart>
        <ButtonsContainer>
          {kmeans.history && iteration > 1 && (
            <Button onClick={previousIteration}>Previous Iteration</Button>
          )}

          {kmeans.history && iteration < kmeans.history.length && (
            <Button onClick={nextIteration}>Next Iteration</Button>
          )}
        </ButtonsContainer>
    </Container>
  );
}

export default App;

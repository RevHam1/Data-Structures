// Dijkstra Algorithm WHAT IS IT
// One of the most famous and widely used algorithms around!
// Finds the shortest path between two vertices on a graph
// "What's the fastest way to get from point A to point B?"
// Time Complexity: O(|V| + |E|log|E|)

// WHY IS IT USEFUL?
// GPS - finding fastest route
// Network Routing - finds open shortest path for data
// Biology - used to model the spread of viruses among humans
// Airline tickets - finding cheapest route to your destination
// Many other uses!

// THE APPROACH
// pick the node with the smallest known distance to visit.
// look at each of its neighbors
// sum the total edges that lead to the node from the starting node.
// If the new total distance to a node is less than the previous total, store the new shorter distance for that node.

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }
  Dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = []; //to return at end
    let smallest;
    //build up initial state
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      // console.log(distances);
      previous[vertex] = null;
      // console.log(previous[vertex]);
      // console.log(nodes);
    }
    // as long as there is something to visit
    while (nodes.values.length) {
      // 1) pick node with smallest distance to visit
      smallest = nodes.dequeue().val; // smallest == A; from { val: 'A', priority: 0 }
      // console.log(smallest);
      if (smallest === finish) {
        // console.log(finish); // E

        // console.log(distances);
        // console.log(previous);
        //WE ARE DONE
        //BUILD UP PATH TO RETURN AT END
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          // console.log(neighbor);
          // console.log(this.adjacencyList);
          //2) find neighboring node
          let nextNode = this.adjacencyList[smallest][neighbor];
          // console.log(nextNode);
          //3) calculate new distance to neighboring node
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          // console.log(candidate);
          // console.log(nextNeighbor);
          if (candidate < distances[nextNeighbor]) {
            // console.log(candidate + " < " + distances[nextNeighbor]);
            //4a) updating new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            //4b) updating previous - How we got to neighbor
            previous[nextNeighbor] = smallest;
            //enqueue in priority queue with new priority
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    // console.log(path);
    // console.log(path.concat(smallest).reverse());
    return path.concat(smallest).reverse();
  }
}

var graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);

graph.Dijkstra("A", "E");

// ["A", "C", "D", "F", "E"]

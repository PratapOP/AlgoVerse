// ===============================
// Graph using Adjacency List
// ===============================
export class GraphAdjList {
  constructor() {
    this.adjList = {};
  }

  addVertex(vertex) {
    if (!this.adjList[vertex]) {
      this.adjList[vertex] = [];
    }
  }

  addEdge(v1, v2) {
    this.addVertex(v1);
    this.addVertex(v2);
    this.adjList[v1].push(v2);
    this.adjList[v2].push(v1); // undirected
  }

  bfs(start) {
    const visited = new Set();
    const queue = [start];
    const order = [];

    visited.add(start);

    while (queue.length) {
      const vertex = queue.shift();
      order.push(vertex);

      for (const neighbor of this.adjList[vertex]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return order;
  }

  dfs(start) {
    const visited = new Set();
    const order = [];

    const dfsHelper = (vertex) => {
      visited.add(vertex);
      order.push(vertex);

      for (const neighbor of this.adjList[vertex]) {
        if (!visited.has(neighbor)) dfsHelper(neighbor);
      }
    };

    dfsHelper(start);
    return order;
  }

  getGraph() {
    return this.adjList;
  }
}

// ===============================
// Graph using Adjacency Matrix
// ===============================
export class GraphAdjMatrix {
  constructor(size) {
    this.size = size;
    this.matrix = Array.from({ length: size }, () =>
      Array(size).fill(0)
    );
  }

  addEdge(i, j) {
    this.matrix[i][j] = 1;
    this.matrix[j][i] = 1;
  }

  bfs(start) {
    const visited = new Array(this.size).fill(false);
    const queue = [start];
    const order = [];

    visited[start] = true;

    while (queue.length) {
      const node = queue.shift();
      order.push(node);

      for (let i = 0; i < this.size; i++) {
        if (this.matrix[node][i] && !visited[i]) {
          visited[i] = true;
          queue.push(i);
        }
      }
    }

    return order;
  }

  dfs(start) {
    const visited = new Array(this.size).fill(false);
    const order = [];

    const dfsHelper = (node) => {
      visited[node] = true;
      order.push(node);

      for (let i = 0; i < this.size; i++) {
        if (this.matrix[node][i] && !visited[i]) {
          dfsHelper(i);
        }
      }
    };

    dfsHelper(start);
    return order;
  }

  getMatrix() {
    return this.matrix;
  }
}

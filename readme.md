# JavaScript BFS Maze Solver
## Overview
This repository contains a JavaScript implementation of a maze solver using the Breadth-First Search (BFS) algorithm. BFS is an efficient pathfinding algorithm that guarantees the shortest path in unweighted graphs, making it perfect for maze navigation where each step has the same cost.

## Features
- Pure JavaScript implementation
- Binary maze representation (paths and walls)
- Input validation and error handling
- Optimal path finding using BFS
- Memory efficient using arrays for visited tracking
- Comprehensive test suite

## Algorithm Background
The Breadth-First Search algorithm, first conceived in the 1950s, is widely used in:
- Maze solving and pathfinding
- Game development for character navigation
- Network routing protocols
- Social network analysis
- Web crawlers

The algorithm works by exploring all neighbor nodes at the present depth before moving on to nodes at the next depth level, ensuring the shortest path is found in scenarios where all steps have equal weight.

##Installation and Setup

1. Clone the repository:
```bash
bashCopygit clone <your-repository-url>
```

2. Install dependencies (for running tests):
```bash
bashCopynpm install
```

3. Project structure:
```bash
Copyproject-root/
├── src/
│   └── maze.js
└── test/
    └── maze.test.jsone <your-repository-url>
```

## Usage / Examples

### Basic Example
```javascript
const Maze = require('./src/maze');

// Define your maze (1 for path, 0 for wall)
const maze = [
    [1, 0, 1, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 1],
    [1, 1, 1, 1]
];

const start = [0, 0];  // Starting position [row, column]
const end = [3, 3];    // End position [row, column]

try {
    const mazeSolver = new Maze(maze, start, end);
    const steps = mazeSolver.solve();
    console.log(`Shortest path length: ${steps}`);
} catch (error) {
    console.error('Error:', error.message);
}
```

### Complex Maze Example
```javascript
// Example with a more complex maze
const complexMaze = [
    [1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 0],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
];

const start = [0, 0];
const end = [4, 6];

const mazeSolver = new Maze(complexMaze, start, end);
const pathLength = mazeSolver.solve();
console.log(`Path found with ${pathLength} steps`);
```

## Visual Representation
Below is a visualization of how the maze is represented:

```
1 0 1 0  → Traversable path (1)
1 1 1 0  → Wall (0)
0 1 0 1
1 1 1 1
```

Start point [0,0] and end point [3,3] would result in the following path:
```
S 0 1 0  → S: Start point
1 1 1 0  → E: End point
0 1 0 1  → *: Path taken
1 1 * E
```

## Maze Structure
The maze should be structured as a 2D array where:
- `1` represents a traversable path
- `0` represents a wall
- All rows must have equal length
- At least one valid path must exist

## API Reference

### Maze Class

#### Constructor
```javascript
new Maze(maze, start, end)
```

##### Parameters
- `maze`: 2D array representing the maze structure
- `start`: Array [row, column] representing starting position
- `end`: Array [row, column] representing end position

#### Methods
- `solve()`: Returns the length of the shortest path or -1 if no path exists
- `isValidMatrix()`: Validates maze structure and contents
- `isValidPosition([x, y])`: Checks if a position is valid and traversable

## How It Works
The algorithm uses:
1. A queue to track cells to visit
2. A visited array to prevent cycles
3. Four-directional movement (up, down, left, right)
4. Distance tracking for each cell

For each position, it:
1. Checks if it's the goal
2. Marks the position as visited
3. Adds unvisited neighbors to the queue
4. Tracks the distance from start

## Testing
The implementation includes comprehensive Jest tests:

```bash
npm test
```

Test cases cover:
- Invalid maze structures
- Invalid start/end positions
- Edge cases (same start/end points)
- Path finding functionality
- Completely blocked mazes

## Performance
- Time Complexity: O(r × c) where r is rows and c is columns
- Space Complexity: O(r × c) for the visited array

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
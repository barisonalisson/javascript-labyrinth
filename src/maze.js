class Maze {
    constructor(maze, start, end) {
        this.maze = maze;
        this.start = start;
        this.end = end;
        this.rows = maze.length;
        this.columns = maze[0].length;

        // Check if the matrix is valid
        if (!this.isValidMatrix()) {
            throw new Error("The maze matrix is invalid.");
        }

        // Check if the start and end points are valid
        if (!this.isValidPosition(start)) {
            throw new Error(`Invalid start point: (${start[0]}, ${start[1]}) is a wall.`);
        }

        if (!this.isValidPosition(end)) {
            throw new Error(`Invalid end point: (${end[0]}, ${end[1]}) is a wall.`);
        }
    }

    // Checks if the matrix is valid (rows of equal length and values 0 or 1)
    isValidMatrix() {
        const numColumns = this.maze[0].length;

        // Check if all rows have the same number of columns
        for (let i = 1; i < this.rows; i++) {
            if (this.maze[i].length !== numColumns) {
                return false;
            }
        }

        // Check if all values are 0 or 1
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.maze[i][j] !== 0 && this.maze[i][j] !== 1) {
                    return false;
                }
            }
        }

        // Check if the matrix is not completely blocked
        let totalPath = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.maze[i][j] === 1) {
                    totalPath++;
                }
            }
        }

        if (totalPath === 0) {
            throw new Error("The matrix is completely blocked, no paths available.");
        }

        return true;
    }

    // Checks if a position is valid (not a wall)
    isValidPosition([x, y]) {
        return x >= 0 && x < this.rows && y >= 0 && y < this.columns && this.maze[x][y] === 1;
    }

    // Solve the maze using BFS
    solve() {
        // Check if the start point is the same as the end point
        if (this.start[0] === this.end[0] && this.start[1] === this.end[1]) {
            return 0; // No movement needed
        }

        const queue = [[this.start[0], this.start[1], 0]];
        const visited = Array.from({ length: this.rows }, () => Array(this.columns).fill(false));
        visited[this.start[0]][this.start[1]] = true;

        const directions = [
            [-1, 0], // up
            [1, 0],  // down
            [0, -1], // left
            [0, 1],  // right
        ];

        while (queue.length > 0) {
            const [x, y, distance] = queue.shift();

            if (x === this.end[0] && y === this.end[1]) {
                return distance;
            }

            for (const [dx, dy] of directions) {
                const newX = x + dx;
                const newY = y + dy;

                if (this.isValidPosition([newX, newY]) && !visited[newX][newY]) {
                    visited[newX][newY] = true;
                    queue.push([newX, newY, distance + 1]);
                }
            }
        }

        return -1; // No path found
    }
}

module.exports = Maze;
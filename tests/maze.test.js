const Maze = require('../src/maze'); // Import Maze class

describe('Maze', () => {

    test('should throw an error for an invalid matrix (unequal row lengths)', () => {
        const invalidMaze = [
            [1, 0, 1],
            [0, 1],  // Row with different number of columns
            [1, 1, 0]
        ];

        const start = [0, 0];
        const end = [2, 2];

        expect(() => {
            new Maze(invalidMaze, start, end);
        }).toThrow('The maze matrix is invalid.');
    });

    test('should throw an error for an invalid matrix (values other than 0 or 1)', () => {
        const invalidMaze = [
            [1, 0, 1],
            [0, 1, -1],  // Invalid value (-1)
            [1, 1, 0]
        ];

        const start = [0, 0];
        const end = [2, 2];

        expect(() => {
            new Maze(invalidMaze, start, end);
        }).toThrow('The maze matrix is invalid.');
    });

    test('should throw an error for an invalid start point', () => {
        const maze = [
            [1, 0, 1],
            [0, 1, 0],
            [1, 1, 1]
        ];

        const start = [1, 0]; // Start point is a wall
        const end = [2, 2];

        expect(() => {
            new Maze(maze, start, end);
        }).toThrow('Invalid start point: (1, 0) is a wall.');
    });

    test('should throw an error for an invalid end point', () => {
        const maze = [
            [1, 0, 1],
            [0, 1, 0],
            [1, 1, 1]
        ];

        const start = [0, 0];
        const end = [1, 0]; // End point is a wall

        expect(() => {
            new Maze(maze, start, end);
        }).toThrow('Invalid end point: (1, 0) is a wall.');
    });
    
    test('should return 0 when start and end points are the same', () => {
        const maze = [
            [1, 1, 1, 0],
            [1, 1, 0, 1],
            [1, 1, 1, 1],
            [0, 1, 1, 1]
        ];

        const start = [0, 0];
        const end = [0, 0]; // Start and end points are the same

        const lab = new Maze(maze, start, end);
        expect(lab.solve()).toBe(0); // No movement needed
    });

    test('should return the shortest path', () => {
        const maze = [
            [1, 0, 1, 0],
            [1, 1, 1, 0],
            [0, 1, 0, 1],
            [1, 1, 1, 1]
        ];

        const start = [0, 0];
        const end = [3, 3];

        const lab = new Maze(maze, start, end);
        expect(lab.solve()).toBe(6); // Shortest path is 6 steps
    });

    test('should throw an error if the matrix is completely blocked', () => {
        const blockedMaze = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        const start = [0, 0];
        const end = [2, 2];

        expect(() => {
            new Maze(blockedMaze, start, end);
        }).toThrow('The matrix is completely blocked, no paths available.');
    });

});
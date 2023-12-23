const SIZE = 8;

let moves = [
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
  [1, -2],
  [2, -1],
  [2, 1],
  [1, 2],
];

// Check valid chess board position

function isValid(x, y) {
  if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) return false;

  return true;
}

// Print path from source to dest

function printPath(path) {
  for (let pos of path) {
    let [x, y] = pos;

    console.log(`(${x}, ${y})`);
  }
}

function knightMoves(srcX, srcY, destX, destY) {
  let queue = [];

  queue.push([srcX, srcY]);

  // Store predecessor in grid

  let pred = Array(SIZE)
    .fill(0)
    .map(() => Array(SIZE).fill(0));

  // Mark source vertex as visited

  pred[srcX][srcY] = [-1, -1];

  while (queue.length) {
    // Dequeue front node

    let [x, y] = queue[0];

    queue.shift();

    // Destination found - print path & return

    if (x === destX && y === destY) {
      let path = [];

      while (!(x === -1 && y === -1)) {
        if (pred[x][y]) {
          path.push([x, y]);

          [x, y] = pred[x][y];
        } else {
          break;
        }
      }

      console.log(
        "You made it in" + (path.length - 1) + "moves! Here's your path:"
      );

      printPath(path.reverse());

      return path;
    }

    // Check all 8 possible knight moves

    for (let m of moves) {
      let newX = x + m[0];

      let newY = y + m[1];

      if (isValid(newX, newY) && !(pred[newX][newY][0] + pred[newX][newY][1])) {
        pred[newX][newY] = [x, y];

        queue.push([newX, newY]);
      }
    }
  }

  console.log("No path exists!");

  return null;
}

knightMoves(3, 3, 4, 3);

// const node = {
//     row,
//     column,
//     isVisited,
//     distance
// };

export function dijkstra(grid, start, target) {
    if (!start || !target || start === target) {
        return false;
    }
    const visistedNodesInOrder = []
    start.distance = 0
    const unvisitedNodes = getNodes(grid)
    while (unvisitedNodes.length != 0) {
        sortByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift() // removes first element in the list
        if (closestNode.isWall) {
            continue;
        }
        closestNode.isVisited = true;
        visistedNodesInOrder.push(closestNode)
        if (closestNode === target) {
            return visistedNodesInOrder
        }
        updateUnvisitedNeighbors(closestNode, grid)
    }

}
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
}
function getNodes(grid) {
    const nodes = [];
    for (const row of grid){
        for (const node of row) {
            nodes.push(node) // add() method in javascript
        }
    }
    return nodes
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {column, row} = node;
    if (row > 0) {
        neighbors.push(grid[row - 1][column])
    };
    if (row < grid.length - 1) {
        neighbors.push(grid[row + 1][column])
    };
    if (column > 0) {
        neighbors.push(grid[row][column - 1])
    };
    if (column < grid[0].length - 1) {
        neighbors.push(grid[row][column + 1])
    };
    return neighbors.filter(neighbor => !neighbor.isVisited); // filters neighbors who are not visisted through 
}

function sortByDistance(unvisitedNodes) {
    unvisitedNodes.sort((node1, node2) => node1.distance - node2.distance) // sort by distance so node1 is above node2 if distance is greater
}
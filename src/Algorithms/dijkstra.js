const node = {
    row,
    column,
    isVisited,
    distance
};
function dijkstra(grid, start, target) {
    if (!start || !target || start === target) {
        return false;
    }
    nodes[start].distance = 0
    const unvisitedNodes = getNodes(grid)
    while (unvisitedNodes.length != 0) {
        sortByDistance(unvisitedNodes);

    }

}
function getNodes(grid) {
    const nodes = [];
    for (row of grid){
        for (node of row) {
            nodes.push(node) // add() method in javascript
        }
    }
    return nodes
}

function sortByDistance(unvisitedNodes) {
    unvisitedNodes.sort((node1, node2) => node1.distance - node2.distance) // sort by distance so node1 is above node2 if distance is greater
}
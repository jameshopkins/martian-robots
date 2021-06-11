// Store the associations between cardinal directions and cartesian grid
// lines.
const cartesianDirectionsGrid = [
    ['N', 'y', 'positive'],
    ['E', 'x', 'positive'],
    ['S', 'y', 'negative'],
    ['W', 'x', 'negative']
]

module.exports.calculateNextCardinalPointData = (currentCardinalPoint, nextDirection) => {
    let cardinalPointIndex = cartesianDirectionsGrid.findIndex(data => data[0] === currentCardinalPoint);

    switch (nextDirection) {
        case 'L':
            cardinalPointIndex = --cardinalPointIndex;
            break;
        case 'R':
            cardinalPointIndex = ++cardinalPointIndex;
            break;
    }

    if (cardinalPointIndex >= cartesianDirectionsGrid.length) {
        cardinalPointIndex = 0;
    }

    if (cardinalPointIndex === -1) {
        cardinalPointIndex = cartesianDirectionsGrid.length - 1;
    }

    return cardinalPointIndex;

}
function Mars(instructions) {
    Planet.call(this, instructions);
}

Mars.prototype = Object.create(Planet.prototype);

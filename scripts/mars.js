function Mars() {
    Planet.call(this, [50, 50]);
}

Mars.prototype = Object.create(Planet.prototype);

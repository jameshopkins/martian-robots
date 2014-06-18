function Mars() {
    Planet.call(this);
}

Mars.prototype = Object.create(Planet.prototype);

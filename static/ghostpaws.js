var Manager = (function () {
    function Manager(body) {
        this.running = false;
        this.ghosts = [];
        this.body = body;
    }
    Manager.prototype.addGhost = function (image) {
        this.ghosts.push(new Ghost(this.body, "test", 0, 550, 90, 1, image));
        this.ghosts.push(new Ghost(this.body, "test", 0, 50, 90, 2, image));
    };
    Manager.prototype.draw = function () {
        var _this = this;
        this.running = true;
        setInterval(function () {
            if (_this.running) {
                _this.ghosts.forEach(function (ghost) { return ghost.next(); });
            }
        }, 8 * 10);
    };
    return Manager;
}());
var Ghost = (function () {
    function Ghost(body, type, x, y, rotation, speed, image) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (rotation === void 0) { rotation = 0; }
        if (speed === void 0) { speed = 1; }
        if (image === void 0) { image = "assets/paw.png"; }
        this.paws = [];
        this.counter = 0;
        this.stage = 1;
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.speed = 1;
        this.left = true;
        this.body = body;
        this.type = type;
        this.x = x;
        this.y = y;
        this.rotation = rotation - 5;
        this.speed = speed;
        this.image = image;
    }
    Ghost.prototype.next = function () {
        for (var _i = 0, _a = this.paws; _i < _a.length; _i++) {
            var paw = _a[_i];
            if (!paw.next()) {
                var index = this.paws.indexOf(paw);
                if (index !== -1) {
                    this.paws.splice(index, 1);
                }
            }
        }
        this.counter += 1;
        if (this.counter > 5 / this.speed) {
            if (this.left) {
                this.rotation += 10;
                this.left = false;
            }
            else {
                this.rotation -= 10;
                this.left = true;
            }
            switch (this.stage) {
                case 1:
                    this.x += 100;
                    this.y -= 50;
                    this.paws.push(new Paw(this.body, this.type, this.x, this.y, this.rotation, 0.2, this.speed, this.image));
                    this.stage += 1;
                    break;
                case 2:
                    this.x += 200;
                    this.y += 50;
                    this.paws.push(new Paw(this.body, this.type, this.x, this.y, this.rotation, 0.2, this.speed, this.image));
                    this.stage += 1;
                    break;
                case 3:
                    this.x += 100;
                    this.y -= 50;
                    this.paws.push(new Paw(this.body, this.type, this.x, this.y, this.rotation, 0.2, this.speed, this.image));
                    this.stage += 1;
                    break;
                case 4:
                    this.x += 200;
                    this.y += 50;
                    this.paws.push(new Paw(this.body, this.type, this.x, this.y, this.rotation, 0.2, this.speed, this.image));
                    this.stage = 1;
                    break;
            }
            this.counter = 0;
            if (this.x > this.body.offsetWidth) {
                this.x = 0;
            }
            if (this.y < this.body.offsetHeight) {
                this.y = 0;
            }
        }
    };
    return Ghost;
}());
var Paw = (function () {
    function Paw(body, type, x, y, rotation, opacity, speed, image) {
        if (speed === void 0) { speed = 1; }
        this.in = true;
        this.speed = 1;
        this.image = "assets/paw.png";
        this.body = body;
        this.type = type;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.opacity = opacity;
        this.speed = speed;
        this.image = image;
        this.element = new Image();
        this.element.src = this.image;
        this.element.alt = "alt";
        this.element.style.position = "absolute";
        this.element.style.opacity = '0';
        this.element.style.rotate = this.rotation.toString() + 'deg';
        this.element.style.left = this.x.toString() + 'px';
        this.element.style.top = this.y.toString() + 'px';
        this.body.appendChild(this.element);
    }
    Paw.prototype.next = function () {
        if (this.in) {
            this.opacity += 0.01 * this.speed;
            if (this.opacity >= this.opacity) {
                this.in = false;
            }
            return true;
        }
        this.opacity -= 0.01 * this.speed;
        this.element.style.opacity = this.opacity.toString();
        if (this.opacity <= 0) {
            this.body.removeChild(this.element);
            return false;
        }
        return true;
    };
    return Paw;
}());
//# sourceMappingURL=ghostpaws.js.map
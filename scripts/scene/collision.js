export default class Collision {
    constructor() {
        this.collisionObject = {};
    }

    add(object, name) {
        if (!this.collisionObject[name]) {
            this.collisionObject[name] = [];
        }
        this.collisionObject[name].push(object);

    }

    checkBump(object, name) {
        let currentElem = object.getBounds();
        let isBump = false;
        if (typeof this.collisionObject[name] != 'undefined') {
            this.collisionObject[name].forEach(function (elem) {
                let otherElem = elem.getBounds();

                if (object != elem
                    && currentElem.x + currentElem.width > otherElem.x
                    && currentElem.x < otherElem.x + otherElem.width
                    && currentElem.y + currentElem.realHeight > otherElem.y
                    && currentElem.y < otherElem.y + otherElem.realHeight) {
                    isBump = true;
                    return;
                }
            });
            return isBump;
        }
    }
}
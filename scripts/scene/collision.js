export default class Collision {
    constructor() {
        this.collisionObject = [];
    }

    add(object) {
        this.collisionObject.push(object);

    }

    checkBump(object) {
        let currentElem = object.getBounds();
        let isBump = false;
        this.collisionObject.forEach(function(elem) {
            let otherElem = elem.getBounds();
            if(object != elem
                && currentElem.x + currentElem.width > otherElem.x
                && currentElem.x < otherElem.x + otherElem.width
                && currentElem.y + currentElem.height > otherElem.y
                && currentElem.y < otherElem.y + otherElem.height) {
                isBump = true;
                return;
            }
        });
        return isBump;
    }
}
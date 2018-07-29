function Actor(nameString, x, y, r)
{
    this.name = nameString;
    this.pos = {x: x, y: y};

    this.boundsRadius = r;
}

Actor.prototype.update = function(dt){
}

function spriteActor(parent, nameString, x, y, r, imageID)
{
    Actor.call(this, nameString, x, y, r);
    this.image = new createjs.Sprite(app.assets.getResult(imageID));

    this.image.x = this.pos.x;
    this.image.y = this.pos.y;
    this.image.gotoAndPlay("idle");
    
    parent.addChild(this.image);
}
spriteActor.prototype = Object.create(Actor.prototype);
spriteActor.prototype.constructor = spriteActor;
spriteActor.prototype.update = function(dt)
{
    this.image.x = this.pos.x;
    this.image.y = this.pos.y;
    Actor.prototype.update.call(this, dt);
}

function playerActor(parent, x, y, r, imageID)
{
    spriteActor.call(this, parent, "playerActor", x, y, r, imageID);

    this.update = function(dt){
        console.log(dt);
        spriteActor.prototype.update.call(this, dt);
    }
}

playerActor.prototype = Object.create(spriteActor.prototype);
playerActor.prototype.constructor = playerActor;

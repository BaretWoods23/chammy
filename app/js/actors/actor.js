function Actor(nameString, x, y, r)
{
    this.name = nameString;
    this.pos = {x: x, y: y};

    this.boundsRadius = r;
}

Actor.prototype.update = function(dt){
    this.pos.x = this.image.x;
    this.pos.y = this.image.y;
}

function spriteActor(parent, nameString, x, y, r, imageID)
{
    Actor.call(this, nameString, x, y, r);
    this.image = new createjs.Sprite(app.assets.getResult(imageID));

    this.image.x = this.pos.x;
    this.image.y = this.pos.y;
    
    parent.addChild(this.image);
}
spriteActor.prototype = Object.create(Actor.prototype);
spriteActor.prototype.constructor = spriteActor;
spriteActor.prototype.update = function(dt)
{
    Actor.prototype.update.call(this, dt);
}

function playerActor(parent, nameString, x, y, r, imageID)
{
    spriteActor.call(this, parent, nameString, x, y, r, imageID);

    this.update = function(dt){
        spriteActor.prototype.update.call(this, dt);
        app.tiles.forEach(function(entry){
            if(areActorsColliding(this, entry))
            {
                entry.onstep(nameString);
            }
        }, this);
    }
}

playerActor.prototype = Object.create(spriteActor.prototype);
playerActor.prototype.constructor = playerActor;
playerActor.prototype.remove = function(parent){
    parent.removeChild(this.image);
}

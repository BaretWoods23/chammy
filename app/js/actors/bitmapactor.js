function bitmapActor(parent, nameString, x, y, r, imageID)
{
    Actor.call(this, nameString, x, y, r);

    this.image = new createjs.Bitmap(app.assets.getResult(imageID));

    this.image.regX = this.image.getBounds().width / 2;
    this.image.regY = this.image.getBounds().height / 2;

    this.image.x = this.pos.x;
    this.image.y = this.pos.y;

    parent.addChild(this.image);   
}
bitmapActor.prototype = Object.create(Actor.prototype);
bitmapActor.prototype.constructor = bitmapActor;
bitmapActor.prototype.update = function(dt)
{
    this.image.x = this.pos.x;
    this.image.y = this.pos.y;

    Actor.prototype.update.call(this, dt);
};
bitmapActor.prototype.remove = function(parent){
    parent.removeChild(this.image);
}

function collectibleActor(parent, nameString, x, y, r, imageID)
{
    bitmapActor.call(this, parent, nameString, x, y, r, imageID);
    this.onCollect = function()
    {
     //   var pos = getRandomPointOnScreen();
      //  app.collectibles.push(new collectibleActor(app.stage, imageID, pos.x, pos.y, 25, imageID));
        app.collectibles.splice( app.collectibles.indexOf(this), 1 );
        app.stage.removeChild(this.image);
        createjs.Sound.play( "getcoin" );
    }
}
collectibleActor.prototype = Object.create(bitmapActor.prototype);
collectibleActor.prototype.constructor = collectibleActor;
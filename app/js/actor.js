function createCircleActor(x, y, r = 40)
{
    var circle = new createjs.Shape();
    circle.graphics.beginFill("#A66").drawCircle(0, 0, r);
    circle.x = x;
    circle.y = y;

    circle.on("click", function(evt) { console.log("Clicked"); });
    circle.on("mouseover", function(evt) { console.log("Mouse Over"); });
    circle.on("mouseout", function(evt) { console.log("Mouse Out"); });
    circle.on("mousedown", function(evt) { console.log("Mouse Down"); });

    return circle;
}

function createBitmapActor(x, y, imageID)
{
    var bitmap = new createjs.Bitmap(app.assets.getResult(imageID));
    bitmap.x = x;
    bitmap.y = y;

    bitmap.regX = bitmap.getBounds().width/2;
    bitmap.regY = bitmap.getBounds().height/2;

    return bitmap;
}

function createSpriteActor(x, y, imageID)
{
    var sprite = new createjs.Sprite(app.assets.getResult(imageID));
    sprite.x = x;
    sprite.y = y;

    sprite.regX = sprite.getBounds().width/2;
    sprite.regY = sprite.getBounds().height/2;

    return sprite;
}
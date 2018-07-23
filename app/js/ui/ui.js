var ui = 
{
    makeDefaultText: function(parent, text, x, y)
    {
        var newText = new createjs.Text(text, defaultFont, colors.dark);
        newText.x = x;
        newText.y = y;
        newText.textAlign = "center";
        newText.textBaseline = "middle";
        parent.addChild(newText);

        return newText;
    },

    makeDefaultTextButton: function(parent, text, x, y, callbackFunc)
    {
        var BUTTON_WIDTH = 200;
        var BUTTON_HEIGHT = 50;

        var newButton = new createjs.Container();
        newButton.x = x - BUTTON_WIDTH / 2;
        newButton.y = y;
        parent.addChild(newButton);

        var shape = new createjs.Shape();
        shape.graphics.beginFill('#FFF').drawRect(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT);
        newButton.addChild(shape);

        var text = this.makeDefaultText(newButton, text, BUTTON_WIDTH / 2, BUTTON_HEIGHT / 2);

        newButton.on("mousedown", callbackFunc);

        return newButton;
    }
}


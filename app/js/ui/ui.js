var ui = 
{
    charOneNum: 0,
    charTwoNum: 0,
    charThreeNum: 0,
    charFourNum: 0,

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

    makeTitleText: function(parent, text, x, y){
        var newText = new createjs.Text(text, "32px Shrikhand", colors.dark);
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
        shape.graphics.beginFill('rgba(255, 255, 255, .7)').drawRect(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT);
        newButton.addChild(shape);

        var text = this.makeDefaultText(newButton, text, BUTTON_WIDTH / 2, BUTTON_HEIGHT / 2);

        newButton.on("mousedown", callbackFunc);

        return newButton;
    },

    makeDefaultMuteButton: function(parent, text, x, y, callbackFunc)
    {
        var BUTTON_WIDTH = 50;
        var BUTTON_HEIGHT = 50;

        var newButton = new createjs.Container();
        newButton.x = x - BUTTON_WIDTH / 2;
        newButton.y = y;
        parent.addChild(newButton);

        var shape = new createjs.Shape();
        shape.graphics.beginFill('#fff').drawRect(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT);
        newButton.addChild(shape);

        var text = this.makeDefaultText(newButton, text, BUTTON_WIDTH / 2, BUTTON_HEIGHT / 2);

        newButton.on("mousedown", callbackFunc);

        return newButton;
    },

    addDefaultBox: function(parent,x,y)
    {
        var BOX_WIDTH = 100;
        var BOX_HEIGHT = 100;

        var shape = new createjs.Shape();
        shape.graphics.beginFill("#000").drawRect(x,y, BOX_WIDTH, BOX_HEIGHT);
        parent.addChild(shape);

        return shape;
    },

    createBox: function(x, y, playerNum){
        var BOX_WIDTH = 100;
        var BOX_HEIGHT = 100;
        var shape = new createjs.Shape();
        if(playerNum == 1){
            shape.graphics.beginStroke("#FF0000");
            shape.graphics.setStrokeStyle(5);
            shape.snapToPixel = true;
            this.charOneNum = playerNum;
            shape.graphics.beginFill("#000").drawRect(x,y, BOX_WIDTH, BOX_HEIGHT);
        }
        else if(playerNum == 2){
            shape.graphics.beginStroke("#0000FF");
            shape.graphics.setStrokeStyle(5);
            shape.snapToPixel = true;
            this.charTwoNum = playerNum;

            shape.graphics.beginFill("#000").drawRect(x,y, BOX_WIDTH, BOX_HEIGHT);
        }
        else{
            shape.graphics.beginStroke("#000000");
            shape.graphics.setStrokeStyle(5);
            shape.snapToPixel = true;
            shape.graphics.beginFill("#000").drawRect(x,y, BOX_WIDTH, BOX_HEIGHT);
        }

        return shape;
    },

    // tile: function(parent, x, y){
    //     var shape = new createjs.Shape();
    //     shape.name = x+""+y;
    //     shape.graphics.beginFill('#FFF').drawRect(0, 0, 98, 88);
    //     shape.x = 100*x;
    //     shape.y = 90*y;
    //     parent.addChild(shape);
    // },

    // makeGrid: function(parent){
    //     var grid = new createjs.Container();
    //     parent.addChild(grid);
    //     for(let i = 1; i < 7; i++){
    //         for(let j = 1; j < 6; j++){
    //             ui.tile(grid, i, j);
    //         }
    //     }
    //     return grid;
    // }
}


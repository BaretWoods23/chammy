function TitleScreen(screenTitleText){
    createjs.Container.call(this);
    ui.makeTitleText(this, screenTitleText, SCREEN_WIDTH/2, 75);
    ui.makeDefaultTextButton(this, "Instructions", SCREEN_WIDTH/4, 400, function(){
        app.stage.removeChild(app.titleScreen);
        app.stage.addChild(app.instructionScreen);
        app.gameState = eStates.INSTRUCTIONS;
    });
    ui.makeDefaultTextButton(this, "Play", SCREEN_WIDTH/4+SCREEN_WIDTH/2, 400, function(){
        app.stage.removeChild(app.titleScreen);
        app.stage.addChild(app.playScreen);
        app.gameState = eStates.PLAY;
        app.elapsedTime = 0;
    })
};

function InstructionScreen(screenTitleText){
    createjs.Container.call(this);
    ui.makeDefaultText(this, screenTitleText, SCREEN_WIDTH/2, 50);
    ui.makeDefaultTextButton(this, "Back", SCREEN_WIDTH/2, 400, function(){
        app.stage.removeChild(app.instructionScreen);
        app.stage.addChild(app.titleScreen);
    });
};

function DataScreen(positionX, positionY){
    createjs.Container.call(this);
    ui.makeDefaultText(this, "X Axis: " + positionX, SCREEN_WIDTH/2, 550);
    ui.makeDefaultText(this, "Y Axis: " + positionY, SCREEN_WIDTH/2, 580);
};

function PlayScreen(screenTitleText){
    createjs.Container.call(this);
    ui.makeDefaultText(this, screenTitleText, SCREEN_WIDTH/2, 50);
};

function GameOverScreen(screenTitleText){
    createjs.Container.call(this);
    ui.makeDefaultText(this, screenTitleText, SCREEN_WIDTH/2, 50);
    ui.makeDefaultTextButton(this, "Back", SCREEN_WIDTH/2, 400, function(){
        app.stage.removeChild(app.gameOverScreen);
        app.stage.addChild(app.titleScreen);
        app.scoreText.visible = false;
    });
};

TitleScreen.prototype = Object.create(createjs.Container.prototype);
TitleScreen.prototype.constructor = Screen;

InstructionScreen.prototype = Object.create(createjs.Container.prototype);
InstructionScreen.prototype.constructor = Screen;

PlayScreen.prototype = Object.create(createjs.Container.prototype);
PlayScreen.prototype.constructor = Screen;

DataScreen.prototype = Object.create(createjs.Container.prototype);
DataScreen.prototype.constructor = Screen;

GameOverScreen.prototype = Object.create(createjs.Container.prototype);
GameOverScreen.prototype.constructor = Screen;
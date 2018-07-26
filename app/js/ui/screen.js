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
        app.stage.addChild(app.characterSelectScreen);
        app.gameState = eStates.CHARACTER_SELECT;
        
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

function CharacterSelect(screenTitleText){
    createjs.Container.call(this);
    ui.makeDefaultText(this,screenTitleText, SCREEN_WIDTH/2, 50);
    
    //Character 1
    var charOneBox = ui.createBox(275, 100, 1);
    this.addChild(charOneBox);
    
    //Character 2
    var charTwoBox = ui.createBox(425, 100, 2);
    this.addChild(charTwoBox);
    
    //Character 3
    var charThreeBox = ui.createBox(275, 250, 0);
    this.addChild(charThreeBox);
    
    //Character 4
    var charFourBox = ui.createBox(425, 250, 0);
    this.addChild(charFourBox);

    ui.addDefaultBox(this,75, 370); //P1
    ui.makeDefaultText(this, "Player 1", 125,500);
    ui.addDefaultBox(this,625,370); //P2
    ui.makeDefaultText(this, "Player 2", 675, 500);

    ui.makeDefaultTextButton(this, "Back", 120, 25,function(){
        app.stage.removeChild(app.characterSelectScreen);
        app.stage.addChild(app.titleScreen);
    });
    ui.makeDefaultTextButton(this,"FIGHT", SCREEN_WIDTH/2, 500,function(){
        app.stage.removeChild(app.characterSelectScreen);
        app.stage.addChild(app.playScreen);
        app.gameState = eStates.PLAY;
        app.elapsedTime = 0;
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

CharacterSelect.prototype = Object.create(createjs.Container.prototype);
CharacterSelect.prototype.constructor = Screen;
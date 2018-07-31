function TitleScreen(screenTitleText){
    createjs.Container.call(this);
    ui.makeTitleText(this, screenTitleText, SCREEN_WIDTH/2, 75);
    ui.makeDefaultTextButton(this, "Instructions", SCREEN_WIDTH/4, 400, function(){
        app.stage.removeChild(app.titleScreen);
        app.stage.addChild(app.instructionScreen);
        app.changeState(eStates.INSTRUCTIONS);
    });
    ui.makeDefaultTextButton(this, "Play", SCREEN_WIDTH/4+SCREEN_WIDTH/2, 400, function(){
        app.stage.removeChild(app.titleScreen);
        app.stage.addChild(app.characterSelectScreen);
        app.changeState(eStates.CHARACTER_SELECT); 
    })
};

function InstructionScreen(screenTitleText){
    createjs.Container.call(this);
    ui.makeDefaultText(this, screenTitleText, SCREEN_WIDTH/2, 50);

    ui.makeDefaultText(this, "The goal is to have more colored tiles than the other player at the end of the game.", SCREEN_WIDTH/2, 100);
    ui.makeDefaultText(this, "Jump onto a tile to paint it your color.", SCREEN_WIDTH/2, 120);

    ui.makeDefaultText(this, "Player 1", SCREEN_WIDTH/3, 170);
    ui.makeDefaultText(this, "Use WASD to move", SCREEN_WIDTH/3, 200);

    ui.makeDefaultText(this, "Player 2", SCREEN_WIDTH/3*2, 170);
    ui.makeDefaultText(this, "Use arrow keys to move", SCREEN_WIDTH/3*2, 200);

    ui.addDefaultBox(this, SCREEN_WIDTH/4-50, 240);
    ui.makeDefaultText(this, "Powerup 1", SCREEN_WIDTH/4, 255);
    ui.makeDefaultText(this, "Lorem ipsum dolor sit", SCREEN_WIDTH/4, 370)
    ui.makeDefaultText(this, "amet, consectetur", SCREEN_WIDTH/4, 390);
    ui.makeDefaultText(this, "adipiscing elit.", SCREEN_WIDTH/4, 410);
    
    ui.addDefaultBox(this, SCREEN_WIDTH/2-50, 240);
    ui.makeDefaultText(this, "Powerup 2", SCREEN_WIDTH/2, 255);
    ui.makeDefaultText(this, "Lorem ipsum dolor sit", SCREEN_WIDTH/2, 370)
    ui.makeDefaultText(this, "amet, consectetur", SCREEN_WIDTH/2, 390);
    ui.makeDefaultText(this, "adipiscing elit.", SCREEN_WIDTH/2, 410);
    
    ui.addDefaultBox(this, SCREEN_WIDTH/4*3-50, 240);
    ui.makeDefaultText(this, "Powerup 3", SCREEN_WIDTH/4*3, 255);
    ui.makeDefaultText(this, "Lorem ipsum dolor sit", SCREEN_WIDTH/4*3, 370)
    ui.makeDefaultText(this, "amet, consectetur", SCREEN_WIDTH/4*3, 390);
    ui.makeDefaultText(this, "adipiscing elit.", SCREEN_WIDTH/4*3, 410);
    ui.makeDefaultTextButton(this, "Back", SCREEN_WIDTH/2, 450, function(){
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
    // var shape = new createjs.Shape();
    // shape.graphics.beginFill('#FFF').drawRect(0, 0, SCREEN_WIDTH/2, SCREEN_HEIGHT/2);
    // app.stage.addChild(shape);
    
  //s  ui.makeGrid(this);
    ui.makeDefaultText(this, screenTitleText, SCREEN_WIDTH/2, 50);
};

function GameOverScreen(screenTitleText){
    createjs.Container.call(this);
    ui.makeDefaultText(this, screenTitleText, SCREEN_WIDTH/2, 50);

    ui.makeDefaultTextButton(this, "Rematch", SCREEN_WIDTH/3, 400, function(){
        app.stage.removeChild(app.gameOverScreen);
        app.stage.addChild(app.characterSelectScreen);
        app.changeState(eStates.CHARACTER_SELECT);
    });

    ui.makeDefaultTextButton(this, "Main Menu", SCREEN_WIDTH/3*2, 400, function(){
        app.stage.removeChild(app.gameOverScreen);
        app.stage.addChild(app.titleScreen);
        app.changeState(eStates.TITLE);
    });

    app.p1ScoreText = ui.makeDefaultText(this, `Player 1:  ${app.scores[0]}`, SCREEN_WIDTH/3, 130);
    app.p2ScoreText = ui.makeDefaultText(this, `Player 2:  ${app.scores[1]}`, SCREEN_WIDTH/3*2, 130);  
    app.winnerText = ui.makeDefaultText(this, "Tie!", SCREEN_WIDTH/2, 100)  
};

var charOneBox;
var charTwoBox;
var charThreeBox;
var charFourBox;

var playerOneBox;
var playerTwoBox;

function CharacterSelect(screenTitleText){

    charOneNum = 0;
    charTwoNum = 0;
    charThreeNum = 0;
    charFourNum = 0;
    createjs.Container.call(this);
    ui.makeDefaultText(this,screenTitleText, SCREEN_WIDTH/2, 50);
    
    //Character 1
    charOneBox = ui.createBox(275, 100, 1);
    charOneNum = ui.charOneNum;
    this.addChild(charOneBox);
    console.log("Character One Player Num: " + ui.charOneNum);
    console.log("Character Three Player Num: " + ui.charThreeNum);
    
    //Character 2
    charTwoBox = ui.createBox(425, 100, 2);
    charTwoNum = ui.charTwoNum;
    this.addChild(charTwoBox);
    
    //Character 3
    charThreeBox = ui.createBox(275, 250, 0);
    charThreeNum = ui.charThreeNum;
    this.addChild(charThreeBox);
    
    //Character 4
    charFourBox = ui.createBox(425, 250, 0);
    charFourNum = ui.charFourNum;
    this.addChild(charFourBox);

    playerOneBox = ui.addDefaultBox(this,75, 370); //P1
    ui.makeDefaultText(this, "Player 1", 125,500);

    playerTwoBox = ui.addDefaultBox(this,625,370); //P2
    ui.makeDefaultText(this, "Player 2", 675, 500);

    ui.makeDefaultTextButton(this, "Back", 120, 25,function(){
        app.stage.removeChild(app.characterSelectScreen);
        app.stage.addChild(app.titleScreen);
    });
    ui.makeDefaultTextButton(this,"FIGHT", SCREEN_WIDTH/2, 500,function(){
        app.stage.removeChild(app.characterSelectScreen);
        app.stage.addChild(app.playScreen);
        app.changeState(eStates.PLAY);
        app.elapsedTime = 0;
    });

    var charOneNumText = new createjs.Text(charOneNum, defaultFont, colors.dark);
    this.addChild(charOneNumText);

    var charTwoNumText = new createjs.Text(charTwoNum, defaultFont, colors.dark);
    this.addChild(charTwoNumText);

    var charThreeNumText = new createjs.Text(charThreeNum, defaultFont, colors.dark);
    this.addChild(charThreeNumText);

    var charFourNumText = new createjs.Text(charFourNum, defaultFont, colors.dark);
    this.addChild(charFourNumText);
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
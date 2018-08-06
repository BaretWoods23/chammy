var app ={
    stage: null,
    gameState: 0,
    myGameObject: null,
    elapsedTime: 0, 
    mousePos: {x: 0, y: 0},
    tiles: [],
    scores: [0, 0],
    players: [],
    powerUp:null,
    chanceForPowerup: 0,
    powerUpAppeared: false,
    keyboard: {
        left : { keycode: 37, isPressed: false},
        up : { keycode: 38, isPressed: false},
        right : { keycode: 39, isPressed: false},
        down : { keycode: 40, isPressed: false},
        keyA: {keycode: 65, isPressed: false},
        keyW: {keycode: 87, isPressed: false},
        keyD: {keycode: 68, isPressed: false},
        keyS: {keycode: 83, isPressed: false},
        spacebar : { keycode: 32, isPressed: false},
        assets : null,
        screen1: null,
        screen2: null,
    },
    finalCharacterSelectScreen: null,

    setupCanvas: function()
    {
        var canvas = document.getElementById("game");
        canvas.width = SCREEN_WIDTH;
        canvas.height = SCREEN_HEIGHT;
        this.stage = new createjs.Stage(canvas);
    },

    beginLoad: function()
    {
        manifest = [
            {
                src: "js/actors/actor.js",
            },
            {
                src: "js/actors/bitmapactor.js",
            },
            {
                src: "js/settings.js",
            },
            {
                src: "js/utils.js",
            },
            {
                src: "media/audio/click.mp3",
                id: "click"
            },
            {
                src: "media/images/pigsheet.json",
                id: "pig",
                type: "spritesheet",
                crossOrigin: true
            },
            {
                src: "js/ui/ui.js",
            },
            {
                src: "js/ui/screen.js",
            },
            {
                src: "media/images/tile.png",
                id: "tile"
            },
            {
                src: "media/images/redtile.png",
                id: "redtile"
            },
            {
                src: "media/images/bluetile.png",
                id: "bluetile"
            },
            {
                src: "media/images/GreenTile.png",
                id: "greentile"
            },
            {
                src: "media/images/YellowTile.png",
                id: "yellowtile"
            },
            {
                src: "media/images/greensheet.json",
                id: "chammygreen",
                type: "spritesheet",
                crossOrigin: true
            },
            {
                src: "media/images/bluesheet.json",
                id: "chammyblue",
                type: "spritesheet",
                crossOrigin: true
            },
            {
                src: "media/images/redsheet.json",
                id: "chammyred",
                type: "spritesheet",
                crossOrigin: true
            },
            {
                src: "media/images/yellowsheet.json",
                id: "chammyyellow",
                type: "spritesheet",
                crossOrigin: true
            },
            {
                src: "media/images/forest.jpg",
                id: "background"
            },
        ];
        this.assets = new createjs.LoadQueue(true);

        createjs.Sound.alternateExtension = ['ogg', 'wav'];
        this.assets.installPlugin(createjs.Sound);



        this.assets.on("progress", function(event){
            console.log((event.loaded / event.total) * 100 + "%");
        });
        this.assets.on("complete", function (event) {
            console.log("LOADING COMPLETE");
            app.init();
        });
        this.assets.loadManifest(manifest);
    },

    init: function()
    {
        this.setupCanvas();
    
        this.gameState = eStates.TITLE;
        var stageBG = new createjs.Shape();
        stageBG.graphics.beginBitmapFill(app.assets.getResult("background"));
        stageBG.graphics.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        this.stage.addChild(stageBG);
        // this.myGameObject = createSpriteActor(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "pig");
        // this.stage.addChild(this.myGameObject);
       // this.myGameObject.scale = 0.5;
       // this.myGameObject.gotoAndPlay("walk");

        
        this.titleScreen = new TitleScreen("Color Me Chammy!");
        this.instructionScreen = new InstructionScreen("Instructions");
        this.gameOverScreen = new GameOverScreen("GAME OVER");
        this.playScreen = new PlayScreen("Use Arrow Keys to Move");   
        
        //this.dataScreen = new DataScreen(this.mousePos.x, this.mousePos.y);
        this.characterSelectScreen = new CharacterSelect("Select Your Character");
        app.finalCharacterSelectScreen = this.characterSelectScreen;

        this.timerText = new createjs.Text("Timer: " + app.elapsedTime.toFixed(2), defaultFont, colors.dark);
        this.timerText.visible = false;
        this.timerText.x = SCREEN_WIDTH/2;
        this.timerText.y = 30;
        this.timerText.textAlign = "center";
        this.timerText.textBaseline = "middle";

        this.stage.addChild(this.timerText);
        this.stage.addChild(this.titleScreen);
        
        //this.stage.addChild(this.dataScreen);
        this.stage.enableMouseOver();  

        this.stage.on("stagemousemove", function(event) {
            app.mousePos.x = Math.floor(event.stageX);
            app.mousePos.y = Math.floor(event.stageY);
            
            //app.stage.removeChild(app.dataScreen);
            //app.dataScreen = new DataScreen(app.mousePos.x, app.mousePos.y);
            //app.stage.addChild(app.dataScreen);
        });
        
        this.stage.on("stagemousedown", function (event) {
            app.handleMouseDown(event);
        });

        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;
        createjs.Ticker.addEventListener("tick", this.update);
        createjs.Ticker.framerate = FPS;
    },

    update: function(event)
    {
        app.stage.update(event);
        var dt = event.delta / 1000;
        app.elapsedTime += dt;
        if(app.gameState === eStates.PLAY)
        {
            app.timerText.visible = true;
            app.timerText.text = "Timer: " + app.elapsedTime.toFixed(2);
            app.players.forEach(function(player){
                player.update(dt);
            });

            if(app.powerUpAppeared === false);
            {
                app.chanceForPowerup = Math.random() * (100 - 1) + 1;
                console.log("Powerup chance activated!");
                console.log("Chance for powerup: " + app.chanceForPowerup );
                
            }
            
            if(app.chanceForPowerup >= 50 && app.powerUpAppeared === false){
                
                app.powerUpAppeared = true;
                console.log("Powerup: " + app.powerUpAppeared);
                //console.log("Chance for powerup: " + app.chanceForPowerup );
            }
            if(app.keyboard.left.isPressed && app.players[1].image.x != 90*1+80)
            {
                app.players[1].image.x -= 90;
                app.keyboard.left.isPressed = false;
                app.players[1].image.gotoAndPlay("left");
            }
            else if(app.keyboard.right.isPressed && app.players[1].image.x != 90*6+80)
            {
               app.players[1].image.x += 90;
               app.keyboard.right.isPressed = false;
               app.players[1].image.gotoAndPlay("right");
            }
            else if(app.keyboard.up.isPressed && app.players[1].image.y != 80*1+80)
            {
                app.players[1].image.y -= 80;
                app.keyboard.up.isPressed = false;
                app.players[1].image.gotoAndPlay("up");
            }
            else if(app.keyboard.down.isPressed && app.players[1].image.y != 80*5+80)
            {
                app.players[1].image.y += 80;
                app.keyboard.down.isPressed = false;
                app.players[1].image.gotoAndPlay("down");
            }


            
            if(app.keyboard.keyA.isPressed && app.players[0].image.x != 90*1+80)
            {
                app.players[0].image.x -= 90;
                app.keyboard.keyA.isPressed = false;
                app.players[0].image.gotoAndPlay("left");
            }
            else if(app.keyboard.keyD.isPressed && app.players[0].image.x != 90*6+80)
            {
               app.players[0].image.x += 90;
               app.keyboard.keyD.isPressed = false;
               app.players[0].image.gotoAndPlay("right");
            }
            else if(app.keyboard.keyW.isPressed && app.players[0].image.y != 80*1+80)
            {
                app.players[0].image.y -= 80;
                app.keyboard.keyW.isPressed = false;
                app.players[0].image.gotoAndPlay("up");
            }
            else if(app.keyboard.keyS.isPressed && app.players[0].image.y != 80*5+80)
            {
                app.players[0].image.y += 80;
                app.keyboard.keyS.isPressed = false;
                app.players[0].image.gotoAndPlay("down");
            }
            
            if(app.elapsedTime >= 10){
                app.changeState(eStates.GAMEOVER);
                app.timerText.visible = false;
                app.stage.removeChild(app.playScreen);
                app.stage.addChild(app.gameOverScreen);
            }
            app.stage.update();
        }
        else if(app.gameState === eStates.CHARACTER_SELECT){
            //Player One Inputs
            if(app.keyboard.keyA.isPressed)
            {
                if(app.finalCharacterSelectScreen.children[12].text === 1 && app.finalCharacterSelectScreen.children[11].text === 0){
                    app.finalCharacterSelectScreen.children[1].graphics._stroke.style = "#FF0000";
                    app.finalCharacterSelectScreen.children[11].text = 1;

                    app.finalCharacterSelectScreen.children[2].graphics._stroke.style = "#000000";
                    app.finalCharacterSelectScreen.children[12].text = 0;
                    console.log("P1 Left was pressed");
                }
                else if(app.finalCharacterSelectScreen.children[14].text === 1 && app.finalCharacterSelectScreen.children[13].text === 0){
                    app.finalCharacterSelectScreen.children[3].graphics._stroke.style = "#FF0000";
                    app.finalCharacterSelectScreen.children[13].text = 1;

                    app.finalCharacterSelectScreen.children[4].graphics._stroke.style = "#000000";
                    app.finalCharacterSelectScreen.children[14].text = 0;
                    console.log("P1 Left was pressed");
                }
                else{
                    console.log("P1 Left was pressed");
                }
            }
            if(app.keyboard.keyD.isPressed)
            {
                if(app.finalCharacterSelectScreen.children[11].text === 1 && app.finalCharacterSelectScreen.children[12].text === 0){
                    app.finalCharacterSelectScreen.children[2].graphics._stroke.style = "#FF0000";
                    app.finalCharacterSelectScreen.children[12].text = 1;

                    app.finalCharacterSelectScreen.children[1].graphics._stroke.style = "#000000";
                    app.finalCharacterSelectScreen.children[11].text = 0;
                    console.log("P1 Right was pressed");
                }
                else if(app.finalCharacterSelectScreen.children[13].text === 1 && app.finalCharacterSelectScreen.children[14].text === 0){
                    app.finalCharacterSelectScreen.children[4].graphics._stroke.style = "#FF0000";
                    app.finalCharacterSelectScreen.children[14].text = 1;

                    app.finalCharacterSelectScreen.children[3].graphics._stroke.style = "#000000";
                    app.finalCharacterSelectScreen.children[13].text = 0;
                    console.log("P1 Right was pressed");
                }
                else{
                    console.log("P1 Right was pressed");
                }
            }
            if(app.keyboard.keyW.isPressed)
            {
                if(app.finalCharacterSelectScreen.children[13].text === 1 && app.finalCharacterSelectScreen.children[11].text === 0){
                    app.finalCharacterSelectScreen.children[1].graphics._stroke.style = "#FF0000";
                    app.finalCharacterSelectScreen.children[11].text = 1;

                    app.finalCharacterSelectScreen.children[3].graphics._stroke.style = "#000000";
                    app.finalCharacterSelectScreen.children[13].text = 0;
                    console.log("P1 Up was pressed");
                }
                else if(app.finalCharacterSelectScreen.children[14].text === 1 && app.finalCharacterSelectScreen.children[12].text === 0){
                    app.finalCharacterSelectScreen.children[2].graphics._stroke.style = "#FF0000";
                    app.finalCharacterSelectScreen.children[12].text = 1;

                    app.finalCharacterSelectScreen.children[4].graphics._stroke.style = "#000000";
                    app.finalCharacterSelectScreen.children[14].text = 0;
                    console.log("P1 Up was pressed");
                }
                else{
                    console.log("P1 Up was pressed");
                }
            }
            if(app.keyboard.keyS.isPressed)
            {
                if(app.finalCharacterSelectScreen.children[11].text === 1 && app.finalCharacterSelectScreen.children[13].text === 0){
                    app.finalCharacterSelectScreen.children[1].graphics._stroke.style = "#000000";
                    app.finalCharacterSelectScreen.children[11].text = 0;

                    app.finalCharacterSelectScreen.children[3].graphics._stroke.style = "#FF0000";
                    app.finalCharacterSelectScreen.children[13].text = 1;
                    console.log("P1 Down was pressed");
                }
                else if(app.finalCharacterSelectScreen.children[12].text === 1 && app.finalCharacterSelectScreen.children[14].text === 0){
                    app.finalCharacterSelectScreen.children[2].graphics._stroke.style = "#000000";
                    app.finalCharacterSelectScreen.children[12].text = 0;

                    app.finalCharacterSelectScreen.children[4].graphics._stroke.style = "#FF0000";
                    app.finalCharacterSelectScreen.children[14].text = 1;
                    console.log("P1 Down was pressed");
                }
                else{
                    console.log("P1 Down was pressed");
                }
            }

            //Player Two Inputs
            if(app.keyboard.left.isPressed)
            {
                if(app.finalCharacterSelectScreen.children[12].text === 2 && app.finalCharacterSelectScreen.children[11].text === 0){
                    app.finalCharacterSelectScreen.children[1].graphics._stroke.style = "#0000FF";
                    app.finalCharacterSelectScreen.children[11].text = 2;

                    app.finalCharacterSelectScreen.children[2].graphics._stroke.style = "#000000";
                    app.finalCharacterSelectScreen.children[12].text = 0;
                    console.log("P2 Left was pressed");
                }
                else if(app.finalCharacterSelectScreen.children[14].text === 2 && app.finalCharacterSelectScreen.children[13].text === 0){
                    app.finalCharacterSelectScreen.children[3].graphics._stroke.style = "#0000FF";
                    app.finalCharacterSelectScreen.children[13].text = 2;

                    app.finalCharacterSelectScreen.children[4].graphics._stroke.style = "#000000";
                    app.finalCharacterSelectScreen.children[14].text = 0;
                    console.log("P2 Left was pressed");
                }
                else{
                    console.log("P2 Left was pressed");
                }
            }
            if(app.keyboard.right.isPressed)
            {
                if(app.finalCharacterSelectScreen.children[11].text === 2 && app.finalCharacterSelectScreen.children[12].text === 0){
                    app.finalCharacterSelectScreen.children[2].graphics._stroke.style = "#0000FF";
                    app.finalCharacterSelectScreen.children[12].text = 2;

                    app.finalCharacterSelectScreen.children[1].graphics._stroke.style = "#000000";
                    app.finalCharacterSelectScreen.children[11].text = 0;
                    console.log("P2 Right was pressed");
                }
                else if(app.finalCharacterSelectScreen.children[13].text === 2 && app.finalCharacterSelectScreen.children[14].text === 0){
                    app.finalCharacterSelectScreen.children[4].graphics._stroke.style = "#0000FF";
                    app.finalCharacterSelectScreen.children[14].text = 2;

                    app.finalCharacterSelectScreen.children[3].graphics._stroke.style = "#000000";
                    app.finalCharacterSelectScreen.children[13].text = 0;
                    console.log("P2 Right was pressed");
                }
                else{
                    console.log("P2 Right was pressed");
                }
            }
            if(app.keyboard.up.isPressed)
            {
                if(app.finalCharacterSelectScreen.children[13].text === 2 && app.finalCharacterSelectScreen.children[11].text === 0){
                    app.finalCharacterSelectScreen.children[1].graphics._stroke.style = "#0000FF";
                    app.finalCharacterSelectScreen.children[11].text = 2;

                    app.finalCharacterSelectScreen.children[3].graphics._stroke.style = "#000000";
                    app.finalCharacterSelectScreen.children[13].text = 0;
                    console.log("P2 Up was pressed");
                }
                else if(app.finalCharacterSelectScreen.children[14].text === 2 && app.finalCharacterSelectScreen.children[12].text === 0){
                    app.finalCharacterSelectScreen.children[2].graphics._stroke.style = "#0000FF";
                    app.finalCharacterSelectScreen.children[12].text = 2;

                    app.finalCharacterSelectScreen.children[4].graphics._stroke.style = "#000000";
                    app.finalCharacterSelectScreen.children[14].text = 0;
                    console.log("P2 Up was pressed");
                }
                else{
                    console.log("P2 Up was pressed");
                }
            }
            if(app.keyboard.down.isPressed)
            {
                if(app.finalCharacterSelectScreen.children[11].text === 2 && app.finalCharacterSelectScreen.children[13].text === 0){
                    app.finalCharacterSelectScreen.children[1].graphics._stroke.style = "#000000";
                    app.finalCharacterSelectScreen.children[11].text = 0;

                    app.finalCharacterSelectScreen.children[3].graphics._stroke.style = "#0000FF";
                    app.finalCharacterSelectScreen.children[13].text = 2;
                    console.log("P2 Down was pressed");
                }
                else if(app.finalCharacterSelectScreen.children[12].text === 2 && app.finalCharacterSelectScreen.children[14].text === 0){
                    app.finalCharacterSelectScreen.children[2].graphics._stroke.style = "#000000";
                    app.finalCharacterSelectScreen.children[12].text = 0;

                    app.finalCharacterSelectScreen.children[4].graphics._stroke.style = "#0000FF";
                    app.finalCharacterSelectScreen.children[14].text = 2;
                    console.log("P2 Down was pressed");
                }
                else{
                    console.log("P2 Down was pressed");
                }
            }
        }
    },

    // Handle mouse clicks
    handleMouseDown: function(event)
    {
        createjs.Sound.play("click");
    },

    handleKeyDown: function(event)
    {
        if(!evt){ var evt = window.event; }
        switch(evt.keyCode) {
            case app.keyboard.left.keycode:     app.keyboard.left.isPressed = true; return false;
            case app.keyboard.keyA.keycode:     app.keyboard.keyA.isPressed = true; return false;
            //case app.keyboard.left.altcode:     app.keyboard.left.isPressed = true; return false;
            case app.keyboard.up.keycode:       app.keyboard.up.isPressed = true; return false;
            case app.keyboard.keyW.keycode:     app.keyboard.keyW.isPressed = true; return false;
            //case app.keyboard.up.altcode:       app.keyboard.up.isPressed = true; return false;
            case app.keyboard.right.keycode:    app.keyboard.right.isPressed = true; return false;
            case app.keyboard.keyD.keycode:     app.keyboard.keyD.isPressed = true; return false;
            //case app.keyboard.right.altcode:    app.keyboard.right.isPressed = true; return false;
            case app.keyboard.down.keycode:     app.keyboard.down.isPressed = true; return false;
            case app.keyboard.keyS.keycode:     app.keyboard.keyS.isPressed = true; return false;
            //case app.keyboard.down.altcode:     app.keyboard.down.isPressed = true; return false;
            case app.keyboard.spacebar.keycode: app.keyboard.spacebar.isPressed = true; return false;
        }
    },

    handleKeyUp: function(event)
    {
        if(!evt){ var evt = window.event; }

        switch(evt.keyCode) {
            case app.keyboard.left.keycode:     app.keyboard.left.isPressed = false; return false;
            case app.keyboard.keyA.keycode:     app.keyboard.keyA.isPressed = false; return false;
            //case app.keyboard.left.altcode:     app.keyboard.left.isPressed = true; return false;
            case app.keyboard.up.keycode:       app.keyboard.up.isPressed = false; return false;
            case app.keyboard.keyW.keycode:     app.keyboard.keyW.isPressed = false; return false;
            //case app.keyboard.up.altcode:       app.keyboard.up.isPressed = true; return false;
            case app.keyboard.right.keycode:    app.keyboard.right.isPressed = false; return false;
            case app.keyboard.keyD.keycode:     app.keyboard.keyD.isPressed = false; return false;
            //case app.keyboard.right.altcode:    app.keyboard.right.isPressed = true; return false;
            case app.keyboard.down.keycode:     app.keyboard.down.isPressed = false; return false;
            case app.keyboard.keyS.keycode:     app.keyboard.keyS.isPressed = false; return false;
            //case app.keyboard.down.altcode:     app.keyboard.down.isPressed = true; return false;
            case app.keyboard.spacebar.keycode: app.keyboard.spacebar.isPressed = false; return false;
        }
    },
    
    changeState: function(newState)
    {
        this.gameState = newState;

        if(this.gameState === eStates.TITLE)
        {
            console.log("Changing state to eStates.TITLE");
        }
        else if(this.gameState === eStates.PLAY)
        {
            for(let i = 1; i < 7; i++){
                for(let j = 1; j < 6; j++){
                    this.tiles.push(new tileActor(this.stage, "tile" + i + j, 90*i+80, 80*j+80, 10, "tile"));
                }
            }
            this.players.push(new playerActor(this.stage, "chammygreen", 90*1+80, 80*3+80, 10, "chammygreen"));
            this.players.push(new playerActor(this.stage, "chammyblue", 90*6+80, 80*3+80, 10, "chammyblue"));
            console.log("Changing state to eStates.PLAY");
        }
        else if(this.gameState === eStates.GAMEOVER)
        {
            let p1Count = 0;
            let p2Count = 0;
            this.tiles.forEach(function(tile){
                if(tile.player == app.players[0].nameString){
                    p1Count++;
                }else if(tile.player == app.players[1].nameString){
                    p2Count++;
                }
                tile.remove(app.stage);
            });
            this.tiles = [];
            this.players.forEach(function(player){
                player.remove(app.stage);
            });
            this.players = [];

            app.p1ScoreText.text = `Player 1:  ${p1Count}`;
            app.p2ScoreText.text = `Player 2:  ${p2Count}`;

            if(p1Count > p2Count) {
                app.winnerText.text = "Player 1 wins!";
            }
            else if(p2Count > p1Count) {
                app.winnerText.text = "Player 2 wins!";
            }
            else {
                app.winnerText.text = "Tie!"
            }

            console.log("Changing state to eStates.GAMEOVER");
        }
        else if(this.gameState === eStates.INSTRUCTIONS)
        {
            console.log("Changing state to eStates.INSTRUCTIONS");
        }
    },
}

app.beginLoad();
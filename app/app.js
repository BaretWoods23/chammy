var app ={
    stage: null,
    gameState: 0,
    myGameObject: null,
    elapsedTime: 0, 
    mousePos: {x: 0, y: 0},
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
                src: "js/actor.js",
            },
            {
                src: "js/settings.js",
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
        stageBG.graphics.beginFill('#A6A').drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        this.stage.addChild(stageBG);
        this.stage.addChild(this.myGameObject);

        
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

        this.scoreText = new createjs.Text("Score: " + 0, defaultFont, colors.dark);
        this.scoreText.visible = false;
        this.scoreText.x = SCREEN_WIDTH/2;
        this.scoreText.y = 80;
        this.scoreText.textAlign = "center";
        this.scoreText.textBaseline = "middle";

        this.stage.addChild(this.timerText);
        this.stage.addChild(this.scoreText);
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
            app.scoreText.visible = true;
            app.timerText.text = "Timer: " + app.elapsedTime.toFixed(2);
            if(app.keyboard.left.isPressed)
            {
                app.myGameObject.x -= SPEED * dt;
                console.log("Left was pressed");
            }
            if(app.keyboard.right.isPressed)
            {
                app.myGameObject.x += SPEED * dt;
                console.log("Right was pressed");
            }
            if(app.keyboard.up.isPressed)
            {
                app.myGameObject.y -= SPEED * dt;
                console.log("Up was pressed");
            }
            if(app.keyboard.down.isPressed)
            {
                app.myGameObject.y += SPEED * dt;
                console.log("Down was pressed");
            }
            if(app.keyboard.spacebar.isPressed)
            {
                console.log("Space was pressed");
            }
            if(app.elapsedTime >= 5){
                app.gameState = eStates.GAMEOVER;
                app.timerText.visible = false;
                app.stage.removeChild(app.playScreen);
                app.stage.addChild(app.gameOverScreen);
            }
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
        console.log(evt.keyCode);
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
            console.log("Changing state to eStates.PLAY");
        }
        else if(this.gameState === eStates.GAMEOVER)
        {
            console.log("Changing state to eStates.GAMEOVER");
        }
        else if(this.gameState === eStates.INSTRUCTIONS)
        {
            console.log("Changing state to eStates.INSTRUCTIONS");
        }
    },
}

app.beginLoad();
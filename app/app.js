var app ={
    stage: null,
    gameState: 0,
    myGameObject: null,
    elapsedTime: 0, 
    mousePos: {x: 0, y: 0},
    keyboard: {
        left : { keycode: 37, altcode: 65, isPressed: false},
        up : { keycode: 38, altcode: 87, isPressed: false},
        right : { keycode: 39, altcode: 68, isPressed: false},
        down : { keycode: 40, altcode: 83, isPressed: false},
        spacebar : { keycode: 32, isPressed: false},
        assets : null,
        screen1: null,
        screen2: null,
    },

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
        stageBG.graphics.beginFill('#AAC').drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        this.stage.addChild(stageBG);
        // this.myGameObject = createSpriteActor(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "pig");
        // this.stage.addChild(this.myGameObject);
       // this.myGameObject.scale = 0.5;
       // this.myGameObject.gotoAndPlay("walk");

        this.titleScreen = new TitleScreen("Click Play to Start");
        this.instructionScreen = new InstructionScreen("Instructions");
        this.gameOverScreen = new GameOverScreen("GAME OVER");
        this.playScreen = new PlayScreen("Use Arrow Keys to Move");   
        this.dataScreen = new DataScreen(this.mousePos.x, this.mousePos.y);

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
        this.stage.addChild(this.dataScreen);
        this.stage.enableMouseOver();  

        this.stage.on("stagemousemove", function(event) {
            app.mousePos.x = Math.floor(event.stageX);
            app.mousePos.y = Math.floor(event.stageY);
            app.stage.removeChild(app.dataScreen);
            app.dataScreen = new DataScreen(app.mousePos.x, app.mousePos.y);
            app.stage.addChild(app.dataScreen);
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
            let grid = app.playScreen.children[0];
            app.timerText.visible = true;
            app.scoreText.visible = true;
            app.timerText.text = "Timer: " + app.elapsedTime.toFixed(2);
            if(app.keyboard.left.isPressed)
            {
              //  app.myGameObject.x -= SPEED * dt;
                console.log(grid.children);
                grid.children[0].graphics.beginFill("#6AA");
                console.log("Left was pressed");
            }
            if(app.keyboard.right.isPressed)
            {
               // app.myGameObject.x += SPEED * dt;
                console.log("Right was pressed");
            }
            if(app.keyboard.up.isPressed)
            {
                //app.myGameObject.y -= SPEED * dt;
                console.log("Up was pressed");
            }
            if(app.keyboard.down.isPressed)
            {
               // app.myGameObject.y += SPEED * dt;
                console.log("Down was pressed");
            }
            if(app.keyboard.spacebar.isPressed)
            {
                console.log("Space was pressed");
            }
            if(app.elapsedTime >= 200){
                app.gameState = eStates.GAMEOVER;
                app.timerText.visible = false;
                app.stage.removeChild(app.playScreen);
                app.stage.addChild(app.gameOverScreen);
            }
            app.stage.update();
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
            case app.keyboard.left.altcode:     app.keyboard.left.isPressed = true; return false;
            case app.keyboard.up.keycode:       app.keyboard.up.isPressed = true; return false;
            case app.keyboard.up.altcode:       app.keyboard.up.isPressed = true; return false;
            case app.keyboard.right.keycode:    app.keyboard.right.isPressed = true; return false;
            case app.keyboard.right.altcode:    app.keyboard.right.isPressed = true; return false;
            case app.keyboard.down.keycode:     app.keyboard.down.isPressed = true; return false;
            case app.keyboard.down.altcode:     app.keyboard.down.isPressed = true; return false;
            case app.keyboard.spacebar.keycode: app.keyboard.spacebar.isPressed = true; return false;
        }
    },

    handleKeyUp: function(event)
    {
        if(!evt){ var evt = window.event; }

        switch(evt.keyCode) {
            case app.keyboard.left.keycode:     app.keyboard.left.isPressed = false; return false;
            case app.keyboard.left.altcode:     app.keyboard.left.isPressed = false; return false;
            case app.keyboard.up.keycode:       app.keyboard.up.isPressed = false; return false;
            case app.keyboard.up.altcode:       app.keyboard.up.isPressed = false; return false;
            case app.keyboard.right.keycode:    app.keyboard.right.isPressed = false; return false;
            case app.keyboard.right.altcode:    app.keyboard.right.isPressed = false; return false;
            case app.keyboard.down.keycode:     app.keyboard.down.isPressed = false; return false;
            case app.keyboard.down.altcode:     app.keyboard.down.isPressed = false; return false;
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
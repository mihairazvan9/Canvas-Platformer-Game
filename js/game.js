class Game {
    canvas
    ctx
    gameLoop
    space
    spaces = []
    hero
    obstacles = []
    bullets = []
    
    //
    enemy = []
    enemy_r = []
    fire_enemy = []  
    
    // Controlls
    upPress
    rightPress
    leftPress
    downPress
    
    constructor() {
        this.start = this.start.bind(this)
        this.registerKeyPressEvents = this.registerKeyPressEvents.bind(this)
        this.step = this.step.bind(this)
        this.draw = this.draw.bind(this)
        this.start()
    }

    /**
     * Start
     */
    start() {
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.style.cursor = 'crosshair'
        this.canvas.width = 800
        this.canvas.height = 600
        this.canvas.style.marginLeft = window.innerWidth / 2 - this.canvas.width / 2 + 'px'
        this.canvas.style.marginTop = window.innerHeight / 2 - this.canvas.height / 2 + 'px'
        
        //add keyboard event
        this.registerKeyPressEvents()

        //add space background
        this.space = new Space({game: this})

        //add hero
        this.hero = new Hero({ x: 40, y: 100, game: this })        

        //add enemy
        for(let i = 0; i < 15; i++){
            this.enemy.push(new Enemy({
                x: 0 + 450 * i,
                y: 25,
                type: 1,
                game: this
            }))
        }

        //enemy terran
        this.enemy_r.push(new Enemy_r({
            x: 0,
            y: 25,
            range_x: 0,
            type: 1,
            game: this
        }))

        this.enemy_r.push(new Enemy_r({
            x: 680,
            y: 25,
            range_x: 680,
            type: 1,
            game: this
        }))

        this.enemy_r.push(new Enemy_r({
            x: 980,
            y: 25,
            range_x: 980,
            type: 1,
            game: this
        }))

        this.enemy_r.push(new Enemy_r({
            x: 1260,
            y: 500,
            range_x: 1260,
            type: 1,
            game: this
        }))

        this.enemy_r.push(new Enemy_r({
            x: 4520,
            y: 500,
            range_x: 4520,
            type: 1,
            game: this
        }))

        //enemy flyning
        for (let i=0; i<13; i++) {
            this.enemy_r.push(new Enemy_r({
                x: 1000 + 700 * i,
                y: 200,
                range_x: 680,
                type: 2,
                game: this
            }))
        }
        
        //this.auto_shoot()
        //add obstaclecs
        //
        //
        for (let i=0; i<10; i++) {
            this.obstacles.push(new Obstacle({
                x: 0 + 50 * i,
                y: 280,
                type: 1,
                game: this,
            }))
        }

        for (let i=0; i<3; i++) {
            this.obstacles.push(new Obstacle({
                x: 580 + 130 * i,
                y: 215,
                type: 1,
                game: this,
            }))
        } 
        for (let i=0; i<10; i++) {
            this.obstacles.push(new Obstacle({
                x: 970 + 30 * i,
                y: 280,
                type: 1,
                game: this,
            }))
        }

        for (let i=0; i<10; i++) {
            this.obstacles.push(new Obstacle({
                x: 1500 + 300 * i,
                y: 500,
                type: 1,
                game: this,
            }))
        }

        for (let i=0; i<10; i++) {
            this.obstacles.push(new Obstacle({
                x: 1650 + 300 * i,
                y: 430,
                type: 1,
                game: this,
            }))
        }

        for (let i=0; i<2; i++) {
            this.obstacles.push(new Obstacle({
                x: 1800 + 300 * i,
                y: 360,
                type: 1,
                game: this,
            }))
        }

        for (let i=0; i<2; i++) {
            this.obstacles.push(new Obstacle({
                x: 1950 + 300 * i,
                y: 290,
                type: 1,
                game: this,
            }))
        }

        //triangle
        for (let i=0; i<20; i++) {
            this.obstacles.push(new Obstacle({
                x: -600 + 25 * i,
                y: 599,
                type: 2,
                game: this,
            }))
        }

        //buttom map
        for (let i=0; i<30; i++) {
            this.obstacles.push(new Obstacle({
                x: -100 + 50 * i,
                y: 575,
                type: 1,
                game: this,
            }))
        }

        //triangle
        for (let i=0; i<125; i++) {
            this.obstacles.push(new Obstacle({
                x: 1400 + 25 * i,
                y: 599,
                type: 2,
                game: this,
            }))
        }

        for (let i=0; i<20; i++) {
            this.obstacles.push(new Obstacle({
                x: 4525 + 50 * i,
                y: 575,
                type: 1,
                game: this,
            }))
        }

        this.ctx.fillStyle = '#0A043C' // clear canvas
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height) // clear canvas
        this.gameLoop = setInterval(this.step, 1000/60)
        

    }// END start method

    /**
     *  registerKeyPressEvents method
     */
    
    registerKeyPressEvents() {
        document.addEventListener('keydown', event => {
            if  (event.code === 'KeyW' && this.upPress || event.code === 'ArrowUp' && this.upPress || event.code === 'Space' && this.upPress) {
                this.hero.vel.y = -12
                this.upPress = false
            } else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
                this.rightPress = true
            } else if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
                this.leftPress = true
            }
        })//END keydown event
    
        document.addEventListener('keyup', event => {
            if (event.code === 'KeyD' || event.code === 'ArrowRight') {
                this.rightPress = false
            } else if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
                this.leftPress = false
            }
        })//END keyup event

        //create bullet area
        document.querySelector('canvas').addEventListener('click', event =>{

            const angle = Math.atan2(
                event.offsetY - this.hero.y - 20,
                event.offsetX - this.hero.x - 20
            ) 
            const velBullet = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }
            
            this.bullets.push(new Bullet({
                x: this.hero.x + 20,
                y: this.hero.y + 20,
                color: '#FF005C',
                velBullet,
                game: this
            }))
        
        })

    }//END registerKeyPressEvents method

    auto_shoot(){
        let angle = 0
        let velBullet = 0
        let distance = 0
        
        for(let i = 0; i < this.enemy.length; i++){
            angle = Math.atan2(
                this.hero.y - this.enemy[i].y,
                this.hero.x - this.enemy[i].x
            ) 
            velBullet = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }

            
            distance =  Math.sqrt(
                Math.pow((this.hero.x + this.hero.width /2) - this.enemy[i].x, 2) +
                Math.pow(this.hero.y - this.enemy[i].y, 2)
                )
              
           
            if(distance < 550){
                this.fire_enemy.push(new Bullet({
                    x: this.enemy[i].x + 25,
                    y: this.enemy[i].y,
                    velBullet,
                    color: '#f8b400',  
                    game: this
                }))
            }
        
        }//END for loop
         
        
    }//END auto_shoot
   
    /**
     * Step method
     */
    step() {
        this.hero.fire()
        this.hero.step()
        this.space.step()
        this.enemy.forEach(t => t.step())
        this.enemy_r.forEach(r => r.step())
        this.fire_enemy.forEach(fe => fe.step())
        this.bullets.forEach(b => b.step())   
        this.draw()   
    }//END step method
    
    


    /**
     * Draw method
     */
    draw() {
        this.ctx.fillStyle = '#0A043C'// clear canvas
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height) // clear canvas
        this.space.draw()//draw
        this.bullets.forEach(b => b.draw())
        this.fire_enemy.forEach(fe => fe.draw())
        this.obstacles.forEach(o => o.draw())
        this.enemy.forEach(t => t.draw())
        this.enemy_r.forEach(r => r.draw())
        this.hero.draw() // call function draw from Hero constructor

        
    }//END draw method   

}//END Game constructor



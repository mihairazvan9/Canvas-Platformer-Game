class Hero {
    x = 0 
    y = 0
    width = 48
    height = 50
    color = "#ebecf1"
    speed = 4
    gravity = 0.7
    maxYvel = 11
    vel = {y: 0}
    game
    max_count = 100 
    count = 0

    max_count_f = 20
    count_f = 0

    newX = 0

    life = 5
    constructor({ x, y, game }) {
        this.x = x
        this.y = y
        this.game = game
    }

    /**
     * Game Over method
     */
    game_over(){
        for(let i = 0; i < this.game.fire_enemy.length; i++){
            if(check_collision_circle_rect(this.game.fire_enemy[i], this)){
                this.game.fire_enemy.splice(i, 1)
                this.life -= 1
                if(this.life === 0){
                    pause_t()
                    clearInterval(this.game.gameLoop)
                    restart()
                }                  
            }
        }
        for(let i = 0; i < this.game.enemy_r.length; i++){
            if(checkCollision(this.game.enemy_r[i], this)){
                this.life = 0
                pause_t()
                clearInterval(this.game.gameLoop)                
                restart()
            }
        }

        for(let i = 0; i < this.game.obstacles.length; i++){
            if(checkCollision(this, this.game.obstacles[i]) && this.game.obstacles[i].type === 2){
                this.life = 0
                pause_t()
                clearInterval(this.game.gameLoop)               
                restart()
            }
        }

        if(this.x > this.game.space.portalX){
            save_score()
            clearInterval(this.game.gameLoop)                
            win()
        }
        
    }
        
    cameraMod() {
        if(this.x + this.width > this.game.canvas.width / 2 + 50){
            this.x = this.game.canvas.width / 2 + 50 - this.width
            this.game.obstacles.forEach(obs =>{
                obs.x -= this.speed
            })
            this.game.bullets.forEach(b =>{
                b.x -= this.speed
            })
            this.game.fire_enemy.forEach(fe =>{
                fe.x -= this.speed
            })
            this.game.enemy.forEach(t =>{
                t.x -= this.speed
            })
            this.game.enemy_r.forEach(r =>{
                r.x -= this.speed
                r.range_x -=this.speed
            })

            //space background move
            this.game.space.portalX -= this.speed
            this.game.space.sunX -= 0.5
            this.game.space.earth1X -= 0.06
            this.game.space.earth2X -= 0.03
            this.game.space.cloudXr -= this.speed - 0.3
            this.game.space.cloudXl -= this.speed + 0.3
            this.game.space.rocketX -= 0.5
            this.game.space.rocketXrandom -= 0.5
            
        }else if(this.x < this.game.canvas.width / 2 - 175){
            this.x = this.game.canvas.width / 2 - 175
            this.game.obstacles.forEach(obs =>{
                obs.x += this.speed
            })
            this.game.bullets.forEach(b =>{
                b.x += this.speed
            })
            this.game.fire_enemy.forEach(fe =>{
                fe.x += this.speed
            })
            this.game.enemy.forEach(t =>{
                t.x += this.speed
            })
            this.game.enemy_r.forEach(r =>{
                r.x += this.speed
                r.range_x +=this.speed
            })
            
            //space background move
            this.game.space.portalX += this.speed
            this.game.space.sunX += 0.5
            this.game.space.earth1X += 0.06
            this.game.space.earth2X += 0.03
            this.game.space.cloudXr += this.speed + 0.3
            this.game.space.cloudXl += this.speed - 0.3
            this.game.space.rocketX += 0.5
            this.game.space.rocketXrandom += 0.5
        }
    }

    /**
     * Enemy deley fire
     */
    fire(){
        this.count ++
        if(this.count > this.max_count){
            this.count = 0           
            this.game.auto_shoot()        
        }
    }

    step() {
        this.game_over()
        this.cameraMod()
        
        
        /**
         * Set gravity
         */
        this.vel.y += this.gravity
        if (this.vel.y > this.maxYvel) {
            this.vel.y = this.maxYvel
        }
        this.y += this.vel.y
    
        /**
         * Jump it's posible when vel.y = 0
         */
        if (this.y + this.height + this.vel.y > this.game.canvas.height) {
            this.game.upPress = true
        }


        // When hero it's over obstacle, that can jump
        this.game.obstacles.forEach(obs => {
            if(checkCollision(this, obs) && this.y + this.height > obs.y && this.vel.y > 0 && obs.type === 1){
                this.y = obs.y - this.height
                this.vel.y = 0
                this.game.upPress = true
            }
            // Hero head collision with botton of obstacles
            if(checkCollision(this, obs) && this.y > obs.y - obs.height){
                this.y = obs.y + obs.height
                this.vel.y = 0.1
            }
        })

        //Movement to right / left 
        if (this.game.leftPress) {
            this.x = this.x - this.speed            
        }
        if (this.game.rightPress) {
            this.x = this.x + this.speed
        }
        /**
         * Hero collision with obs, part right of obstacles && part left of obstacles
         */
        this.newX = this.x
        this.game.obstacles.forEach(obs =>{
            if(checkCollision(this, obs) && this.game.rightPress){
                this.newX = this.newX - this.speed 
                this.x = this.newX
            } 
            if(checkCollision(this, obs) && this.game.leftPress){
                this.newX = this.newX + this.speed
                this.x = this.newX
            }
        })

         // Canvas margin
        //  if (this.x < 0) {
        //     this.x = 0
        // }
        // if (this.x + this.width > this.game.canvas.width) {
        //     this.x = this.game.canvas.width - this.width
        // }
        // if (this.y < 0) {
        //     this.y = 0
        // }
        // if (this.y + this.height > this.game.canvas.height) {
        //     this.y = this.game.canvas.height - this.height
        // }
        

        this.game.fire_enemy.forEach(fire_e =>{           
            if(checkCollision(this, fire_e) ){               
                //console.log('lovit')
            }
        })
        
    }

    /**
     * Draw
     */
    draw() {
        let frameL
        let frameR
        let hero_img = new Image()
        let heart = new Image()
        hero_img.src = 'img/hero.png'
        heart.src = 'img/heart.png'

        for(let i = 0; i < this.life; i++){
            this.game.ctx.drawImage(heart, 0, 0, 23, 20,
                10 + 28 * i, 10, 23, 20)
        }
        if(this.game.rightPress){
            this.count_f ++

            if(this.count_f > 0 && this.count_f <= (this.max_count_f / 2)){           
                frameR = 147 
                //frameL = 49       
            }else if(this.count_f > (this.max_count_f / 2) && this.count_f <= this.max_count_f){
                frameR = 196
                //frameL = 98        
            }else if(this.count_f > this.max_count_f){
                this.count_f = 0
                frameR = 147          
            }
            this.game.ctx.drawImage(hero_img, frameR, 0, this.width, this.height, 
                    this.x, this.y, this.width, this.height)
        }else if(this.game.leftPress){
            this.count_f ++

            if(this.count_f > 0 && this.count_f <= (this.max_count_f / 2)){           
                //frameR = 147 
                frameL = 49       
            }else if(this.count_f > (this.max_count_f / 2) && this.count_f <= this.max_count_f){
                //frameR = 196
                frameL = 98        
            }else if(this.count_f > this.max_count_f){
                this.count_f = 0 
                frameL = 98                 
            }
            this.game.ctx.drawImage(hero_img, frameL, 0, this.width, this.height, 
                this.x, this.y, this.width, this.height)
        }else{
            this.game.ctx.drawImage(hero_img, 0, 0, this.width, this.height, 
                this.x, this.y, this.width, this.height)
        }
    }
}

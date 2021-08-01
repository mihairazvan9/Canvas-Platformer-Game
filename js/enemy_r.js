class Enemy_r{
    x = 0
    y = 0
    // frameX = 3
    // frameY = 1
    height
    width
    vel = 5
    gravity = 0.2
    maxYvel = 11
    move_r = true
    move_l = false
    range_x
    type
    game

    max_count = 30
    count = 0


    //birt_sprite = new Image()

    constructor({x, y, range_x, type, game}){
        this.x = x
        this.y = y
        this.range_x = range_x
        this.type = type
        this.game = game
    }

    step(){

        if(this.type === 1){
            //this.y += this.vel
            this.vel += this.gravity
            if (this.vel > this.maxYvel) {
                this.vel = this.maxYvel
            }
            this.y += this.vel
            this.game.obstacles.forEach(o => {
                if(checkCollision(this, o)){
                    this.y = o.y - this.height
                    this.vel = -2                         
                }
            })
            //console.log(this.vel)
            if(this.move_r === true && this.x < this.range_x + 100){
                this.x += 1
                if(this.x >= this.range_x + 100){
                    this.move_l = true
                    this.range_x = this.range_x - 100
                }
            }else if(this.move_l === true && this.x > this.range_x - 100){
                this.x -= 1
                if(this.x <= this.range_x + 100){
                    this.move_r = true
                    this.range_x = this.range_x + 100
                }
            }
        }

        if(this.type === 2){
            let can_spy = false 
            for(let i = 0; i < this.game.enemy_r.length; i++){
                let distance = 0
                distance =  Math.sqrt(
                    Math.pow((this.game.hero.x + this.game.enemy_r[i].width /2) - this.game.enemy_r[i].x, 2) +
                    Math.pow(this.game.hero.y - this.game.enemy_r[i].y, 2)
                    )
            
                
    
                if(distance < this.game.canvas.height && this.game.enemy_r[i].type === 2){
                    can_spy = true
                }
            }
            let angle = Math.atan2(
                this.game.hero.y - this.y,
                (this.game.hero.x + this.game.hero.width / 2) - this.x
            ) 
            let velBullet = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }
            if(can_spy === true){
                this.x = this.x + (velBullet.x * 1.5)
                this.y = this.y + (velBullet.y * 1)
            }

            
        }


    }

    draw(){   
        if(this.type === 1){
            let monster = new Image()
            monster.src = 'img/monster.png'
            let frameX = 0
            let frameY = 1
            this.width = 35
            this.height = 35

            this.count ++
            if(this.count > 0 && this.count <= this.max_count / 4){           
                frameY = 0        
            }else if(this.count > this.max_count /2){
                this.count = 0
                frameY = 0          
            }
            this.game.ctx.drawImage(monster, this.width * frameX, this.height * frameY, this.width, this.height, 
                this.x, this.y, this.width, this.height)
            
                // this.game.ctx.fillStyle = '#81113A'
            // this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
        }

        if(this.type === 2){
            let monster = new Image()
            monster.src = 'img/fly.png'
            let frameX = 0
            let frameY = 1
            this.width = 60
            this.height = 35.1


            this.count ++
            if(this.count > 0 && this.count < this.max_count / 4){           
                frameY = 0        
            }else if(this.count > (this.max_count / 4) && this.count <= (this.max_count / 2)){
                frameY = 1
            }else if(this.count > (this.max_count / 2) && this.count <= (this.max_count / 2 + this.max_count / 4)){
                frameY = 2          
            }else if(this.count > (this.max_count / 2 + this.max_count / 4) && this.count <= (this.max_count - this.max_count / 4)){
                frameY = 1          
            }else if(this.count > this.max_count){
                this.count = 0 
                frameY = 0         
            }
            
            this.game.ctx.drawImage(monster, this.width * frameX, this.height * frameY, this.width, this.height, 
                this.x, this.y, this.width, this.height)
            
            
                // this.game.ctx.fillStyle = '#2AA1EE'
            // this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}
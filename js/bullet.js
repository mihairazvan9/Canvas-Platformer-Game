class Bullet{
    game
    x = 0
    y = 0
    radius = 5
    color

    constructor({x, y, color, velBullet, game}){
        this.x = x
        this.y = y
        this.color = color
        this.velBullet = velBullet
        this.game = game
    }

    step(){
        this.x = this.x + (this.velBullet.x * 7.5)
        this.y = this.y + (this.velBullet.y * 7.5)

        for(let i = 0; i < this.game.obstacles.length; i++){
            for(let j = 0; j < this.game.bullets.length; j++){   
                if(check_collision_circle_rect(this.game.bullets[j], this.game.obstacles[i]) ||
                    this.game.bullets[j].x < 0 || 
                    this.game.bullets[j].x + this.game.bullets[j].width > this.game.canvas.width ||
                    this.game.bullets[j].y < 0 ||
                    this.game.bullets[j].y + this.game.bullets[j].height > this.game.canvas.height) {
                    this.game.bullets.splice(j, 1) 
                }
            }
            for(let j = 0; j < this.game.fire_enemy.length; j++){   
                if(check_collision_circle_rect(this.game.fire_enemy[j], this.game.obstacles[i]) ||
                    this.game.fire_enemy[j].x < 0 || 
                    this.game.fire_enemy[j].x + this.game.fire_enemy[j].width > this.game.canvas.width ||
                    this.game.fire_enemy[j].y < 0 ||
                    this.game.fire_enemy[j].y + this.game.fire_enemy[j].height > this.game.canvas.height) {
                    this.game.fire_enemy.splice(j, 1) 
                }
            }
        }
        for(let m = 0; m < this.game.bullets.length; m++){
            for(let n = 0; n < this.game.fire_enemy.length; n++){
                if(check_collision_x2circle(this.game.bullets[m], this.game.fire_enemy[n])){
                    this.game.bullets.splice(m, 1)
                    this.game.fire_enemy.splice(n, 1)
                }

            }
        }

        /**
         * coliziunea dintre proiectilele eroului
         * cu inamicii (enemy/enemy_r)
        */
        let distance = 0
        for(let i = 0; i < this.game.bullets.length; i++){
        distance =  Math.sqrt(
            Math.pow((this.game.hero.x + this.game.hero.width /2) - this.game.bullets[i].x, 2) +
            Math.pow(this.game.hero.y - this.game.bullets[i].y, 2)
            )
            if(distance > 300){
                this.game.bullets.splice(i, 1)
            }

        }
        for(let z = 0; z < this.game.bullets.length; z++){
            for(let x = 0; x < this.game.enemy_r.length; x++){
                if(check_collision_circle_rect(this.game.bullets[z], this.game.enemy_r[x])){
                    this.game.enemy_r.splice(x, 1)
                }
            }
            for(let y = 0; y < this.game.enemy.length; y++){
                if(check_collision_circle_rect(this.game.bullets[z], this.game.enemy[y])){
                    this.game.enemy.splice(y, 1)
                }
            }
        }       

    }
    
    draw(){
        // this.game.ctx.fillStyle = this.color
        // this.game.ctx.fillRect(this.x, this.y, this.width, this.height) 
        
        this.game.ctx.beginPath()
        this.game.ctx.fillStyle = this.color
        this.game.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        this.game.ctx.fill()
        this.game.ctx.strokeStyle = this.color
        this.game.ctx.stroke()
    }
}


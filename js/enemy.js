class Enemy{
    x = 0
    y = 0
    width = 50
    height = 14.5
    angle = 0
    game

    constructor({x, y, game}){
        this.x = x
        this.y = y
        this.game = game
    }

    step(){
        let dx = this.game.hero.x - this.x
        let dy = this.game.hero.y - this.y
        this.angle = Math.atan2(dy, dx) 
    }

    draw(){
        let sup_turret = new Image()
        sup_turret.src = 'img/turret.png'

        this.game.ctx.save()
        this.game.ctx.drawImage(sup_turret, 0, 15, 50, 50, this.x, this.y - 25, 50, 50)
        // this.game.ctx.fillStyle = '#e1112e'
        // this.game.ctx.fillRect(this.x - 15, this.y - 15, 30, 30)

        this.game.ctx.translate(this.x +25, this.y)
        this.game.ctx.rotate(this.angle)

        this.game.ctx.drawImage(sup_turret, 0, 0, this.width, this.height, -5, -7.25, this.width, this.height)
        // this.game.ctx.fillStyle = '#211366'
        // this.game.ctx.fillRect(0, -7.5, this.width, this.height)
        this.game.ctx.restore()
       //this.game.ctx.setTransform(1, 0, 0, 1, 0, 0)

        //this.width = 50
    }
}
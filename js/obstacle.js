class Obstacle {
    x = 0
    y = 0
    width
    height
    type
    game

    constructor({ x, y, type, game }) {
        this.x = x
        this.y = y  
        this.type = type
        this.game = game
    }

    draw() {
        if(this.type === 1) {
            this.game.ctx.fillStyle = '#1687A7'
            this.height = 25
            this.width = 50
            this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
        }else if (this.type === 2) {
            this.game.ctx.fillStyle = '#D3E0EA'
            this.height = 1
            this.width = 25
            
            let aa= 12.5
            let ab=25
            let bb=-25

            this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
            this.game.ctx.beginPath()
            this.game.ctx.moveTo(this.x, this.y)
            this.game.ctx.lineTo(this.x + ab, this.y)
            this.game.ctx.lineTo(this.x + aa, this.y + bb)
            this.game.ctx.fill()
        }
        

    }
}

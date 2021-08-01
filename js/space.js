class Space{
    game

    rocketX = 0//coordonata X a rachetei
    rocketY = 800//coordonata y a rachetei
    rocketXrandom = 1
    
    //coordonatele soarelui
    sunX = 750
    sunY = 0

    //coordonatele norilor
    cloudXr = -2000
    cloudXl = 6000

    //coordonatele portalului
    portalX = 4800

    angle

    
    constructor({game}) {
        this.game = game
    }

    step(){
        //mecanica soarelui
        this.sunX -= 0.1
        this.sunY += 0.03
        //mecanica norilor
        this.cloudXr += 0.3
        this.cloudXl -= 0.3


        //generarea rachetei pe o directie la intamplare
        //implementarea vitezei 
        let dx = this.rocketXrandom -  this.rocketX
        let dy = 600 - this.rocketY
        this.angle = Math.atan2(dy, dx) 
        const velBullet = {
            x: Math.cos(this.angle),
            y: Math.sin(this.angle)
        }
        
        this.rocketX = this.rocketX + velBullet.x 
        this.rocketY = this.rocketY + velBullet.y
        
        if( this.rocketY > this.game.canvas.height){
            this.rocketY = -100
            this.rocketX = 800

            var items = [10, 50, 100, 150, 200, 250, 300, 350, 400, 
                450, 500, 550, 600, 650, 700, 750]

            this.rocketXrandom = random_nr(items)
        }
            
            
        
    }

    draw(){
        let background_space = new Image()
        background_space.src = 'img/space.png'
        let portal = new Image()
        portal.src = 'img/portal.png'
        //desenarea rachetei
        this.game.ctx.save()
        this.game.ctx.translate(this.rocketX, this.rocketY)
        this.game.ctx.rotate(this.angle)
        this.game.ctx.drawImage(background_space, 0, 255, 120, 30, 
                                0, 0, 120, 30)
        this.game.ctx.restore()
        
        //desenarea soarelui
        this.game.ctx.drawImage(background_space, 0, 0, 173, 173, 
            this.sunX, this.sunY, 173, 173)

        //desenarea norilor
        for(let i = 0; i < 12; i++){
        this.game.ctx.drawImage(background_space, 0, 174, 175, 80, 
            this.cloudXr + i * 500, 10 + i * 30, 175, 80)
        }

        for(let i = 0; i < 12; i++){
            this.game.ctx.drawImage(background_space, 0, 174, 175, 80, 
                this.cloudXl - i * 500, 10 + i * 30, 175, 80)
            
        }

        //desenarea portalului
        this.game.ctx.drawImage(portal, 0, 0, 95, 110, 
        this.portalX, 460, 95, 110)
    }
}

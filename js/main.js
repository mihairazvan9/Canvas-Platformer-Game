/**
 * Check collision
 */

function checkCollision(obj1, obj2) {
    if( obj1.x + obj1.width > obj2.x &&
        obj1.x < obj2.x + obj2.width &&
        obj1.y + obj1.height > obj2.y &&
        obj1.y < obj2.y + obj2.height){
        return true
    }else{
        return false
    }
}

function check_collision_x2circle(c1, c2){
    let dx = c1.x - c2.x
    let dy = c1.y - c2.y
    let distance = Math.sqrt(dx * dx + dy * dy)
    if(distance < c1.radius + c2.radius){
        return true
    }else{
        return false
    }
}

function check_collision_circle_rect(c, r){
    let dx = Math.abs(c.x - r.x - r.width / 2)
    let dy = Math.abs(c.y - r.y - r.height / 2)

    if(dx - c.radius < r.width / 2 && dy - c.radius < r.height / 2){
        return true
    }else{
        return false
    }
}

function random_nr(items){
    return items [Math.floor(Math.random() * items.length)]
}

window.onload = () => {//start onload function
    //window.__GAME__ = new Game()
    menu()
}//END onload function





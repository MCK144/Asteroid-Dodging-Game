var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
const SCREEN_W = canvas.width;
const SCREEN_H = canvas.height;


class Sprite{
	constructor(x,y,w,h,texture){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.texture = texture;
	}
	
	render(){
		context.drawImage(this.texture,this.x,this.y,this.w,this.h);
	}
}

var keys = {
	w : false,
	s : false,
	space : false
}

class AsteroidManager{
	constructor(){
		this.asteroids = [];
		this.count = 0;
		this.delay = 100;
		this.timer = this.delay;
	}
	
	update(){
		this.timer--;
		if (this.timer == 0){
			this.timer = this.delay;
			
			let randY = Math.floor(Math.random() * SCREEN_H);
			
			let a = new Asteroid(SCREEN_W,randY);
			this.asteroids[this.count] = a;
			this.count++;
		}
		
		for (let i = 0; i < this.count; i++){
			let destroy = this.asteroids[i].update();
			if (destroy){
				this.asteroids.splice(i,1);
				this.count--;
			}
		}
	}
	
	render(){
		for (let i = 0; i < this.count; i++){
			this.asteroids[i].render();
		}
	}
}

const ASTEROID_W = 100;
const ASTEROID_H = 100;

class Asteroid extends Sprite{
	constructor(x,y){
		let texture = new Image;
		texture.src = "Asteroid.png";
		super(x,y,ASTEROID_W,ASTEROID_H,texture);
		
		this.speed = 4;
	}
	
	update(){
		this.x -= this.speed;
		
		if (this.x == -ASTEROID_W){
			return true;
		}
		
		return false;
	}
}


const PLAYER_W = 60;
const PLAYER_H = 30;

class Player extends Sprite{
	constructor(x,y){
		let texture = new Image;
		texture.src = "player.png";
		
		super(x,y,PLAYER_W,PLAYER_H,texture);
		
		this.speed = 4;
	}
	
	update(){
		if (keys["w"])
			this.y -= this.speed;
		if (keys["s"])
			this.y += this.speed;
	}
	
}

var player = new Player(300,240);
var manager = new AsteroidManager();

function update(){
	player.update();
	manager.update();
}

function render(){
	context.fillStyle = "black";
	context.fillRect(0,0,SCREEN_W,SCREEN_H);
	
	player.render();
	manager.render();
}

function play(){
	update();
	render();
}

setInterval(play,1000/60);

window.addEventListener("keydown",function(e){
	let key = e.key;
	
	if (key == "w")
		keys["w"] = true;
	if (key == "s")
		keys["s"] = true;
	if (key == " ")
		keys["space"] = true;
});

window.addEventListener("keyup",function(e){
	let key = e.key;
	
	if (key == "w")
		keys["w"] = false;
	if (key == "s")
		keys["s"] = false;
	if (key == " ")
		keys["space"] = false;
});




//add bullet class
//add bullet manager
//add fire timer so player can't spam
//add collision function to the sprite
//have player die when it touches bullet
//game over message
//add updateWave function
//keep player in game
//spawn stars
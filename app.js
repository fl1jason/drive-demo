const gameSpeed = 200;
let carRotation = 0;
let turnIncrement = 32;
let car = null;

function Position(degrees, x, y) {
    this.degrees = degrees;
    this.x = x;
    this.y = y;
    this.drive = function() {
        car.style.top = `${parseInt(car.style.top) + this.y}px`;
        car.style.left = `${parseInt(car.style.left) + this.x}px`;
    }
    this.reverse = function() {
        car.style.top = `${parseInt(car.style.top) - this.y}px`;
        car.style.left = `${parseInt(car.style.left) - this.x}px`;
    }
    this.turn = function() {
        car.style.webkitTransform = 'rotate('+this.degrees.toString()+'deg)'; 
        car.style.mozTransform    = 'rotate('+this.degrees.toString()+'deg)'; 
        car.style.msTransform     = 'rotate('+this.degrees.toString()+'deg)'; 
        car.style.oTransform      = 'rotate('+this.degrees.toString()+'deg)'; 
        car.style.transform       = 'rotate('+this.degrees.toString()+'deg)'; 
    }
  }

const positions = [
    // 12 o'clock
    new Position(0,         0,      -10),
    
    new Position(11.25,     2.5,    -10),
    new Position(22.5,      5,      -10),
    new Position(33.75,     7.5,    -10),
    new Position(45,        10,     -10),
    new Position(56.25,     10,     -7.5),
    new Position(67.5,      10,     -5),
    new Position(78.75,     10,     -2.5),

    //3 o'clock
    new Position(90, 10, -0),

    new Position(101.25,    10,     2.5),
    new Position(112.50,    10,     5),
    new Position(123.75,    10,     7.5),
    new Position(135.00,    10,     10),
    new Position(146.25,    7.5,    10),
    new Position(157.50,    5,      10),
    new Position(168.75,    2.5,    10),

    // 6 o'clock
    new Position(180,       0,      10),

    new Position(191.25,    -2.5,   10),
    new Position(202.50,    -5,     10),
    new Position(213.75,    -7.5,   10),
    new Position(225.00,    -10,    10),
    new Position(236.25,    -10,    7.5),
    new Position(247.50,    -10,    5),
    new Position(258.75,    -10,    2.5),

    // 9 o'clock
    new Position(270,       -10,    0),

    new Position(281.25,    -10,    -2.5),
    new Position(292.50,    -10,    -5),
    new Position(303.75,    -10,    -7.5),
    new Position(315.00,    -10,    -10),
    new Position(326.25,    -7.5,   -10),
    new Position(337.50,    -5,     -10),
    new Position(348.75,    -2.5,   -10),
]

const createCar = () =>{

    car = document.createElement('div');
    car.id = 'car';
    
    car.style.zIndex = '1';
    car.style.position = 'absolute';
    car.style.zIndex = '1';
    car.style.position = 'absolute';
    car.style.width = '256px';
    car.style.height = '256px';
    car.style.top = '100px';
    car.style.left = '100px';
    car.style.backgroundImage = `url(./assets/car/1.png)`;

    // Set up the car's lights
    const animateCar =() =>{
        
        const car = document.getElementById('car')
        const img = car.style.backgroundImage;

        let imgIndex = parseInt(img.split('/')[3].split('.')[0]);
        imgIndex = (imgIndex >= (3) ? 1: ++imgIndex);
        car.style.backgroundImage = `url(./assets/car/${imgIndex}.png)`;
        
        flashLoop = setTimeout(animateCar, gameSpeed);
    }

    let flashLoop = setTimeout(animateCar, gameSpeed);

    return (car);
}

const onMoveCar = (e) =>{
    
    switch (e.keyCode) {
        case 37:
            // Left cursor key
            onTurnCar('left');
            break;
        case 38:
            // Up
            positions[carRotation].drive();
            break;
        case 39:
            // Right cursor key
            onTurnCar('right');
            break;
        case 40:
            // Down
            e.preventDefault();
            positions[carRotation].reverse();
            break;
        case 32:
            // Space
            e.preventDefault();
            siren.play();
            break;
        default:
            break;
    }
}

const onTurnCar = (direction) =>{

    carRotation = (direction == 'left') ? --carRotation : ++carRotation;
    
    // Check we're not out of Bounds
    if (carRotation === 32) {
        carRotation = 0;
    }else if (carRotation === -1) {
        carRotation = 31;
    }
    positions[carRotation].turn();
}

document.addEventListener("DOMContentLoaded", (event) => {

    // Create the car and add it to the page
    car = createCar();
    document.body.appendChild(car);

    // Get the siren audio so we can play it when you hit Space bar
    const siren = document.getElementById('siren');
    
    // Handle key events for the car's movement
    document.addEventListener('keydown', onMoveCar);
});

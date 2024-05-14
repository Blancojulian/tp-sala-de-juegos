export class Auto {

    public position = {
        x: 0,
        y: 0
    };
    public height: number = 0;
    public width: number = 0;
    private static initialVelocity: number = 1;
    public static velocity: number = Auto.initialVelocity;

    constructor(height: number, width: number, positionX: number, positionY: number) {
        this.height = height;
        this.width = width;
        this.position.x = positionX;
        this.position.y = positionY;
    }

    public mover() {
        this.position.y += Auto.velocity;
    }

    public static agregarVelocidad(num: number = 0.02) {
        Auto.velocity += num;    
    }

    public static bajarVelocidad(num: number = 0.02) {
        Auto.velocity -= num;    
    }
    
    public static reiniciarVelocidad() {
        Auto.velocity = Auto.initialVelocity;    
    }
}

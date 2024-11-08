import DataBus from '../dataBus.js';
const dataBus = new DataBus();

export default class Enemy {
    constructor() {
        this.image = dataBus.resources['enemy1.png'];
        this.width = this.image.img.naturalWidth;
        this.height = this.image.img.naturalHeight;
        this.x = Math.random() * (dataBus.canvas.width - this.width);
        this.y = -this.height;
        this.ctx = dataBus.ctx;
        this.isAlive = true;
        this.speed = 2;
        this.zIndex = 2;
        dataBus.addActor(this);
    }

    update() {
        this.y += this.speed;
        if (this.y > dataBus.canvas.height) {
            this.isAlive = false;
        }
    }

    render() {
        this.ctx.save();
        this.ctx.drawImage(this.image.img, this.x, this.y);
        this.ctx.restore();
    }
}

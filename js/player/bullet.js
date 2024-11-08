import DataBus from '../dataBus.js';
const dataBus = new DataBus();

export default class Bullet {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 5; // 子弹的宽度
        this.height = 10; // 子弹���高度
        this.image = dataBus.resources['bullet1.png']; // 子弹的图片资源
        this.isAlive = true; // 子弹是否存活
        this.ctx = dataBus.ctx;
        dataBus.addActor(this);
    }

    update() {
        this.y -= this.speed; // 子弹向上移动
        if (this.y < 0) {
            this.isAlive = false; // 子弹超出屏幕时设置为不存活
        }
    }

    render() {
        if (this.isAlive) {
            this.ctx.drawImage(this.image.img, this.x, this.y, this.width, this.height);
        }
    }
}

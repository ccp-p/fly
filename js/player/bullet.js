import DataBus from '../dataBus.js';
const dataBus = new DataBus();

export default class Bullet {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 5; // 子弹的宽度
        this.height = 10; // 子弹的高度
        this.image = dataBus.resources['bullet1.png']; // 子弹的图片资源
        this.isAlive = true; // 子弹是否存活
        this.ctx = dataBus.ctx;
        dataBus.addActor(this);
    }

    update() {
        this.y -= this.speed; // 子弹向上移动
        if (this.y < 0 || this.y > dataBus.canvas.height) {
            this.isAlive = false; // 子弹超出屏幕时设置为不存活
        }

        // 碰撞检测逻辑
        dataBus.actors.forEach(actor => {
            if (actor.constructor.name.startsWith('Enemy') && actor.isAlive) {
                if (this.x < actor.x + actor.width &&
                    this.x + this.width > actor.x &&
                    this.y < actor.y + actor.height &&
                    this.y + this.height > actor.y) {
                    // 碰撞发生
                    actor.health -= 1; // 减少敌人生命值
                    this.isAlive = false;
                    if (actor.health <= 0) {
                        actor.playDestoryAni();
                    }
                }
            }
        });
    }

    render() {
        if (this.isAlive) {
            this.ctx.drawImage(this.image.img, this.x, this.y, this.width, this.height);
        }
    }
}

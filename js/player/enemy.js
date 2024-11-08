import DataBus from '../dataBus.js';
import Bullet from './bullet.js';
const dataBus = new DataBus();

export default class Enemy {
    constructor(image) {
        this.image = image
        this.width = this.image.img.naturalWidth;
        this.height = this.image.img.naturalHeight;
        this.x = Math.random() * (dataBus.canvas.width - this.width);
        this.y = -this.height;
        this.ctx = dataBus.ctx;
        this.isAlive = true;
        this.speed = 2;
        this.zIndex = 2;
        this.health = 3; // 添加生命值属性
        dataBus.addActor(this);
    }
    destroy(){
        this.isAlive = false;
    }
    drawRect(){
        this.ctx.save();
        this.ctx.strokeStyle = 'red';
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.ctx.restore();
    }
    update() {
        this.y += this.speed;
        if (this.y > dataBus.canvas.height) {
            this.isAlive = false;
        }
    }
    attack() {
        // 敌人攻击逻辑
        if (Math.random() < .01) { // 1% 概率进行攻击
            const bulletX = this.x + this.width / 2 - 2.5;
            const bulletY = this.y + this.height;
            const bulletSpeed = -10; // 子弹向下移动
            
            const bullet = new Bullet(bulletX, bulletY, bulletSpeed,2);
        }
    }
    playDestoryAni(){
        this.destoryAniIndex = 0;
        this.destoryAniTimer = setInterval(()=>{
            this.image = this.destoryAniArr[this.destoryAniIndex];
            this.destoryAniIndex++;
            if(this.destoryAniIndex > this.destoryAniArr.length){
                clearInterval(this.destoryAniTimer);
                this.isAlive = false;
            }
        },100);
    }

    render() {
        this.ctx.save();
        this.ctx.drawImage(this.image.img, this.x, this.y);
        this.ctx.restore();
        this.drawRect();
    }
}

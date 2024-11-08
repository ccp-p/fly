import DataBus from '../dataBus.js';
import Bullet from './bullet.js';
const dataBus = new DataBus();
export default class Plane {

    constructor() {
        this.image = dataBus.resources['me1.png'];
        this.width = this.image.img.naturalWidth;
        this.height = this.image.img.naturalHeight;
        this.x = (dataBus.canvas.width - this.width) / 2;
        this.y = dataBus.canvas.height - this.height -100;
        this.ctx = dataBus.ctx;
        this.isAlive = true;
        this.zIndex = 3;
        this.fireInterval = 10; // 发射子弹的间隔帧数
        this.fireCount = 0; // 发射子弹的计数器
        this.bullets = [];
        this.health = 3;
        this.isInvincible = false;
        this.invincibleTime = 300;
        this.invincibleCount = 0;
        this.flyCount = 0;
        this.destroyCount = 0;
        dataBus.addActor(this);
    }
    borderDetection() {
        
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.x >= dataBus.canvas.width - this.width) {
            this.x = dataBus.canvas.width - this.width;
        }
        if (this.y <= 0) {
            this.y = 0;
        }
        if (this.y >= dataBus.canvas.height - this.height) {
            this.y = dataBus.canvas.height - this.height;
        }
    }
    bindEvent(){

    }
    getAttack() {
        this.health -= 1;
        console.log('health',this.health);
        
        if (this.health <= 0) {
            this.playDestroyAni();
        }
    }
    meFlyAni() {
        this.flyCount++;
        //  每隔10帧切换一次飞机图片
        const arr = [dataBus.resources['me1.png'], dataBus.resources['me2.png']];
        const index = Math.floor(this.flyCount / 5) % arr.length;
        
        this.image = arr[index];

    }
    playDestroyAni() {
        const aniArr = [dataBus.resources['me_destroy_1.png'], dataBus.resources['me_destroy_2.png'], dataBus.resources['me_destroy_3.png'], dataBus.resources['me_destroy_4.png']];
        this.destoryAniIndex = 0
        this.destoryAniTimer = setInterval(() => {
            this.image = aniArr[this.destoryAniIndex];
            this.destoryAniIndex++;
            if (this.destoryAniIndex >= aniArr.length) {
                clearInterval(this.destoryAniTimer);
                this.isAlive = false;
            }
        }, 100);

        
    }

    fire() {
        this.fireCount++;

        if (this.fireCount >= this.fireInterval) {
            const bulletX = this.x + this.width / 2 - 2.5; // 子弹从飞机中间发射
            const bulletY = this.y;
            const bulletSpeed = 10; // 子弹速度
            const bullet = new Bullet(bulletX, bulletY, bulletSpeed,1);
            this.fireCount = 0; // 重置发射计数器
        }
    }

    update() {
        this.meFlyAni();
        this.borderDetection();
       
        if (this.isInvincible) {
            this.invincibleCount++;
            if (this.invincibleCount >= this.invincibleTime) {
                this.isInvincible = false;
                this.invincibleCount = 0;
            }
        }
        // this.fire();
    }

    render() {
        this.ctx.save();
        this.ctx.drawImage(this.image.img, this.x, this.y);
        this.ctx.restore();
    }
}
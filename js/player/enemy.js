import DataBus from '../dataBus.js';
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
        dataBus.addActor(this);
    }
    destroy(){
        this.isAlive = false;
    }
    update() {
        this.y += this.speed;
        if (this.y > dataBus.canvas.height) {
            this.isAlive = false;
        }

        // 碰撞检测逻辑
        dataBus.actors.forEach(actor => {
            if (actor.constructor.name === 'Bullet' && actor.isAlive) {
                if (this.x < actor.x + actor.width &&
                    this.x + this.width > actor.x &&
                    this.y < actor.y + actor.height &&
                    this.y + this.height > actor.y) {
                    // 碰撞发生
                    this.playDestoryAni();
                    actor.isAlive = false;
                }
            }
        });
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
    }
}

import Enemy from './enemy.js';
import DataBus from '../dataBus.js';
const dataBus = new DataBus();
export default class Enemy3 extends Enemy {
    constructor() {
        super(dataBus.resources['enemy3_n1.png']);
        this.destoryAniArr= [dataBus.resources['enemy3_down1.png'],dataBus.resources['enemy3_down2.png'],dataBus.resources['enemy3_down3.png'],dataBus.resources['enemy3_down4.png'],dataBus.resources['enemy3_down5.png'],dataBus.resources['enemy3_down6.png']]
        this.flyCount = 0;
        

        
    }

    flyAni() {
        this.flyCount++;
        //  每隔10帧切换一次飞机图片
        const arr = [dataBus.resources['enemy3_n1.png'], dataBus.resources['enemy3_n2.png']];
        const index = Math.floor(this.flyCount / 5) % arr.length;
        
        this.image = arr[index];

    }

    update() {
        super.update();
        this.flyCount++;
        this.flyAni && this.flyAni();
        this.attack();
    }
}

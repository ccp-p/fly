import Enemy from './enemy.js';
import DataBus from '../dataBus.js';
const dataBus = new DataBus();
export default class Enemy2 extends Enemy {
    constructor() {
        super(dataBus.resources['enemy2.png']);
        this.destoryAniArr= [dataBus.resources['enemy2_down1.png'],dataBus.resources['enemy2_down2.png'],dataBus.resources['enemy2_down3.png'],dataBus.resources['enemy2_down4.png']]
        

        
    }

}

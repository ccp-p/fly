import Enemy from './enemy.js';
import DataBus from '../dataBus.js';
const dataBus = new DataBus();
export default class Enemy1 extends Enemy {
    constructor() {
        super(dataBus.resources['enemy1.png']);
        
        this.destoryAniArr= [dataBus.resources['enemy1_down1.png'],dataBus.resources['enemy1_down2.png'],dataBus.resources['enemy1_down3.png'],dataBus.resources['enemy1_down4.png']]
        
    }

}

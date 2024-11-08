import Enemy from './enemy.js';
import DataBus from '../dataBus.js';
const dataBus = new DataBus();
export default class Enemy3 extends Enemy {
    constructor() {
        super(dataBus.resources['enemy3_n1.png']);
        this.destoryAniArr= [dataBus.resources['enemy3_down1.png'],dataBus.resources['enemy3_down2.png'],dataBus.resources['enemy3_down3.png'],dataBus.resources['enemy3_down4.png'],dataBus.resources['enemy3_down5.png'],dataBus.resources['enemy3_down6.png']]
        
        

        
    }

}

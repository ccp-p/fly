import DataBus from './dataBus.js';

const dataBus = new DataBus();
import ResourceLoader from './base/resourceLoader.js';
import Plane from './player/plane.js';

let lastTime = 0;
const fps = 30; // Desired frames per second
const frameDuration = 1000 / fps; // Duration of one frame in ms
class Main {
    constructor() {
        // canvas
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        dataBus.canvas = this.canvas;
        dataBus.ctx = this.ctx;
        this.aniId = 0
        this.isAleadyInit = false;
        this.resources = new ResourceLoader();

        this.loop(Date.now());
    }
    init() {
        if (this.isAleadyInit) return;
        this.isAleadyInit = true;
        this.plane = new Plane()

        dataBus.reset()
    }

    loop(currentTime) {
        this.aniId = requestAnimationFrame(() => {
            this.loop(Date.now());
        });

        if (currentTime - lastTime >= frameDuration) {
            lastTime = currentTime;
            if (dataBus.isResourceReady) {
                this.init();
            }

            this.update();
        }
    }

    update() {
        // 如果资源未加载完成，直接返回
        if (!dataBus.isResourceReady) {
            return;
        }

        dataBus.ctx.clearRect(0, 0, dataBus.canvas.width, dataBus.canvas.height);
        dataBus.actors = dataBus.actors.filter(actor => actor.isAlive !== false);
        // 根据 zIndex 排序 actors
        dataBus.actors.sort((a, b) => a.zIndex - b.zIndex);
        dataBus.actors.forEach(actor => {
            actor.update();
            actor.render();
        });
    }
}
new Main();

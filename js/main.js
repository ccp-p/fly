import DataBus from './dataBus.js';
import Background from './runtime/background.js';
const dataBus = new DataBus();
import ResourceLoader from './base/resourceLoader.js';
import Plane from './player/plane.js';
import Enemy from './player/enemy.js'; // 新增导入

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

        this.enemyInterval = 20; // 敌人生成间隔帧数
        this.enemyCount = 0; // 敌人生成计数器

        this.loop(Date.now());
    }
    init() {
        if (this.isAleadyInit) return;
        this.isAleadyInit = true;
        this.plane = new Plane()
        this.background = new Background();
        this.bindEvnet()

        dataBus.reset()
    }
    bindEvnet(){
    //   press up down left right plane move
        window.addEventListener('keydown', (e) => {
        console.log('keydown', e.key);
        
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
                this.plane.y -= 10;
                break; 
            case 'ArrowDown':
            case 's':
                this.plane.y += 10;
                break;
            case 'ArrowLeft':
            case 'a':
                this.plane.x -= 10;
                break;
            case 'ArrowRight':
            case 'd':
                this.plane.x += 10;
                break;
                case ' ':
                this.plane.fire();
            default:
                break
        }
    }
    )

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

        // 敌人生成逻辑
        this.enemyCount++;
        if (this.enemyCount >= this.enemyInterval) {
            this.enemyCount = 0;
            new Enemy(); // 生成新的敌人
        }
    }
}
new Main();

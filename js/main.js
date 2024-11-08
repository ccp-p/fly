import DataBus from './dataBus.js';
import Background from './runtime/background.js';
const dataBus = new DataBus();
import ResourceLoader from './base/resourceLoader.js';
import Plane from './player/plane.js';
import Enemy1 from './player/enemy1.js'; // 新增导入
import Enemy2 from './player/enemy2.js'; // 新增导入
import Enemy3 from './player/enemy3.js'; // 新增导入

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
    //    持续手指移动 而移动
    
  

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
    );

    // 添加触摸事件监听器
    this.canvas.addEventListener('touchstart', (e) => {
        this.handleTouchMove(e);
    });

    this.canvas.addEventListener('touchmove', (e) => {
        this.handleTouchMove(e);
    });
    }

    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        this.plane.x = x - this.plane.width / 2;
        this.plane.y = y - this.plane.height / 2;
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
            // 敌人攻击逻辑
            if (actor.constructor.name === 'Enemy2' || actor.constructor.name === 'Enemy3') {
                actor.attack();
            }
        });

        // 敌人生成逻辑
        this.enemyCount++;
        if (this.enemyCount >= this.enemyInterval) {
            this.enemyCount = 0;
            let newEnemy;
            switch (Math.floor(Math.random() * 3)) {
                case 0:
                    newEnemy = new Enemy1();
                    break;
                case 1:
                    newEnemy = new Enemy2();
                    break;
                case 2:
                    newEnemy = new Enemy3();
                    break;
                default:
                    break;
            }

            // 检查新生成的敌人与现有敌人的距离，防止堆叠
            if (newEnemy) {
                let isValidPosition = true;
                dataBus.actors.forEach(actor => {
                    const isSameInstance = actor === newEnemy;
                    if (actor.constructor.name.startsWith('Enemy') && !isSameInstance) {
                        const actorRect = {
                            width: actor.width,
                            height: actor.height
                        }
                        const newEnemyRect = {
                            width: newEnemy.width,
                            height: newEnemy.height
                        }
                        const noCollisionX = actor.x + actorRect.width < newEnemy.x || newEnemy.x + newEnemyRect.width < actor.x;
                        const noCollisionY = actor.y + actorRect.height < newEnemy.y || newEnemy.y + newEnemyRect.height < actor.y;
                        if (!noCollisionX && !noCollisionY) {
                            isValidPosition = false;
                            console.log('invalid position');
                        }
                    }
                });

                if (!isValidPosition) {
                    newEnemy.destroy();
                }
            }
        }
    }
}
new Main();

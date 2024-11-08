import DataBus from "../dataBus.js";
// import json form "../dataBus.js";


const dataBus = new DataBus();
export default class ResourceLoader {
    constructor() {
        this.imageRoot = '../../images/';
        this.resourceMap = {}

        this.init(this.resourceMap)


    }
    async init(resourceMap){
        
      const jsonPath = [
            './js/base/resource.json',
      ]

      let resourceMaps = await this.initJson(resourceMap,jsonPath)
   console.log('resourceMaps',resourceMaps);
   
      dataBus.resources= await this.initImg(resourceMaps);


         console.log('dataBus.resources',dataBus.resources);
      
    }

    // 新增通用初始化方法
    initResource(prefix, count) {
        return Array.from({ length: count }, (_, i) => ({
            [`${prefix}${i + 1}.png`]: {
                img: null,
                sourceSize: { w: 0, h: 0 }
            }
        })).reduce((acc, curr) => ({ ...acc, ...curr }), {});
    }

    initFish(resourceMap) {
        // 1-5 为鱼的资源
        const fishDatas = [
            // 1~5
            { moveFrame: 4, captureFrame: 4 },
            { moveFrame: 4, captureFrame: 4 },
            { moveFrame: 4, captureFrame: 4 },
            { moveFrame: 4, captureFrame: 4 },
            { moveFrame: 4, captureFrame: 4 },
            // 6
            { moveFrame: 8, captureFrame: 4 },
            // 7
            { moveFrame: 6, captureFrame: 4 },
            // 8
            { moveFrame: 12, captureFrame: 0 ,undead: true},
            { moveFrame: 8, captureFrame: 4 },
            // 10
            { moveFrame: 6, captureFrame: 4 ,undead: true},
            // 11
            { moveFrame: 12, captureFrame: 0 ,undead: true},
            // 12
            { moveFrame: 12, captureFrame: 0 ,undead: true},
        ];
        // 6-10 为炮弹的资源
        const result = {
            ...resourceMap,
            ...fishDatas.map((data, index) => {
                return {
                    [`fish${index + 1}.png`]: {
                        img: null,
                        sourceSize: { w: 0, h: 0 },
                        ...data
                    }
                }
            }).reduce((acc, curr) => ({ ...acc, ...curr }), {})
        }
        return result;
    }

    initCannon(resourceMap) {
        return {
            ...resourceMap,
            ...this.initResource('cannon', 7)
        };
    }

    initNet(resourceMap) {
        return {
            ...resourceMap,
            ...this.initResource('web', 7)  // 假设有一张网的图片
        };
        resourceMap['web.png'] = {
            img: null,
            sourceSize: { w: 0, h: 0 },
            moveFrame: 1
        };
        return resourceMap;
    }

    initCoin(resourceMap) {
        const arr=  ['1','2']
        arr.map((item, index) => {
            resourceMap[`coinAni${item}.png`] = {
                img: null,
                sourceSize: { w: 0, h: 0 },
                moveFrame: 10  // 假设金币有 10 帧动画
            }
        })
     
        return resourceMap;
    }
    getBaseName(path){
        // 有可能是/有可能是\
        const arr = path.split('/');
        const arr2 = path.split('\\');
        const baseName = arr.length > arr2.length ? arr : arr2;
        return baseName.pop().split('.')[0];
    }

    async initImg(resourceMap){

     const imgPathArr = Object.keys(resourceMap).map(key => resourceMap[key].path);
     
        const imgArr = await this.loadImgs(imgPathArr);
        
        imgArr.forEach(({img,path}, index) => {
            const  keys = Object.keys(resourceMap)
            
            const baseName = this.getBaseName(path)
            
            const findKey = keys.find(key =>  key.includes(baseName));
            
            if(findKey){
                resourceMap[findKey].img = img;
            }
        })
        return resourceMap;
    }

    async initJson(resourceMap,path) {
      
         
      return  Promise.all(path.map(url => this.fetchJson(url)))
            .then(([res]) => {

                resourceMap = {
                   ...res
                } 
               const result = {}
                Object.keys(resourceMap).forEach(key => {
                    if(!result[key]){ 
                        result[key] = {};
                    }
                    const value = resourceMap[key];
                    result[key].path = value
                })

                return result;

            })
            .catch(error => console.error(error));
    }

    fetchJson(path) {
        const result = fetch(path).then(res => {
            return res.json();
        }).then(json => {
            return json;
        })
        return result;

    }
    loadImg(path) {
        return new Promise((resolve, reject) => {
            const img = new Image(path);
            img.src = path;
            img.onload = () => {
                resolve(img);
            }
            img.onerror = () => {
                reject(new Error('图片加载失败'));
            }
        })
    }

    loadImgs(imgPathArr) {
        const maxErrorCount = 3;
        return new Promise((resolve, reject) => {
            const result = []
            let completed = 0;

            const  load= () => {
                imgPathArr.map(path => {
                    let errorCount = 0;
                    
                    this.loadImg(path).then(img => {
                        
                        result.push({
                            img,
                            path
                        });
                        completed++;
                        if (completed === imgPathArr.length) {
                            dataBus.isResourceReady = true;
                            resolve(result);
                        }
                    }).catch(error => {
                        if (errorCount >= maxErrorCount) {
                            reject(new Error('图片加载失败'));
                        }
                        errorCount++;
                        load();
                    })
                })

            }

            load()
        })


    }

    loadResources(obj) {
        let count = 0;
        for (let key in this.src) {
            const img = new Image();
            dataBus.resources[key] = img;
            img.src = this.src[key];
            img.onload = () => {
                count++
                if (count === Object.keys(this.src).length) {
                    dataBus.isResourceReady = true;
                }
            }
            this.src[key] = img;
        }
    }
}
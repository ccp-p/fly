const fs = require('fs');
const path = require('path');
/**
 * 生成资源对象
 * @param {string} dir 图片资源目录路径
 * @returns {object} 图片名字和图片相对路径的对象
 */
 function generateResourceObject(dir) {
    const files = fs.readdirSync(dir);
    return files.reduce((acc, file) => {
        const extname = path.extname(file);
        if (extname === '.png' || extname === '.jpg' || extname === '.jpeg') {
            //  包含后缀名的文件名
           
            const name = path.basename(file, extname);
            const key = `${name}${extname}`;
            const relativePath = path.relative(__dirname, path.join(dir, file));
            
            acc[key] = relativePath
        }
        return acc;
    }, {});
}


function main(params) {
    const dir = path.join(__dirname, '../../images');
    const resourceObject = generateResourceObject(dir);
    // obj -> json
    obj2JsonFile(resourceObject);
    console.log(JSON.stringify(resourceObject, null, 2));
    
}
function obj2JsonFile(parresourceObjectams) {
    // obj -> json
    const json = JSON.stringify(parresourceObjectams, null, 2);
    fs.writeFileSync(path.join(__dirname, 'resource.json'), json);
    
}
main();

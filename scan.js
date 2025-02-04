const fs = require('fs');
const path = require('path');

// 定义一个函数getFileData，用于获取文件的数据信息
function getFileData(dir, file) {
  // 使用path模块的join方法，将目录和文件名拼接成完整的文件路径
  const filePath = path.join(dir, file);
  // 使用fs模块的statSync方法，获取文件的状态信息
  const stat = fs.statSync(filePath);
  // 使用path模块的extname方法，获取文件的扩展名
  const ext = path.extname(file);
  // 使用path模块的basename方法，获取不带扩展名的文件名
  const name = path.basename(file, ext);
  // 去掉扩展名中的点，获取文件类型
  const type = ext.substring(1); // remove the leading dot
  // 假设艺术家名字在文件名中的"-"之前，通过split方法分割字符串获取艺术家名字
  const artist = name.split(' -')[0]; // assuming the artist name is before the hyphen
  // 假设歌曲名字在文件名中的"-"之后，通过split方法分割字符串获取歌曲名字
  const _name = name.split('- ')[1]
  // 返回一个对象，包含文件的名字、艺术家、类型和完整名称
  return {
    name: _name, // 文件名（不含艺术家名字）
    artist: artist, // 艺术家名字
    type: type,
    fullName: `${artist} - ${_name}`, // 完整的文件名称（艺术家 - 文件名）
    
  };
}

function getFilesInDir(path) {
  const items = fs.readdirSync(path);
  const result = [];
  items.forEach(item => {
    const itemPath = `${path}/${item}`;
    const stat = fs.statSync(itemPath);
    if (stat.isFile() && (item.endsWith('.mp3') || item.endsWith('.flac') )) {
      result.push(getFileData(path, item));
    }
  });
  return result;
}

let list = getFilesInDir('.');
fs.writeFileSync('songList.json', JSON.stringify(list, null, 2));

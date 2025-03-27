import * as multer from 'multer';
import * as fs from 'fs';

const storage = multer.diskStorage({
  // 配置文件存储目录
  destination: function (req, file, cb) {
    try {
      // 尝试创建 uploads 目录
      fs.mkdirSync('uploads');
    } catch (error) {
      // 如果目录已存在，忽略错误
    }
    // 设置文件存储到 uploads 目录
    cb(null, 'uploads');
  },
  // 配置文件名生成规则
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + file.originalname;
    // 设置最终的文
    cb(null, uniqueSuffix);
  },
});

export { storage };

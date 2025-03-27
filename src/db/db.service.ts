import { Inject, Injectable } from '@nestjs/common';
import { DbModuleOptions } from './db.module';
import { access, readFile, writeFile } from 'fs/promises';

@Injectable()
export class DbService {
  @Inject('OPTIONS')
  private options: DbModuleOptions;

  async read<T>(): Promise<T[]> {
    const filePath = this.options.path; // 从配置中获取文件路径

    try {
      await access(filePath); // 从配置中获取文件路径
    } catch (e) {
      return []; // 如果文件不存在，返回空数组
    }

    const str = await readFile(filePath, {
      encoding: 'utf-8', // 以 UTF-8 编码读取文件
    });

    if (!str) {
      return []; // 如果文件内容为空，返回空数组
    }

    return JSON.parse(str) as T[]; // 使用类型断言确保返回正确的类型
  }

  async write<T>(data: T[]): Promise<void> {
    // 文件路径
    // 将对象转换为 JSON 字符串，如果对象为空则使用空数组
    // 使用 UTF-8 编码写入
    await writeFile(this.options.path, JSON.stringify(data || []), {
      encoding: 'utf-8',
    });
  }
}

import { DynamicModule, Module } from '@nestjs/common';
import { DbService } from './db.service';

export interface DbModuleOptions {
  path: string;
}

@Module({})
export class DbModule {
  static register(options: DbModuleOptions): DynamicModule {
    return {
      module: DbModule, // 动态模块固定的
      // 通过token的方式注入配置值
      providers: [
        {
          provide: 'OPTIONS',
          useValue: options,
        },
        DbService, // 添加 DbService 到 providers 数组
      ],
      // 导出服务供其他模块使用
      exports: [DbService],
    };
  }
}

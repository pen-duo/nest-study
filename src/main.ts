import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 全局管道：用于请求参数的验证和转换
  // transform: true 表示自动将请求数据转换为 DTO 类中定义的类型
  // 例如：将字符串 "123" 转换为数字 123，将字符串日期转换为 Date 对象等
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

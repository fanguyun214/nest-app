import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { AppModule } from './app.module';
import Logger from 'node-log-info';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    null,
    {
      // logger: new Logger({ name: 'nest-app' }) as any,
    },
  );
  const port = process.env.PORT || 3000;
  // app.use(); 全局中间件
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/');
  });
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { AppModule } from './app.module';
import Logger from 'node-log-info';
import { RolesGuard } from './app/guard/roles/roles.guard';
import { AuthGuard } from './app/guard/auth/auth.guard';
import { LoggingInterceptor } from './app/interceptor/logging/logging.interceptor';
import { TransformInterceptor } from './app/interceptor/transform/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    null,
    {
      // logger: new Logger({ name: 'nest-app' }) as any,
    },
  );
  const port = process.env.PORT || 3000;
  app.useGlobalGuards(new AuthGuard()); // 全局守卫
  app.useGlobalInterceptors(new LoggingInterceptor()); // 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor()); // 全局拦截器
  // app.use(); 全局中间件
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/');
  });
}
bootstrap();

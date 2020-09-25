import { Controller, Get } from '@nestjs/common';

// 子域路由
@Controller({ host: 'admin.example.com' })
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}

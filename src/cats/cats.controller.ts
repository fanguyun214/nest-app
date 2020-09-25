import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  //get /cats/list
  @Get('list')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  findAll(@Req() request: Request) {
    return {
      code: 1,
      msg: 'success',
      data: [
        { id: 1, name: 'cats1' },
        { id: 1, name: 'cats2' },
      ],
    };
  }

  // post /cats/add
  @Post('add')
  create(): any {
    return {
      code: 1,
      msg: 'success',
      data: 'new cats',
    };
  }

  // 重定向 /cats/docs | /cats/docs?version=number
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302) // 重定向
  getDocs(@Query('version') version) {
    // 获取query参数
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // 路由参数
  @Get(':id')
  findOne(@Param() params): any {
    console.log(params.id);
    return {
      code: 1,
      msg: 'success',
      data: `${params.id}#new cats`,
    };
  }
}

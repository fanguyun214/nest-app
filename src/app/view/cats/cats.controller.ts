import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Cat } from 'src/app/interface/cat.interface';
import { CreateCatDto } from '../../dto/cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  //get /cats/list
  @Get('list')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  findAll(@Req() request: Request): any {
    try {
      const list: Cat[] = this.catsService.list();
      return {
        code: 1,
        msg: 'success',
        data: list,
      };
    } catch (error) {
      // 异常处理
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  // post /cats/add
  @Post('add')
  create(@Body() createCatDto: CreateCatDto): any {
    console.log('createCatDto', createCatDto);
    this.catsService.add(createCatDto);
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

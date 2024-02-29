import {
    Controller, Get, Post, Delete, Put,
    Param, Query, Body,
    HttpCode, HttpStatus,
    Inject
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe'
import { ProductsService } from '../services/products.service'
import { CreateProductDto,UpdateProductDto,FilterProductsDto } from '../dtos/products.dto'

@ApiTags('products')
@Controller('products')
export class ProductsController {

  constructor(
      private productsService: ProductsService,
      @Inject('APP_NAME') private appName : string,
      private configService: ConfigService
  ) {}

  @Get('global')
  @ApiOperation({summary: 'Env global'})
  getGlobal(){
    const apiKey = this.configService.get('API_KEY')
    return {
      message: `name app:${this.appName} configService:${apiKey}`
    }
  }

  @Get('')
  async getProducts(@Query()  Params: FilterProductsDto) {
    return {
      message: `Filters Products`,
      result: await this.productsService.findAll(Params)
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getProduct(@Param('id',MongoIdPipe) id: string) {
    return {
      message: `This action returns a #${id} product`,
      result: await this.productsService.findOne(id)
    }
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateProductDto){
    return {
      message: 'Create action',
      payload : await this.productsService.create(payload)
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Body() body: UpdateProductDto, @Param('id',MongoIdPipe) id: string){
    return {
      message: 'Update action',
      id,
      body: await this.productsService.update(id, body)
    }
  }

  @Delete(':id')
  async delete(@Param('id',MongoIdPipe) id: string){
    return {
      message: 'Delete action',
      id : await this.productsService.delete(id)
    }
  }

}

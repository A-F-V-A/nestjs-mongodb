import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'

import { ProductsModule } from './products/products.module'
import { DatabaseModule } from './database/database.module'


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required()
      })
    }),
    ProductsModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module, Global } from '@nestjs/common'

@Global()
@Module({
  providers: [
    {
      provide: 'APP_NAME',
      useValue: 'NestJS'
    },
  ],
  exports : ['APP_NAME']
})
export class DatabaseModule {}

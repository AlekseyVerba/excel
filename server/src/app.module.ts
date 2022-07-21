import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ormConfiguration } from "./database"
import { UserModule } from "./user/user.module"
import { GetUser } from "./middlewares/getUser.middleware"
import { JwtModule } from "./jwt/jwt.module"
import { TableModule } from "./table/table.module"

@Module({
  imports: [
    ormConfiguration,
    UserModule,
    JwtModule,
    TableModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetUser).forRoutes("*")
  }
}

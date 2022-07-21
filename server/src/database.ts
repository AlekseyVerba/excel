import { TypeOrmModule } from "@nestjs/typeorm"

export const ormConfiguration = TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "excel",
    synchronize: true,
    autoLoadEntities: true
})
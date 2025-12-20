import { Module } from "@nestjs/common";
import { AppControler } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    controllers: [AppControler],
    providers: [AppService]
})
export class AppModule {}
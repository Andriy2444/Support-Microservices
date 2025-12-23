import { Module } from "@nestjs/common";
import { TicketsControler } from "./tickets.controller";
import { TicketsService } from "./tickets.service";

@Module({
    imports: [],
    controllers: [TicketsControler],
    providers: [TicketsService]
})

export class TicketsModule {}
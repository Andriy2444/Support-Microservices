import { Controller, Get } from "@nestjs/common";
import { TicketsService } from "./tickets.service";

@Controller('/api')
export class TicketsControler {
        constructor(private ticketsService: TicketsService) {}

    @Get('/tickets')
    getTickets() {
        return this.ticketsService.getTickets(1, 3, "OPEN")
    }
}
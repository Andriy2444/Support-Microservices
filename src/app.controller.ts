import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller('/api')
export class AppControler {

    constructor(private appService: AppService) {}

    @Get('/tickets')
    getTickets() {
        return this.appService.getTickets()
    }
}
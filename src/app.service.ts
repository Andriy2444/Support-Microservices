import { Injectable } from "@nestjs/common";
import { time } from "console";


@Injectable()
export class AppService {
    getTickets() {
        return [
            {ticket_id: 1, user_id: 1, support_id: 1, topic: 'These buttons doesnt working!', message: "Programistu dolboebi", time: "15:24:30", date: "20.12.2025"},
            {ticket_id: 1, user_id: 1, support_id: 1, message: "Programistu dolboebi", time: "15:25:30", date: "20.12.2025"},
        ]
    }
}

// ticket[t_id, u_id, s_id, topic]
// messages[msg_id, t_id, u_id, msg, date]
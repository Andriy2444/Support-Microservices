import { Injectable } from "@nestjs/common";

@Injectable()
export class TicketsService {
    // users = [{id, name, surname, pawwsord, user_role(1,2,3)}]
    // ticket[t_id, u_id, s_id, topic, status]
    // messages[msg_id, t_id, u_id, msg, date]

    private tickets = [
        { ticket_id: 1, status:"OPEN", topic: 'These buttons dont work!', description: "System error", time: "15:24:30", date: "20.12.2025" },
        { ticket_id: 2, status:"IN_PROGRESS", topic: 'Login issue', description: "Cannot login", time: "16:00:00", date: "20.12.2025" },
        { ticket_id: 2, status:"CLOSED", topic: 'Login issue', description: "Cannot login", time: "16:00:00", date: "20.12.2025" }
    ];

    private userTicket = [
        { ticket_id: 1, user_id: 1 },
        { ticket_id: 1, user_id: 2 },
        { ticket_id: 1, user_id: 3 },
        { ticket_id: 2, user_id: 1 },
        { ticket_id: 2, user_id: 2 },
    ];

    private message = [
        {id: 1, user_id: 1, ticket_id: 1, message: "Hello"}
    ]

    async getTickets(user_id: number, user_role: number, status: string) {
        if (user_role === 1) {
            return this.userTicket.filter(t => t.user_id === user_id);
        } else if (user_role === 2) {
            return this.tickets.filter(s => s.status === "OPEN");
        }

        return this.tickets;
        // return this.prisma.ticket
    }

    async 
    
}
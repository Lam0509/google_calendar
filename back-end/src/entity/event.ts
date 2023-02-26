import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm";
import User from "./user";

@Entity()

export class Event {

    @PrimaryGeneratedColumn({ name: "id", type: "int" })
    id: number;

    @Column({ name: "title", type: "nvarchar", length: 255, nullable: false })
    title: string;

    @Column({ name: "date", type: "datetime", nullable: false })
    date: Date;

    @Column({ name: "location", type: "nvarchar", length: 255, nullable: false })
    location: string;

    @Column({ name: "description", type: "nvarchar", length: 255, nullable: true })
    description: string;

    @ManyToMany(type => User, user => user.events, {
        cascade: true
    })
    @JoinTable()
    users: User[];
}

export default Event;
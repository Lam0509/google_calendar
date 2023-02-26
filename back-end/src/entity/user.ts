import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import Event from './event'

type Role = 'admin' | 'user'

@Entity()

export class User {

    @PrimaryGeneratedColumn({ name: "id", type: "int" })
    id: number;

    @Column({ name: "name", type: "nvarchar", length: 255, nullable: true })
    name: string;

    @Column({ name: "image", type: "nvarchar", length: 500, nullable: true })
    image: string;

    @Column({ name: "email", type: "nvarchar", length: 255, nullable: false, unique: true })
    email: string;

    @Column({ name: "password", type: "nvarchar", length: 255, nullable: false })
    password: string;

    @Column({ name: "role", type: "enum", default: 'user' , enum: [ 'admin', 'user']})
    role: Role;

    @ManyToMany(type => Event, event => event.users)
    events: Event[];
}

export default User;
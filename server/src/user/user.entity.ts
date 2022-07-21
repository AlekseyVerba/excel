import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, OneToMany } from "typeorm"
import { hashSync } from "bcryptjs"
import { Table } from "../table/table.entity"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    email: string

    @Column({
        select: false
    })
    password: string

    @CreateDateColumn()
    createAt: Date

    @OneToMany(() => Table, (table) => table.ownUser)
    myTables: Table[]

    @BeforeInsert()
    hashPassword(): void {
        this.password = hashSync(this.password, 8)
    }

}
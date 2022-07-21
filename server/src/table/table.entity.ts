import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "../user/user.entity"

@Entity()
export class Table {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({
        default: {}
    })
    content: string

    @Column({
        default: {}
    })
    columnWidth: string

    @Column({
        default: {}
    })
    rowHeight: string

    @Column({
        default: {}
    })
    styleCell: string

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @Column({
        unique: true
    })
    link: string

    @ManyToOne(() => User, (user) => user.myTables, {
        cascade: true
    })
    ownUser: User
}
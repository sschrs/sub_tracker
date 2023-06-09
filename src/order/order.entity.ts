import { IsIn, IsNotEmpty, IsNotEmptyObject, IsNumber } from "class-validator";
import { Address } from "src/address/address.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./order-detail.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsIn(['one-time', 'subscription'])
    orderMethod: "one-time" | "subscription";

    @Column({default: 0})
    discount: number;

    @Column({default: 'received'})
    @IsIn(['received', 'inProgress', 'shipped', 'completed'])
    orderStatus: "received" | "inProgress" | "shipped" | "completed"

    @CreateDateColumn()
    orderDate: Date;

    //relations
    @OneToMany(type => OrderDetail, orderDetail => orderDetail.order, { cascade: ['insert', 'update'] })
    @IsNotEmpty()
    details: OrderDetail[];

    @ManyToOne(type => User, user => user.orders, { cascade: ['insert', 'update'] })
    user: User;
    @Column()
    userId: number;

    @ManyToOne(type => Address, address => address.orders, { cascade: ['insert', 'update'] })
    address: Address;
    @Column()
    addressId: number;
}
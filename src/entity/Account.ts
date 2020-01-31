import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ObjectIdColumn,
} from 'typeorm';
import Department from '../enums/Department';
import { ObjectID } from 'mongodb';

@Entity('Account')
export class Account extends BaseEntity {
  @ObjectIdColumn()
  readonly idx: ObjectID; // MongoDB Index Number

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @Column({ type: 'text' })
  identity: string;

  @Column({ type: 'text' })
  studentId: string;

  @Column({ type: 'text' })
  username: string;

  @Column({ type: 'text' })
  phone: string;

  @Column({ type: 'text' })
  department: Department;

  @Column({ type: 'text' })
  password: string;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updateAt: Date;
}

export default Account;

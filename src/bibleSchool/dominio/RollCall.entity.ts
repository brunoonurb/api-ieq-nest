import {
  Column, CreateDateColumn, Entity, ObjectID,
  ObjectIdColumn, PrimaryColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { RollCallObject } from './RollCall.object';


@Entity()
class RollCall {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryColumn()
  readonly id: string;

  @Column()
  schoolMembers: RollCallObject[];

  @Column()
  offerValue: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { RollCall };


import { ManyToOne, ObjectID, ObjectIdColumn } from 'typeorm';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { RollCall } from './RollCall.entity';

@Entity('schoolmember')
class SchoolMember {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  class: string;

  @Column({
    type: 'enum',
    enum: ['Professor', 'Aluno'],
    default: 'Aluno',
  })
  profile: string;

  @Column()
  visitor:  boolean = true;

  @Column()
  isActive: boolean = true;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { SchoolMember };

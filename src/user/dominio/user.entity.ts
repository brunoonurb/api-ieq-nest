import { ObjectID, ObjectIdColumn } from "typeorm";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  profile: string;

  @Column()
  sector: string;

  @Column()
  sectorsActuated: string[];

  @Column()
  phone: string;

  @Column()
  codePassword: string;

  @Column()
  isActive: boolean = true;

  @Column()
  pwdToken: string;

  @Column()
  pwdExpires: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };

import { ObjectID, ObjectIdColumn } from "typeorm";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("mails")
class Mail {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryColumn()
  readonly id: string;

  @Column()
  to: string;

  @Column()
  subject: string;

  @Column()
  responseCode: number;

  @Column()
  response: string;

  @Column(
    // {
    // type: "enum",
    // enum: ["envio_email"],
    // default: "envio_email"
// }
)
  type: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Mail };

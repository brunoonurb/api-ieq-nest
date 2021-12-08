import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendMailCommand<EntityContextMail> {
  @ApiProperty()
  @IsString({ message: 'Destinatario deve ser string' })
  @IsNotEmpty({ message: 'Destinatario é obrigatório' })
  public to: string;

  @ApiProperty()
  @IsString({ message: 'Titulo deve ser string' })
  @IsNotEmpty({ message: 'Titulo é obrigatório' })
  public subject: string;

  @ApiProperty()
  @IsOptional()
  public template: string;

  @ApiProperty({ type: [Object] })
  @IsOptional()
  public context: EntityContextMail;

  constructor(
    to: string,
    subject: string,
    template: string,
    context?: EntityContextMail,
  ) {
    this.to = to;
    this.subject = subject;
    this.template = template;
    this.context = context;
  }
}

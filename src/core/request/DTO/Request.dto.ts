import { IPayload } from 'src/core/auth/dominio/IPayload.interface';

interface RequestDto extends ParameterDecorator {
  user: IPayload;
}

export { RequestDto };

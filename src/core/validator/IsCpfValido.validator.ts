import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validator } from 'cpf-cnpj-validator';
import * as Joi from '@hapi/joi';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsCpfValidoConstraint implements ValidatorConstraintInterface {
  validate(
    strCPF: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const joiExtend = Joi.extend(validator);
    const cpfchema = joiExtend.document().cpf();

    try {
      const { error } = cpfchema.validate(strCPF);

      if (error) {
        return false;
      }
      return true;
    } catch (errot) {
      return false;
    }
  }
}
export function IsCpfValido(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfValidoConstraint,
    });
  };
}

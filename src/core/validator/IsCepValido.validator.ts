import { Injectable } from '@nestjs/common';
var cep = require('cep-promise');
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsCepValidaConstraint implements ValidatorConstraintInterface {
  async validate(
    strCep: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    try {
      const resultCep = await cep(strCep);

      if (resultCep) return true;

      return false;
    } catch (error) {
      return false;
    }
  }
}
export function IsCepValido(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCepValidaConstraint,
    });
  };
}

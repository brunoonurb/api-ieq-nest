import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ufs, IUf } from '../utils/UnidadesFederativas';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUfValidaConstraint implements ValidatorConstraintInterface {
  validate(
    strUf: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    if (
      ufs.filter(
        (uf: IUf) =>
          `${uf.abreviacao}`.toUpperCase() === `${strUf}`.toUpperCase(),
      ).length === 0
    )
      return false;

    return true;
  }
}
export function IsUfValido(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUfValidaConstraint,
    });
  };
}

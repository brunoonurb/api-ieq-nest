import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersRepository } from 'src/user/infra/repository/monngoDb/Users.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailNotRegisteredConstraint
  implements ValidatorConstraintInterface
{
  // constructor(private readonly usersRepository: UsersRepository) {}
  async validate(
    email: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    
    // const userAlreadyExists = await this.usersRepository.searchByEmail(email);
    // if (userAlreadyExists) return false;

    return true;
  }
}
export function IsEmailNotRegistered(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailNotRegisteredConstraint,
    });
  };
}

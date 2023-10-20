import { Injectable } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class ValidationService {
  private populateEntity<E>(entity: E, values: { [prop: string]: any }): E {
    Object.keys(values).forEach((key) => (entity[key] = values[key]));
    return entity;
  }

  validate(
    Entity,
    values: {
      [prop: string]: any;
    },
  ): Promise<ValidationError[]> {
    const entity = this.populateEntity(new Entity(), values);
    return validate(entity);
  }
}

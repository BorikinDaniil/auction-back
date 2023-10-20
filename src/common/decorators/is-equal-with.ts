import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export const IsEqualWith =
  (validationOptions?: ValidationOptions) =>
  (object: object, propertyName: string) =>
    registerDecorator({
      name: 'IsEqualWith',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!validationOptions) {
            throw Error(
              'Please, pass a context into "IsEqualWith" validator. Field to validate should be specified. E.g. @IsEqualWith({ context: "email" })',
            );
          }

          const { context } = validationOptions;
          return value === (args.object as any)[context];
        },
        defaultMessage() {
          const { context } = validationOptions;

          return `Need to be equal with ${context}`;
        },
      },
    });

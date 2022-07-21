import { ArgumentMetadata, PipeTransform, BadGatewayException, HttpStatus } from "@nestjs/common"
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { valuesFromObjectToArr } from "../utils"
import { IErrorResponse } from "../types/response.interface"

export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors: ValidationError[] = await validate(object);

    if (errors.length > 0) {
      this.throwError(errors)
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private createObjectError(errorsArray: ValidationError[]): IValidation {
    const validationObj: IValidation = errorsArray.reduce((prevValue, currentValue) => {
      const { constraints, property } = currentValue

      const arrConstraints = valuesFromObjectToArr(constraints)
      return {
        ...prevValue,
        [property]: arrConstraints
      }


    }, {})

    return validationObj

  }


  throwError(errors: ValidationError[]) {
    const messageObj = this.createObjectError(errors)
    const errorObj: IErrorResponse = {
      status: false,
      message: "Ошибка валидации",
      errors: messageObj,
      statusCode: HttpStatus.BAD_REQUEST
    }
    throw new BadGatewayException(errorObj)
  }

}

interface IValidation {
  [index: string]: ValidationError["constraints"][]
}



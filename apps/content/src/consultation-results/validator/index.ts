import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import Joi, { ObjectSchema } from 'joi';

const schema: ObjectSchema = Joi.object({
  context: Joi.string().required(),
  top_ideas: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        ideas: Joi.array().items(
          Joi.object({
            idea: Joi.string().required(),
            agreement: Joi.number().required(),
            adhesion: Joi.number().required(),
            realistic: Joi.number().required(),
          }),
        ),
      }),
    )
    .required(),
  controversials: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().guid(),
        author: Joi.string().required(),
        avatarUrl: Joi.string(),
        content: Joi.string().required(),
        like_it: Joi.number().required(),
        agree: Joi.number().required(),
        disagree: Joi.number().required(),
        no_way: Joi.number().required(),
        votes: Joi.number().required(),
      }),
    )
    .required(),
  cartography: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().required(),
        unit: Joi.string().required(),
        name: Joi.string().required(),
        legend: Joi.string().allow(''),
        data: Joi.array()
          .items(
            Joi.object({
              label: Joi.string().required(),
              sublabel: Joi.string(),
              percent: Joi.number().required(),
              color: Joi.string()
                .pattern(/^#[0-9a-f]{3,6}$/i)
                .required(),
              adjustLabel: Joi.object({
                hidePercent: Joi.boolean(),
                textAlign: Joi.string().pattern(/center|end|left|right|start/),
                xAxis: Joi.number(),
                yAxis: Joi.number(),
              }),
            }),
          )
          .required(),
      }),
    )
    .required(),
  participation: Joi.array()
    .items(
      Joi.alternatives().try(
        Joi.object({
          id: Joi.string(),
          type: Joi.string()
            .pattern(/pie|histogram/)
            .required(),
          unit: Joi.string().required(),
          name: Joi.string().required(),
          legend: Joi.object({
            title: Joi.string().required(),
            dimensions: Joi.object({
              first: Joi.string().required(),
              second: Joi.string(),
            }).required(),
          }).required(),
          forcedHigherValue: Joi.number(),
          data: Joi.array()
            .items(
              Joi.object({
                label: Joi.string().required(),
                color: Joi.string().pattern(/^#[0-9a-f]{3,6}$/i),
                bars: Joi.object({
                  first: Joi.number().required(),
                  second: Joi.number(),
                }).required(),
              }),
            )
            .required(),
        }),
        Joi.object({
          id: Joi.string(),
          type: Joi.string()
            .pattern(/pie|histogram/)
            .required(),
          unit: Joi.string().required(),
          name: Joi.string().required(),
          legend: Joi.string().allow(''),
          data: Joi.array()
            .items(
              Joi.object({
                label: Joi.string().required(),
                sublabel: Joi.string(),
                percent: Joi.number().required(),
                color: Joi.string()
                  .pattern(/^#[0-9a-f]{3,6}$/i)
                  .required(),
                adjustLabel: Joi.object({
                  hidePercent: Joi.boolean(),
                  textAlign: Joi.string().pattern(
                    /center|end|left|right|start/,
                  ),
                  xAxis: Joi.number(),
                  yAxis: Joi.number(),
                }),
              }),
            )
            .required(),
        }),
      ),
    )
    .required(),
});

export const IsResultJson = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    let message = 'Invalid Json';
    registerDecorator({
      name: 'isResultJson',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: object) {
          const { error } = schema.validate(value);
          if (error) {
            message = `Invalid ${propertyName}: ${error.message}}`;
            return false;
          }
          return true;
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          switch (typeof validationOptions?.message) {
            case 'string':
              return validationOptions.message;
            case 'function':
              return validationArguments
                ? validationOptions.message(validationArguments)
                : message;
            default:
              return message;
          }
        },
      },
    });
  };
};

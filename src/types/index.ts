// This file will be passed to the TypeScript CLI to verify our typings compile

import S, { NumberSchema, StringSchema } from '../FluentSchema'

const schema = S.object()
  .id('http://foo.com/user')
  .title('A User')
  .description('A User desc')
  .definition(
    'address',
    S.object()
      .id('#address')
      .prop('line1')
      .prop('line2', S.anyOf([S.string(), S.null()]))
      .prop('country')
      .allOf([S.string()])
      .prop('city')
      .prop('zipcode')
  )
  .prop('username', S.string().pattern(/[a-z]*/g))
  .prop('email', S.string().format('email'))
  .prop(
    'avatar',
    S.string()
      .contentEncoding('base64')
      .contentMediaType('image/png')
  )
  .required()
  .prop(
    'password',
    S.string()
      .default('123456')
      .minLength(6)
      .maxLength(12)
      .pattern('.*')
  )
  .required()
  .prop('addresses', S.array().items([S.ref('#address')]))
  .required()
  .prop(
    'role',
    S.object()
      .id('http://foo.com/role')
      .prop('name')
      .enum(['ADMIN', 'USER'])
      .prop('permissions')
  )
  .required()
  .prop('age', S.mixed<NumberSchema & StringSchema>(['string', 'integer']))
  .ifThen(S.object().prop('age', S.string()), S.required(['age']))

  .valueOf()

console.log(JSON.stringify(schema))

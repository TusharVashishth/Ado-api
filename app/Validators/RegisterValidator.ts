import {
  schema,
  CustomMessages,
  rules,
  validator,
} from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.vanilla;

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name: schema.string([rules.minLength(2), rules.maxLength(50)]),
    email: schema.string([
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string([
      rules.minLength(6),
      rules.maxLength(30),
      rules.confirmed(),
    ]),
  });

  public messages: CustomMessages = {
    "email.required": "{{field}} field is required.",
    "name.required": "{{field}} field is required.",
    "password.required": "{{field}} field is required.",
  };
}

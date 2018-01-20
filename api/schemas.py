from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    userName = fields.Str(required=True,  validate= validate.Regexp("^[a-z0-9_-]{3,50}$"), error_messages={'required': 'username is required.',  \
    'validate' : 'Username has to be atleast 3 letters long and only have letters of the alphabet, numbers, and _ - '})
    email = fields.Email(required=True,  error_messages={'required': 'email is required.'})
    password = fields.Str(required=True, validate=validate.Regexp('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6,}$'), error_messages={'required': 'password is required.', \
    'validate': 'password has to have 1 uppercase letter, 1 special letter, 1 number, 3 lowercase letters.'} )
    confirm = fields.Str(required=True,  error_messages={'required': 'confirm password is required.'})


class UserWrapper(Schema):
    user = fields.Nested(UserSchema)



input_signup_schema =    {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "http://mynet.com/schemas/user.json#",
  "title": "User",
  "description": "User signup",
  "type": "object",
  "properties": {
    "user": {
      "properties": {
        "userName": {
          "type": "string",
          "maxLength": 50,
          "pattern": "^[a-zA-Z0-9_-]{3,50}$"
        },
        "email": {
          "type": "string",
          "format": "email"
        },
        "password": {
          "type": "string",
          "pattern" : "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6,}$",
          "minLength": 6
        },
        "confirm": {
          "type": "string",
          "const": {
            "$data": "1/password"
          }
        },
        "required": [
          "userName",
          "email",
          "password",
          "confirm"
        ]
      }
    }
  }
}
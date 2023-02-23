import { validate } from "schema-utils"

const schema = {
  type: "object",
  properties: {
    filename: {
      type: "string",
      length: 5,
    },
  },
  additionalProperties: false,
}

const options = {
  filename: 123123,
}

validate(schema, options)

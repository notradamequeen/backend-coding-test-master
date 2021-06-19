module.exports = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Backend Coding Test API with Swagger",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Febby",
        email: "oktaviani.febby@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8010/rides",
        description: "A rides crud API"
      },
    ],
  },
  apis: ["../src/app.js"],
  components: {
    schemas: {
      // id model
      id: {
        type: "string", // data type
        description: "An id of a todo", // desc
        example: "tyVgf", // example of an id
      },
      // todo model
      Todo: {
        type: "object", // data type
        properties: {
          id: {
            type: "string", // data-type
            description: "Todo identification number", // desc
            example: "ytyVgh", // example of an id
          },
          title: {
            type: "string", // data-type
            description: "Todo's title", // desc
            example: "Coding in JavaScript", // example of a title
          },
          completed: {
            type: "boolean", // data type
            description: "The status of the todo", // desc
            example: false, // example of a completed value
          },
        },
      },
      // Todo input model
      TodoInput: {
        type: "object", // data type
        properties: {
          title: {
            type: "string", // data type
            description: "Todo's title", // desc
            example: "Coding in JavaScript", // example of a title
          },
          completed: {
            type: "boolean", // data type
            description: "The status of the todo", // desc
            example: false, // example of a completed value
          },
        },
      },
      // error model
      Error: {
        type: "object", //data type
        properties: {
          message: {
            type: "string", // data type
            description: "Error message", // desc
            example: "Not found", // example of an error message
          },
          internal_code: {
            type: "string", // data type
            description: "Error internal code", // desc
            example: "Invalid parameters", // example of an error internal code
          },
        },
      },
    },
  },
  get: {
    tags: ["Todo CRUD operations"], // operation's tag.
    description: "Get todos", // operation's desc.
    operationId: "getTodos", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Todos were obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              // $ref: "#/components/schemas/Todo", // Todo model
            },
          },
        },
      },
    },
  },
};
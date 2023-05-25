import { ValidationError } from "express-validation";

const validationErrorMock = new ValidationError(
  {
    body: [
      {
        message: '"password" is required',
        _original: "",
        isJoi: true,
        name: "ValidationError",
        details: [
          {
            message: '"password" is required',
            path: ["password"],
            type: "any.required",
            context: {
              label: "password",
              key: "password",
            },
          },
        ],
        annotate: () => "",
      },
    ],
  },
  {
    statusCode: 411,
  }
);

export default validationErrorMock;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.NotFoundError = exports.CustomApiError = void 0;
const enum_1 = require("./enum");
class CustomApiError extends Error {
    constructor(message) {
        super(message);
        this.error_code = null;
        this.status = null;
    }
}
exports.CustomApiError = CustomApiError;
class NotFoundError extends CustomApiError {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.message = message;
        this.error_code = enum_1.ApiErrorEnum.RIDES_NOT_FOUND_ERROR;
        this.status = 404;
        Error.captureStackTrace(this, NotFoundError);
    }
}
exports.NotFoundError = NotFoundError;
class ValidationError extends CustomApiError {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.message = message;
        this.error_code = enum_1.ApiErrorEnum.VALIDATION_ERROR;
        this.status = 400;
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwaS5lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBc0M7QUFHdEMsTUFBYSxjQUFlLFNBQVEsS0FBSztJQUdyQyxZQUFZLE9BQWU7UUFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBSG5CLGVBQVUsR0FBa0IsSUFBSSxDQUFDO1FBQ2pDLFdBQU0sR0FBa0IsSUFBSSxDQUFDO0lBRzdCLENBQUM7Q0FDSjtBQU5ELHdDQU1DO0FBRUQsTUFBYSxhQUFjLFNBQVEsY0FBYztJQUM3QyxZQUFZLE9BQWU7UUFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxtQkFBWSxDQUFDLHFCQUFxQixDQUFDO1FBQ3JELElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFBO1FBQ2pCLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDaEQsQ0FBQztDQUNKO0FBVEQsc0NBU0M7QUFFRCxNQUFhLGVBQWdCLFNBQVEsY0FBYztJQUMvQyxZQUFZLE9BQWU7UUFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLG1CQUFZLENBQUMsZ0JBQWdCLENBQUE7UUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDdEIsQ0FBQztDQUNKO0FBUkQsMENBUUMifQ==
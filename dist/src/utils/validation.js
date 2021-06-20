"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRide = void 0;
const enum_1 = require("../enum");
const validateRide = (ride) => {
    if (ride.startLat < -90 || ride.startLat > 90 || ride.startLong < -180 || ride.startLong > 180) {
        return {
            isValid: false,
            error: {
                error_code: enum_1.ApiErrorEnum.VALIDATION_ERROR,
                message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
            }
        };
    }
    if (ride.endLat < -90 || ride.endLat > 90 || ride.endLong < -180 || ride.endLong > 180) {
        return {
            isValid: false,
            error: {
                error_code: enum_1.ApiErrorEnum.VALIDATION_ERROR,
                message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
            }
        };
    }
    if (typeof ride.riderName !== 'string' || ride.riderName.length < 1) {
        return {
            isValid: false,
            error: {
                error_code: enum_1.ApiErrorEnum.VALIDATION_ERROR,
                message: 'Rider name must be a non empty string'
            }
        };
    }
    if (typeof ride.driverName !== 'string' || ride.driverName.length < 1) {
        return {
            isValid: false,
            error: {
                error_code: enum_1.ApiErrorEnum.VALIDATION_ERROR,
                message: 'Rider name must be a non empty string'
            }
        };
    }
    if (typeof ride.driverVehicle !== 'string' || ride.driverVehicle.length < 1) {
        return {
            isValid: false,
            error: {
                error_code: enum_1.ApiErrorEnum.VALIDATION_ERROR,
                message: 'Rider name must be a non empty string'
            }
        };
    }
    return { isValid: true, error: null };
};
exports.validateRide = validateRide;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy92YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLGtDQUF1QztBQUVoQyxNQUFNLFlBQVksR0FBRyxDQUFDLElBQVUsRUFBRSxFQUFFO0lBQ3pDLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFO1FBQzlGLE9BQU87WUFDTCxPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRTtnQkFDSCxVQUFVLEVBQUUsbUJBQVksQ0FBQyxnQkFBZ0I7Z0JBQ3pDLE9BQU8sRUFBRSw0RkFBNEY7YUFDeEc7U0FDRixDQUFBO0tBQ0Y7SUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRTtRQUN0RixPQUFPO1lBQ0wsT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUU7Z0JBQ0gsVUFBVSxFQUFFLG1CQUFZLENBQUMsZ0JBQWdCO2dCQUN6QyxPQUFPLEVBQUUsMEZBQTBGO2FBQ3RHO1NBQ0YsQ0FBQztLQUNIO0lBRUQsSUFBSSxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNuRSxPQUFPO1lBQ0wsT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUU7Z0JBQ0wsVUFBVSxFQUFFLG1CQUFZLENBQUMsZ0JBQWdCO2dCQUN6QyxPQUFPLEVBQUUsdUNBQXVDO2FBQ2pEO1NBQ0YsQ0FBQztLQUNIO0lBRUQsSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNyRSxPQUFPO1lBQ0wsT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUU7Z0JBQ0wsVUFBVSxFQUFFLG1CQUFZLENBQUMsZ0JBQWdCO2dCQUN6QyxPQUFPLEVBQUUsdUNBQXVDO2FBQ2pEO1NBQ0YsQ0FBQztLQUNIO0lBRUQsSUFBSSxPQUFPLElBQUksQ0FBQyxhQUFhLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUMzRSxPQUFPO1lBQ0wsT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUU7Z0JBQ0wsVUFBVSxFQUFFLG1CQUFZLENBQUMsZ0JBQWdCO2dCQUN6QyxPQUFPLEVBQUUsdUNBQXVDO2FBQ2pEO1NBQ0YsQ0FBQztLQUNIO0lBRUQsT0FBTyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFBO0FBQ3JDLENBQUMsQ0FBQTtBQXBEWSxRQUFBLFlBQVksZ0JBb0R4QiJ9
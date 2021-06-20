import { Ride } from '../models';
import { ApiErrorEnum } from '../enum';

export const validateRide = (ride: Ride) => {
  if (ride.startLat < -90 || ride.startLat > 90 || ride.startLong < -180 || ride.startLong > 180) {
    return { 
      isValid: false, 
      error: {
          error_code: ApiErrorEnum.VALIDATION_ERROR,
          message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
      }
    }
  }

  if (ride.endLat < -90 || ride.endLat > 90 || ride.endLong < -180 || ride.endLong > 180) {
    return {
      isValid: false,
      error: {
          error_code: ApiErrorEnum.VALIDATION_ERROR,
          message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
      }
    };
  }

  if (typeof ride.riderName !== 'string' || ride.riderName.length < 1) {
    return {
      isValid: false,
      error: {
        error_code: ApiErrorEnum.VALIDATION_ERROR,
        message: 'Rider name must be a non empty string'
      }
    };
  }

  if (typeof ride.driverName !== 'string' || ride.driverName.length < 1) {
    return {
      isValid: false,
      error: {
        error_code: ApiErrorEnum.VALIDATION_ERROR,
        message: 'Rider name must be a non empty string'
      }
    };
  }

  if (typeof ride.driverVehicle !== 'string' || ride.driverVehicle.length < 1) {
    return {
      isValid: false,
      error: {
        error_code: ApiErrorEnum.VALIDATION_ERROR,
        message: 'Rider name must be a non empty string'
      }
    };
  }
  
  return {isValid: true, error: null}
}
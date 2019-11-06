import { isEqual } from "lodash";

/**
 * Utilities
 */
export class Utils {
    /**
     * Returns a boolean value that indicates whether given objects are equal.
     * @param {object} value1 - The object to be compared to 2nd object.
     * @param {object} value2 - The object to be compared to 1st object.
     * @returns {boolean} - Returns if A and B are equivalent.
     */
    static isEqual(value1: any, value2: any) {
        return isEqual(value1, value2);
    }
}
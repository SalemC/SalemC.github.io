/**
 * Convert an angle in degrees to radians.
 *
 * @param {number} degrees The angle in degrees.
 *
 * @return {number} The angle in radians.
 */
export const degreesToRadians = (degrees: number): number =>
    (degrees * Math.PI) / 180;

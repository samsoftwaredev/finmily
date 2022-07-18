export type Nullable<T> = T | undefined | null;
/**
 * Names should only include letters
 *
 * @TJS-pattern ^[a-zA-Z\-]+$
 * @minLength 2
 * @maxLength 64
 */
export type UserNameType = string;
/**
 * Names should only include letters, digits and spaces
 *
 * @TJS-pattern ^[a-zA-Z\-\s\d]+$
 * @minLength 2
 * @maxLength 64
 */
export type HouseholdNameType = string;
/**
 * Must match email format
 *
 * @TJS-format email
 */
export type EmailType = string;
/**
 * Must match UUID format
 *
 * @TJS-pattern ^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$
 */
export type UUIDType = string;

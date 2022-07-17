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
 * @TJS-format email
 */
export type EmailType = string;

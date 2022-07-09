
export enum HouseholdEventType {
    HOUSEHOLD_CREATED = "household_created",
    HOUSEHOLD_NAME_UPDATED = "household_name_updated",
    HOUSEHOLD_DELETED = "household_deleted",
    DESCRIPTION_UPDATED = "description_updated",
    PICTURE_UPDATED = "picture_updated",
    USER_REMOVED = "user_removed",
    USER_INVITED = "user_invited",
    USER_JOINED = "user_joined",
    USER_LEFT = "user_left",
    ADMIN_ADDED = "admin_added",
    ADMIN_REMOVED = "admin_removed",
    ADMIN_LEFT = "admin_left",
    VIEWED_USER_ACCOUNT = "viewed_user_account",
  }

  export enum HouseholdHistoryType {
    MESSAGES = "messages",
    HOUSEHOLD_EVENT = "household_event",
    LEDGER = "ledger",
  }
  
  export enum InvitedReasonType {
    HOUSEHOLD = "joinHousehold",
  }
  
  export enum SuspiciousType {
    LOOKS_LIKE_A_SCAMMER = "Looks like a scammer",
    ASK_FOR_PHONE_NUMBER_OR_EMAIL = "Ask for phone number or email",
    SEND_THEIR_PHONE_NUMBER_OR_EMAIL = "Send their phone number or email",
    ASK_FOR_ANOTHER_PAYMENT_METHOD = "Ask for another payment method",
    RUDE_OR_INAPPROPRIATE = "Rude or inappropriate",
    REQUESTED_MONEY = "Requested Money",
    SENT_MONEY = "Send money",
    NONE_OF_THE_ABOVE = "None of the above",
  }
  
  export enum ColorScheme {
    WHITE = "white",
    RED = "red",
    GREEN = "green",
    PURPLE = "purple",
    ORANGE = "orange",
    BLUE = "blue",
    YELLOW = "yellow",
  }
  
  export enum UserRoleType {
    SYS_ADMIN = "sys_admin",
    ADMIN = "admin",
    USER = "user",
  }
  
  export enum GenderType {
    MALE = "male",
    FEMALE = "female",
  }
export enum TokenError {
	TOKEN_EXPIRED = "TOKEN_EXPIRED",
	TOKEN_NOTFOUND = "TOKEN_NOTFOUND",
	TOKEN_INVALID = "TOKEN_INVALID",
}

export type TokenErrorType = (typeof TokenError)[keyof typeof TokenError];

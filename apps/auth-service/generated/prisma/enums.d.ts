export declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
    readonly MODERATOR: "MODERATOR";
};
export type Role = (typeof Role)[keyof typeof Role];

import { Attachment } from "./attachment";

export interface Bulletin {
    accountId: string;
    senderUserId: number;
    body: string;
    attachment: Attachment;
}
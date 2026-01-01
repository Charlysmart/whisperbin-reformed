import { NavigateFunction } from "react-router-dom"

export type AuthInputTypes = {
    label?: string,
    attribute: string,
    placeholder: string,
    value?: string,
    type: string,
    onchange?: (e:React.ChangeEvent<HTMLInputElement>) => void
}

export type SignUpTypes = {
    custom_username: string,
    email: string,
    password: string,
    confirm_password: string
}

export type ButtonTypes = {
    label: string | React.ReactNode,
    buttonType?: string,
    extraClass: string,
    disable?: boolean
    type?: "submit" | "button" | "reset"
    onclick?: () => void
}

export type InboxChatType = {
    user : string,
    time : string,
    content : string,
    read : boolean
}

export type InteractionStatsType = {
    likes : number,
    comments : number,
    liked : boolean
}

export type UserInfoType = {
    username : string,
    time : string
}

export type NotificationBlockType = {
    read : boolean,
    type : "message" | "like" | "reply" | "comment" | "comment-reply",
    content? : string,
    time : string,
    linkText : string,
    link? : string
}

export type AnonymousType = {
    read : boolean,
    content : string,
    time : string,
    replied : boolean,
    task : () => void,
    reply : () => void
}

export type CommentType = {
    username : string,
    time : string,
    comment : string,
    likes : number,
    comments : number,
    liked : boolean,
    left : number
}

export type AlertType = {
    message : string,
    success : boolean,
    top : string,
    onClose? : () => void
}

export type AnonymousDataType = {
    message_thread : string,
    content : string,
    receiver_id : number,
    replied : boolean,
    read : boolean,
    sent_at : string
}

export type ChatType = {
    userId : number,
    chat : {
        sender_id : number,
        receiver_id : number,
        message_thread : string,
        content : string,
        image : string,
        sent_at : string | Date,
        id : number,
        read : boolean
    }[]
}

export type AxiosType<T> = {
  url: string;
  data?: T;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  finallyCallback?: () => void;
  navigate?: NavigateFunction
};
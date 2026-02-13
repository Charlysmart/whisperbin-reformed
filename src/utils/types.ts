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
    image : boolean
    content : string,
    read : boolean,
    task? : () => void
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
    linkText? : string,
    link? : string,
    id : number
}

export type AnonymousType = {
    read : boolean,
    content : string,
    time : string,
    replied : boolean,
    task : () => void,
    reply : () => void,
    be_replied : boolean
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
    replied : boolean,
    read : boolean,
    sent_at : string,
    be_replied : boolean
}

export type InboxDataType = {
    message_thread : string,
    content : string,
    image : boolean,
    replied : boolean,
    read : boolean,
    sent_at : string
}

export type ChatType = {
    sender : boolean,
    message_thread : string,
    content : string,
    image : string,
    sent_at : string | Date,
    id : number,
    read : boolean,
    reply_to : string
}[]

export type AxiosType<T> = {
  url: string;
  data?: T;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  finallyCallback?: () => void;
  navigate?: NavigateFunction
};

export type WhisperroomType = {
    id : number,
    content : string,
    image : string,
    time : string,
    reply_to : string,
    sender : boolean,
    admin : boolean,
    is_admin : boolean
    room_name : string
}
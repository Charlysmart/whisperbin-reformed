export type AuthInputTypes = {
    label?: string,
    attribute: string,
    placeholder: string
}

export type ButtonTypes = {
    label: string | React.ReactNode,
    buttonType?: string,
    extraClass: string,
    // onClick: () => void
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

export type CommentType = {
    username : string,
    time : string,
    comment : string,
    likes : number,
    comments : number,
    liked : boolean,
    left : number
}
import { Heart, MessageCircle, User } from "lucide-react";
import type { UserInfoType, InteractionStatsType } from "@/utils/types";

export const UserInfo = ({ username, time } : UserInfoType) => (
  <div className="flex gap-3 items-center">
    <div className="bg-gray-200 p-2 rounded-full w-fit h-fit">
      <User size={30} aria-hidden="true" />
    </div>
    <div>
      <b className="md:text-lg text-[18px] text-primary">{username}</b>
      <p className="text-[14px] text-brand">{time}</p>
    </div>
  </div>
);

export const InteractionStats = ({ likes, comments, liked } : InteractionStatsType) => (
  <div className="flex gap-5 md:text-[16px] text-[14px]">
    <div className="flex items-center gap-1">
      <Heart size={16} aria-hidden="true" fill={liked ? "url(#my-gradient)" : "transparent"} color={liked ? "url(#my-gradient)" : "black"} />
      <p>{likes}</p>
    </div>
    <div className="flex items-center gap-1">
      <MessageCircle size={16} aria-hidden="true" />
      <p>{comments}</p>
    </div>
  </div>
);
import { Reply, Trash } from "lucide-react"

type ReplyType = {
    onreply: () => void
    ondelete: () => void
    sender: boolean
}
const ReplyModal = ({ onreply, ondelete, sender } : ReplyType) => {
    return (
        <div className="w-fit h-fit p-5 *:flex *:gap-3 space-y-5 rounded-2xl shadow-2xl font-medium cursor-pointer text-[18px]">
            <li className="text-ash" onClick={onreply}><Reply />Reply</li>
            {sender && <li className="text-red-500" onClick={ondelete}><Trash /> Delete</li>}
        </div>
    );
}
export default ReplyModal;
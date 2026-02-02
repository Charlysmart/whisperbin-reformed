import { Image, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { InteractionStats, UserInfo } from "@/user/components/statusComponent";
import Button from "@/components/button";
import { getData } from "@/api/get_request";
import { useNavigate } from "react-router-dom";
import { usePreloader } from "@/context/loaderContext";
import { postData } from "@/api/post_request";
import { alertBox } from "@/utils/alert";

/* ---------------- TYPES ---------------- */
type PostState = {
    content: string;
    hashtags: string[];
    image: File | null;
};

const hashtagRegex = /(#\w+)/g;

/* ---------------- HELPERS ---------------- */
const formatText = (text: string) =>
    text.replace(hashtagRegex, `<span class="text-blue-500">$1</span>`);

const extractHashtags = (text: string): string[] => {
  // Match # followed by letters, numbers, &, _ etc. until whitespace or punctuation
  const matches = text.match(/#([\w&]+)/g);
  if (!matches) return [];
  return [...new Set(matches.map(tag => tag.slice(1).toLowerCase()))];
};


const getActiveHashtag = (text: string) => {
    const match = text.match(/#(\w*)$/);
    return match ? match[1] : null;
};

const placeCursorAtEnd = (el: HTMLElement) => {
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
};

/* ---------------- COMPONENT ---------------- */
const StatusFeed = () => {
    const navigate = useNavigate();
    const { startLoading, stopLoading } = usePreloader();

    const editorRef = useRef<HTMLDivElement>(null);
    const filePicker = useRef<HTMLInputElement | null>(null);

    const [post, setPost] = useState<PostState>({
        content: "",
        hashtags: [],
        image: null,
    });

    const [preview, setPreview] = useState<string | null>(null);
    const [tags, setTags] = useState<{tag: string, posts: number}[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    /* ---------------- FETCH DASHBOARD ---------------- */
    async function fetchStatusData() {
        try {
            startLoading();
            await getData({
                url: "/pages/general",
                navigate,
                onError: (err) => console.log(err),
            });
        } finally {
            stopLoading();
        }
    }
    
    async function fetchTrendingTags() {
        await getData({
            url: "/pages/get_trending_hashtags",
            navigate,
            onSuccess: (response) => setTags(response.data),
            onError: (err) => console.log(err),
        });
    }

    async function postStatus() {
        if (!post.content.trim() && !post.image) {
            alertBox({ message: "Cannot post empty content!", success: false, top: "0" });
            return;
        }

        const formData = new FormData();
        formData.append("content", post.content);
        formData.append("hashtag", JSON.stringify(post.hashtags));
        if (post.image) {
            formData.append("image", post.image);
        }
        console.log(formData)
        await postData({
            url: "/pages/post_status",
            data: formData,
            navigate,
            onSuccess: (response) => {alertBox({ message: "Posted!", success: true, top: "0" }); setPost({content: "", hashtags: [], image: null})},
            onError: (error) => alertBox({ message: error.response.data.detail, success: false, top: "0" })
        });
    }

    useEffect(() => {
        fetchStatusData();
        fetchTrendingTags();
    }, []);

    /* ---------------- EDITOR INPUT ---------------- */
    const handleInput = () => {
        if (!editorRef.current) return;

        const text = editorRef.current.innerText;
        const hashtags = extractHashtags(text);
        const active = getActiveHashtag(text);

        setPost(prev => ({
            ...prev,
            content: text,
            hashtags,
        }));

        setSuggestions(
        active && tags
            ? tags
                .filter(tagObj => tagObj.tag.startsWith(active.toLowerCase()))
                .slice(0, 5)
                .map(tagObj => tagObj.tag)  // map to string array
            : []
        );

        editorRef.current.innerHTML = formatText(text);
        placeCursorAtEnd(editorRef.current);        
    };

    /* ---------------- INSERT HASHTAG ---------------- */
    const insertHashtag = (tag: string) => {
        if (!editorRef.current) return;

        const text = editorRef.current.innerText.replace(
            /#\w*$/,
            `${tag} `
        );

        setPost(prev => ({
            ...prev,
            content: text,
            hashtags: extractHashtags(text),
        }));

        editorRef.current.innerHTML = formatText(text);
        placeCursorAtEnd(editorRef.current);
        setSuggestions([]);
    };

    /* ---------------- IMAGE ---------------- */
    const openFile = () => filePicker.current?.click();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        setPost(prev => ({
            ...prev,
            image: e.target.files![0],
        }));
    };

    useEffect(() => {
        if (!post.image) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(post.image);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [post.image]);

    /* ---------------- RENDER ---------------- */
    return (
        <div className="bg-gray-50 w-full h-[calc(100vh-60px)] md:px-10 px-2 py-5 font-inter text-gray-600  md:font-normal font-mediumoverflow-hidden border-t flex">
            <div className="lg:w-[70%] w-full overflow-y-auto space-y-5 overflow-x-hidden no-scrollbar">

                {/* POST BOX */}
                <div className="shadow-md bg-white rounded-md md:p-6 py-6 px-3 space-y-5 w-full">
                    <div className="flex gap-3">
                        <div className="md:w-[10%]">
                            <div className="avatar-gradient p-2 rounded-full w-fit h-fit">
                                <User color="white" />
                            </div>
                        </div>

                        <div className="w-[90%]">
                            <div
                                ref={editorRef}
                                contentEditable
                                onInput={handleInput}
                                className="border border-gray-200 rounded-md w-full text-[14px] p-2 min-h-10 focus:outline-blue-500"
                                data-placeholder="Share your anonymous thoughts..."
                            />

                            {/* HASHTAG SUGGESTIONS */}
                            {suggestions.length > 0 && (
                                <div className="border bg-white rounded-md shadow-md mt-1 text-sm">
                                    {suggestions.map((tag, i) => (
                                        <div
                                            key={i}
                                            onClick={() => insertHashtag(tag)}
                                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-blue-500"
                                        >
                                            #{tag}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    <div className="flex justify-between items-end">
                        <div className="space-y-4">
                            <div
                                className="flex gap-3 items-center cursor-pointer"
                                onClick={openFile}
                            >
                                <Image size={16} />
                                <p>Image</p>
                            </div>

                            <input
                                type="file"
                                ref={filePicker}
                                onChange={handleImageChange}
                                className="hidden"
                            />

                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-32 h-24 object-contain"
                                />
                            )}
                        </div>

                        <Button
                            label="Post"
                            buttonType="colored"
                            extraClass="px-4 py-1"
                            onclick={postStatus}
                        />
                    </div>
                </div>

                {/* FEED (STATIC SAMPLE) */}
                <div className="space-y-5">
                    <div className="border border-border bg-card rounded-lg p-6 space-y-5">
                        <UserInfo username="@anonymous_3464" time="4 hours ago" />
                        <div>
                            <p>Just sent my first anonymous message! Feeling empowered by the privacy AnonyText offers. This platform is amazing for sharing thoughts without judgment.</p>
                        </div>
                        <hr className="border-gray-200" />
                        <InteractionStats likes={102} comments={453} liked={true} />
                    </div>
                    
                    <div className="border border-gray-200 bg-card rounded-lg p-6 space-y-5">
                        <UserInfo username="@anonymous_4564" time="1 hours ago" />
                        <div>
                            <p>Just sent my first anonymous message! Feeling empowered by the privacy AnonyText offers. This platform is amazing for sharing thoughts without judgment.</p>
                        </div>
                        <div className="flex justify-center">
                            <img src="" alt="" className="border md:w-1/2 w-full h-72"/>
                        </div>
                        <hr className="border-gray-200" />
                        <InteractionStats likes={32} comments={16} liked={false} />
                    </div>                    
                </div>
            </div>
            <div className="w-[30%] lg:flex flex-col hidden items-center gap-5">
                <div className="w-[85%] border border-gray-200 bg-white rounded-md p-3 space-y-2">
                    <h1>Trending Topics</h1>
                    <div className="text-[14px] space-y-2 *:flex *:justify-between">
                        <p><span className="text-blue-500">#health&wellbeing</span><span className="text-gray-600">123 posts</span></p>
                        <p><span className="text-blue-500">#addiction</span><span className="text-gray-600">75 posts</span></p>
                        <p><span className="text-blue-500">#addiction</span><span className="text-gray-600">154 posts</span></p>
                        <p><span className="text-blue-500">#domesticviolence</span><span className="text-gray-600">13 posts</span></p>
                    </div>
                </div>
                <div className="w-[85%] border border-gray-200 bg-white rounded-md p-3 space-y-2">
                    <h1>Stay Anonymous & Safe</h1>
                    <div className="text-[14px] text-gray-600">
                        Our community thrives on respect and anonymity. Please familiarize yourself with our guidelines to ensure a positive experience for everyone.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusFeed;

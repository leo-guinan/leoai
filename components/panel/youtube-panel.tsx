import YouTubePlayer from "@/components/content/youtube-player";

interface YoutubePanelProps {
    videoId: string;
    title: string;
    description: string;
}

export default function YoutubePanel({videoId, title, description}: YoutubePanelProps) {
    return (
        <>
            <YouTubePlayer videoId={videoId} title={title} description={description}/>
        </>
    )
}
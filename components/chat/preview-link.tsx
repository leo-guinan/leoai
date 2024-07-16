import React from 'react';
import Link from "next/link";

interface LinkPreviewProps {
    metadata: Record<string, string>
    source: string
}

const LinkPreview: React.FC<LinkPreviewProps> = ({metadata, source}) => {

    if (source === 'youtube') {
        const videoId = metadata.videoId
        if (!videoId) return null;
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

        return (<Link
                href={`?view=${metadata.source}&videoId=${metadata.videoId}&title=${metadata.title}&description=${metadata.description}`}>

                <div className="flex items-center space-x-2 p-2 rounded-md">

                    <img
                        src={thumbnailUrl}
                        alt="YouTube Video Thumbnail"
                        className="w-24 h-18 object-cover rounded"
                    />
                    <div className="flex flex-col">
                        <div className="text-sm font-medium">{metadata.title}</div>


                    </div>
                </div>
            </Link>

        );
    }

    if (source !== 'youtube') {
        return (

            <a href={metadata.url} target={"_blank"} rel={"noopener noreferrer"}>
                <div className="flex items-start space-x-2 p-2 rounded-md">
                    <img
                        src={metadata.image}
                        alt="Article Thumbnail"
                        className="w-24 h-24 object-cover rounded"
                    />

                    <div className="flex flex-col flex-grow">
                        <div className="text-sm font-medium">{metadata?.title}</div>
                        <div className="text-xs text-gray-500">{metadata?.description}</div>
                    </div>
                </div>
            </a>

        );
    }

    // // Fallback for other types of links
    // return (
    //   <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md">
    //     <ExternalLink size={24} className="text-gray-500" />
    //     <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500">
    //       {url}
    //     </a>
    //   </div>
    // );
};

export default LinkPreview;
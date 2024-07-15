import React from 'react';

interface YouTubePlayerProps {
    videoId: string;
    title: string;
    description: string;
}

export default function YouTubePlayer({videoId, description, title}: YouTubePlayerProps) {

    if (!videoId) {
        return <div className="text-red-500">Invalid YouTube URL</div>;
    }

    return (
        <div className="w-full">
            <div className="relative pt-[56.25%]">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                ></iframe>
            </div>
            <div>
                <h1>{title}</h1>
                <p>
                    {description}

                </p>
            </div>
        </div>
    );
};


import React from 'react';

interface YouTubePreviewProps {
  videoId: string;
    title: string;
}

export default function YouTubePreview({ videoId, title }: YouTubePreviewProps) {


  if (!videoId) {
    return <div className="text-red-500">Invalid YouTube URL</div>;
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

  return (
    <div className="flex items-center space-x-2 p-2 rounded-md">
      <img
        src={thumbnailUrl}
        alt="YouTube Video Thumbnail"
        className="w-16 h-12 object-cover rounded"
      />
      <div className="text-sm font-medium truncate">
          {title}
      </div>
    </div>
  );
};


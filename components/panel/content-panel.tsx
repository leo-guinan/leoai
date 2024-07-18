import React, {useState} from 'react';
import {ExternalLink} from "lucide-react";

interface WebContentViewerProps {
    url: string;
    title: string;
    description: string;
    image: string;
}

export default function WebContentViewer({url, title, description, image}: WebContentViewerProps) {
    const [isLoading, setIsLoading] = useState(true);

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    return (
    <div className="w-full h-full p-6 overflow-auto">
        <div className="w-full h-full  p-6 overflow-auto">
        <div className="w-full mb-4 overflow-hidden rounded-lg shadow-lg" style={{ maxHeight: '300px' }}>

                    <img src={image} alt={title}
                         className="w-full h-48 object-cover rounded-lg mb-4"/>
        </div>
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:bg-blue-600 transition duration-300"
                >
                    Read Full Article <ExternalLink className="ml-2 h-4 w-4"/>
                </a>
            </div>
        </div>
    );
};


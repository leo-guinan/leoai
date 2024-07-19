'use client'
import {useSearchParams} from "next/navigation";
import YoutubePanel from "@/components/panel/youtube-panel";
import {useEffect} from "react";
import WebContentViewer from "@/components/panel/content-panel";

export default function Panel() {

    const searchParams = useSearchParams()
    useEffect(() => {
        for (const key of searchParams.keys()) {
            console.log(key, searchParams.get(key))
        }
    }, [searchParams])


    return (
        <>
            <div className="size-full">
                {searchParams.get('view') === 'ideasupplychain_yt' && (
                    <div className="size-full">
                        <YoutubePanel videoId={searchParams.get('videoId') ?? ""}
                                      title={searchParams.get('title') ?? ""}
                                        description={searchParams.get('description') ?? ""}
                        />
                    </div>
                )}
                {searchParams.get('view') && searchParams.get('view') !== 'ideasupplychain_yt' && (
                    <div className="size-full">
                        <WebContentViewer
                            image={searchParams.get('image') ?? ""}
                            url={searchParams.get('url') ?? ""}
                            description={searchParams.get('description') ?? ""}
                            title={searchParams.get('title') ?? ""} />
                    </div>
                )}

            </div>

        </>
    )
}
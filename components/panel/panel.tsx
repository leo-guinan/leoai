'use client'
import {useSearchParams} from "next/navigation";
import YoutubePanel from "@/components/panel/youtube-panel";
import {useEffect} from "react";

export default function Panel() {

    const searchParams = useSearchParams()
    useEffect(() => {
        for (const key of searchParams.keys()) {
            console.log(key, searchParams.get(key))
        }
    }, [searchParams])


    return (
        <>
            <div className="h-full">
                {searchParams.get('view') === 'youtube' && (
                    <div className="size-full">
                        <YoutubePanel videoId={searchParams.get('videoId') ?? ""}
                                      title={searchParams.get('title') ?? ""}
                                        description={searchParams.get('description') ?? ""}
                        />
                    </div>
                )}

            </div>

        </>
    )
}
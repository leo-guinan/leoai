'use client'
import React, { useState } from 'react';
import useSWR from 'swr';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ReactMarkdown from 'react-markdown'
import {writeLinkedInPosts} from "@/app/actions/admin";



// This is a mock fetcher function. Replace with your actual API call.
const fetcher = async (url: string): Promise<string[]> => {
    const topic = url.split('?topic=')[1]
  // Simulating an API call
  const posts =  await writeLinkedInPosts(topic)
  
  return posts
};

const LinkedInTopicPosts: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: posts, error } = useSWR<string[]>(
    searchTerm ? `/api/linkedin-posts?topic=${searchTerm}` : null,
    fetcher
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(topic);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic"
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
      </form>

      {error && <p className="text-red-500">Failed to load posts</p>}
      
      {posts && posts.length > 0 && (
        <Carousel className="w-full">
          <CarouselContent>
            {posts.map((post, i) => (
              <CarouselItem key={`post_${i}`}>
                <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <CardContent className="p-6">
                    <ReactMarkdown className="prose">
                      {post}
                    </ReactMarkdown>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}

      {posts && posts.length === 0 && (
        <p className="text-center">No posts found for this topic.</p>
      )}
    </div>
  );
};

export default LinkedInTopicPosts;
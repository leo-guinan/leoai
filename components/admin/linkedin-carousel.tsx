import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface LinkedInPost {
  id: string;
  content: string;
}

interface LinkedInPostCarouselProps {
  posts: LinkedInPost[];
}

const LinkedInPostCarousel: React.FC<LinkedInPostCarouselProps> = ({ posts }) => {
  return (
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent>
        {posts.map((post) => (
          <CarouselItem key={post.id}>
            <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
              <CardContent className="p-6">
                <ReactMarkdown className="prose">
                  {post.content}
                </ReactMarkdown>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default LinkedInPostCarousel;
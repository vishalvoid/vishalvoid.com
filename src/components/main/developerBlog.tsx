"use client";

import React, { useEffect, useState } from "react";
import ShellWrapper from "../layouts/shell-wrapper";
import {
  BlogCard,
  BlogCardImage,
  BlogCardTitle,
  BlogCardDescription,
  BlogCardContent,
  BlogCardFooter,
} from "@/components/ui/blogs-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeveloperDetails } from "@/dev-constants/details";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

type BlogPost = {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  content: string;
  description?: string;
};

const DeveloperBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        // Using RSS2JSON API to fetch Medium posts
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@vishalvoid`,
        );
        const data = await response.json();

        if (data.status === "ok") {
          setPosts(data.items.slice(0, 4)); // Get latest 6 posts
        }
      } catch (error) {
        console.error("Error fetching Medium posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMediumPosts();
  }, []);

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const text = String(content).replace(/<[^>]*>/g, "");
    const wordCount = text.trim() ? text.split(/\s+/).length : 0;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const extractImageFromContent = (content: string) => {
    const imgRegex = /<img[^>]+src="([^"]+)"/;
    const match = String(content).match(imgRegex);
    return match ? match[1] : null;
  };

  if (loading) {
    return (
      <ShellWrapper>
        <div className="relative overflow-hidden p-2 space-y-6">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-100 rounded-lg border border-border bg-muted/50 animate-pulse"
              />
            ))}
          </div>
        </div>
      </ShellWrapper>
    );
  }

  return (
    <ShellWrapper>
      <div className="relative overflow-hidden p-2 space-y-6">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {posts.map((post: BlogPost, index: number) => {
            const thumbnail =
              extractImageFromContent(post.content) || post.thumbnail;
            const readingTime = getReadingTime(post.content);

            return (
              <BlogCard key={index} link={post.link} className="group">
                {thumbnail && (
                  <BlogCardImage src={thumbnail} alt={post.title} />
                )}

                <BlogCardContent className="space-y-2">
                  <BlogCardTitle
                    className="group-hover:underline group-hover:underline-offset-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    title={post.title}
                  >
                    {post.title}
                  </BlogCardTitle>
                  <BlogCardDescription>
                    {post.description?.replace(/<[^>]*>/g, "")}
                  </BlogCardDescription>
                </BlogCardContent>

                <BlogCardFooter className="flex justify-between pb-5">
                  <div className="flex items-center gap-2">
                    <Avatar className="border">
                      <AvatarImage
                        src={DeveloperDetails.avatar}
                        alt={DeveloperDetails.name}
                      />
                      <AvatarFallback>
                        {DeveloperDetails.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start justify-start">
                      <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {DeveloperDetails.name}
                      </p>
                      <time
                        dateTime={post.pubDate}
                        className="text-sm text-muted-foreground"
                      >
                        {formatDate(post.pubDate)}
                      </time>
                    </div>
                  </div>
                  <div className="flex gap-px items-center justify-center">
                    <span className="text-muted-foreground group-hover:text-primary transition-colors duration-500">
                      Read More
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
                    />
                  </div>
                </BlogCardFooter>
              </BlogCard>
            );
          })}
        </div>
      </div>
    </ShellWrapper>
  );
};

export default DeveloperBlog;

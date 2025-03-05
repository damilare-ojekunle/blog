"use client";

import { useEffect, useState } from "react";

import NewsList from "@/components/news-list";

export default function NewsListPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:8080/news");
      if (!response.ok) {
        setError("Failed to fetch news");
        setLoading(false);
      }
      const news = await response.json();
      setLoading(false);
      setNews(news);
    };
    fetchNews();
  }, []);

  console.log("news", news);

  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  let newsContent;
  if (news.length > 0) {
    // Check if there is news to display
    newsContent = <NewsList news={news} />;
  } else {
    newsContent = <p>No news available.</p>; // Optional: message when no news is found
  }

  return (
    <>
      <h1>News Page</h1>
      {newsContent}
    </>
  );
}

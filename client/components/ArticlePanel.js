"use client";

import { useState, useMemo, useEffect, useContext } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlobalStateContext } from "./context/Global";
export const ArticlePanel = ({ articles }) => {
  const [sortBy, setSortBy] = useState("title");
  const {
    industryFilter: filterIndustry,
    setIndustryFilter: setFilterIndustry,
    searchFilter: searchTerm,
    setSearchFilter: setSearchTerm,
  } = useContext(GlobalStateContext);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  const filteredAndSortedArticles = useMemo(() => {
    return articles
      .filter(
        (article) =>
          (filterIndustry === "" ||
            filterIndustry === "all" ||
            article.Industries.includes(filterIndustry)) &&
          (searchTerm === "" ||
            article.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.Companies.join(", ")
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => {
        if (sortBy === "title") {
          return a.Title.localeCompare(b.title);
        } else if (sortBy === "date") {
          return a.Timestamp - b.Timestamp;
        } else {
          return a.Industries[0].localeCompare(b.Industries[0]);
        }
      });
  }, [articles, sortBy, filterIndustry, searchTerm]);

  const pageCount = Math.ceil(
    filteredAndSortedArticles.length / articlesPerPage
  );
  const currentArticles = filteredAndSortedArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  // Added articles to the dependency array
  const uniqueIndustries = useMemo(() => {
    const industries = new Set();
    articles.forEach((article) =>
      article.Industries.forEach((industry) => industries.add(industry))
    );
    return Array.from(industries);
  }, [articles]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6 text-white drop-shadow-md border-b-2 border-gray-300 pb-2">
        {" "}
        Latest Stories for You{" "}
      </h1>
      <div className="mb-4 flex flex-wrap gap-4 text-black">
        <Input
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Sort by Title</SelectItem>
            <SelectItem value="industries">Sort by Industry</SelectItem>
            <SelectItem value="date">Sort by Date</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterIndustry} onValueChange={setFilterIndustry}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {uniqueIndustries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        {currentArticles.map((article, index) => (
          <a
            key={index}
            href={article.URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]">
              <CardHeader>
                <CardTitle>{article.Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={article.ImageURL || "/placeholder.svg"}
                      alt={article.Title}
                      width={200}
                      height={150}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-gray-600 mb-2">
                      {article.AISummary}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {article.Industries.map((industry) => (
                        <Badge key={industry} variant="secondary">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      Companies: {article.Companies.join(", ")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
      {pageCount > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              variant={currentPage === page ? "default" : "outline"}
            >
              {page}
            </Button>
          ))}
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, pageCount))
            }
            disabled={currentPage === pageCount}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

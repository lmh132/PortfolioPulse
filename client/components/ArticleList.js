import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const getIndustryColor = (industry) => {
  const colors = {
    Technology: "text-industry-tech",
    Healthcare: "text-industry-healthcare",
    Financials: "text-industry-financials",
    Energy: "text-industry-energy",
    "Consumer Discretionary": "text-industry-consumerDiscretionary",
  };
  return colors[industry] || "text-gray-400"; // Default color if industry not found
};

const ArticleCard = ({ article }) => {
  return (
    <a href={article.URL} rel="noopener noreferrer" target="_blank">
      <Card className="overflow-hidden bg-gray-300 h-[420px] flex flex-col transition-all duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:-translate-y-1">
        <div className="relative h-64">
          <Image
            src={article.ImageURL || "/placeholder.svg"}
            alt={article.Title}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          <h2 className="text-lg font-semibold line-clamp-2 text-black">
            {article.Title}
          </h2>
          <div className="text-sm mt-1">
            <p>
              <strong>Industry:</strong>{" "}
              <span className={getIndustryColor(article.Industry)}>
                {article.Industry || "N/A"}
              </span>
            </p>
            <p className="text-gray-600">
              <strong>Companies:</strong>{" "}
              {article.Companies?.join(",") || "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

const ArticleList = ({ articles }) => {
  return (
    <div className="grid grid-cols-3 gap-10 w-full h-full">
      {articles.map((article) => (
        <div key={article.ArticleID} className="w-full h-full">
          <ArticleCard article={article} />
        </div>
      ))}
    </div>
  );
};

export default ArticleList;

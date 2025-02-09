import requests
import json
import re
from datetime import datetime, timedelta, timezone

def fetch_articles(company, api_key, page_size=50, language='en', use_top_headlines=False):
    sources = ["cnbc.com", "bloomberg.com", "cnn.com", "apnews.com", "fidelity.com"]
    articles_by_source = {source: [] for source in sources}
    
    for source in sources:
        if use_top_headlines:
            url = "https://newsapi.org/v2/top-headlines"
            params = {
                "q": f'"{company}"',
                "language": language,
                "pageSize": page_size,
                "apiKey": api_key
            }
        else:
            url = "https://newsapi.org/v2/everything"
            from_date = (datetime.now(timezone.utc) - timedelta(days=10)).strftime('%Y-%m-%dT%H:%M:%SZ')
            to_date = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
            params = {
                "q": f'"{company}"',
                "searchIn": "title,description,content",
                "sortBy": "relevancy",
                "language": language,
                "from": from_date,
                "to": to_date,
                "domains": source,
                "pageSize": page_size,
                "apiKey": api_key
            }
        
        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "ok":
                articles_by_source[source] = data.get("articles", [])[:10]
    
    return articles_by_source

def clean_content(content):
    if content:
        return re.sub(r'\[\+\d+ chars\]', '', content).strip()
    return "No Content"

def process_articles(articles_by_source, industry, company):
    processed = []
    for source, articles in articles_by_source.items():
        for idx, article in enumerate(articles):
            description = article.get("description", "No Description")
            processed.append({
                "ArticleID": f"{company}_{source}_{idx+1}",
                "Source": article.get("source", {}).get("name", "Unknown"),
                "Title": article.get("title", "No Title"),
                "Author": article.get("author", "Unknown"),
                "Description": description,
                "URL": article.get("url", "No URL"),
                "ImageURL": article.get("urlToImage", "No Image URL"),
                "Industry": industry,
                "Company": company,
                "TimePub": article.get("publishedAt", "No Publication Time"),
                "Summary": clean_content(article.get("content", "No Content"))
            })
    return processed

def aggregate_articles(companies, api_key, use_top_headlines=False):
    all_articles = []
    for industry, company_list in companies.items():
        for company in company_list:
            articles_by_source = fetch_articles(company, api_key, use_top_headlines=use_top_headlines)
            processed_articles = process_articles(articles_by_source, industry, company)
            all_articles.extend(processed_articles)
    return all_articles

def main():
    API_KEY = "2fbe28be9c3945c48115598ea7c2835b"
    use_top_headlines = False
    companies = {
        "Technology": ["Apple", "Microsoft", "Alphabet", "NVIDIA", "Meta"],
        "Healthcare": ["Johnson & Johnson", "Pfizer", "UnitedHealth Group", "AbbVie", "Merck & Co"],
        "Financials": ["JPMorgan Chase", "Bank of America", "Goldman Sachs Group", "Wells Fargo", "American Express Company"],
        "Energy": ["Exxon Mobil Corporation", "Chevron Corporation", "ConocoPhillips", "Schlumberger", "NextEra Energy"],
        "Consumer Discretionary": ["Tesla", "The Home Depot", "McDonald's", "Nike"]
    }
    all_articles = aggregate_articles(companies, API_KEY, use_top_headlines)
    with open("news_articles.json", "w") as outfile:
        json.dump(all_articles, outfile, indent=4)

if __name__ == "__main__":
    main()

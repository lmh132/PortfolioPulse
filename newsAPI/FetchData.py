import requests
import json
from datetime import datetime, timedelta

def fetch_articles(company, api_key, page_size=30, language='en'):
    url = "https://newsapi.org/v2/everything"
    from_date = (datetime.now() - timedelta(days=10)).strftime('%Y-%m-%d')
    to_date = datetime.now().strftime('%Y-%m-%d')
    
    params = {
        "q": f'"{company}"', 
        "searchIn": "title,description,content",
        "sortBy": "relevancy",
        "language": language,
        "from": from_date,
        "to": to_date,
        "pageSize": page_size,
        "apiKey": api_key
    }
    
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json().get("articles", [])
    else:
        print(f"Failed to fetch articles for {company}: {response.status_code}")
        return []

def process_articles(articles, industry, company):
    processed = []
    for idx, article in enumerate(articles):
        processed.append({
            "ArticleID": f"{company}_{idx+1}",
            "Source": article.get("source", {}).get("name", "Unknown"),
            "Title": article.get("title", "No Title"),
            "Author": article.get("author", "Unknown"),
            "Description": article.get("description", "No Description"),
            "URL": article.get("url", "No URL"),
            "Industry": industry,
            "Company": company,
            "TimePub": article.get("publishedAt", "No Publication Time"),
            "Summary": article.get("content", "No Content")
        })
    return processed

def aggregate_articles(companies, api_key):
    all_articles = []
    for industry, company_list in companies.items():
        for company in company_list:
            articles = fetch_articles(company, api_key)
            processed_articles = process_articles(articles, industry, company)
            all_articles.extend(processed_articles)
    return all_articles

def main():
    API_KEY = "f14adcc7737446cf9245f5d7f85aaca9"
    companies = {
        "Technology": ["Apple Inc", "Microsoft", "Google", "NVIDIA", "Meta"],
        "Healthcare": ["Johnson & Johnson", "Pfizer", "UnitedHealth Group", "AbbVie", "Merck & Co"],
        "Financials": ["JPMorgan Chase", "Bank of America", "Goldman Sachs Group", "Wells Fargo", "American Express Company"],
        "Energy": ["Exxon Mobil Corporation", "Chevron Corporation", "ConocoPhillips", "Schlumberger", "NextEra Energy"],
        "Consumer Discretionary": ["Tesla", "The Home Depot", "McDonald's", "Nike"]
    }
    all_articles = aggregate_articles(companies, API_KEY)
    with open("news_articles.json", "w") as outfile:
        json.dump(all_articles, outfile, indent=4)

if __name__ == "__main__":
    main()

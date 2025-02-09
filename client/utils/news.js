export async function getNews(companies, industries) {
  try {
    const response = await fetch(
      `https://b6afxhw1s3.execute-api.us-east-1.amazonaws.com/dev/news`,
      {
        method: "POST",
        body: JSON.stringify({
          watchlist: {
            companies,
            industries,
          },
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

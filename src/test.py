from openai import OpenAI
import google

client = OpenAI(api_key="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")

def get_response(text):
    prompt = """
    I have the following list of industries and companies:
    Tech: Apple, Google, Microsoft, NVIDIA, Meta, Amazon
    Healthcare: Johnson & Johnson, Pfizer, UnitedHealth Group, Merck & Co., AbbieVie
    Finance: JPMorgan Chase, Bank of America, Wells Fargo, American Express, Goldman Sachs
    Energy: ExxonMobil, Chevron, ConocoPhillips, Schlumberger, NextEra Energy
    Consumer Discretionary: Tesla, Home Depot, Nike, McDonald's, Disney

    I am going to give you the contents of a news article. Give me a two sentence summary of thr article, along with which industries and companies whose stocks may be affected by the news in the following format:
    {
        "summary": "",
        "industries": [],
        "companies": []
    }
    """
    completion = client.chat.completions.create(
        model="gpt-4o",
        store=False,
        messages=[
            {"role": "developer", "content": prompt},
            {"role": "user", "content": text}
        ]
    )

    return completion.choices[0].message.content

input = "nvidia has blown up over night, literally. A terrorist blew up the leading semiconductor manufacturer's largest factory last night."

print(get_response(input))
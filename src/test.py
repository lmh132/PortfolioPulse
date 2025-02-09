from openai import OpenAI
import google

# Read text from a .key file and store it in a string
file_path = "src/openai.key"  # Replace with your actual file path

file = open(file_path, "r", encoding="utf-8")
key_text = file.read()


client = OpenAI(api_key=key_text)

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
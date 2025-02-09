import boto3
import json
import zipfile
import os
import time
from decimal import Decimal
import subprocess


from openai import OpenAI
import re

def extract_json(text):
    match = re.search(r'\{.*\}', text, re.DOTALL)  # Find the first valid JSON block
    if match:
        return match.group(0)  # Extract only the JSON part
    else:
        raise ValueError("No valid JSON found in input")

client = OpenAI(api_key="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")

def get_response(text):
    prompt = """
    I have the following list of industries and companies:
    Tech: Apple, Google, Microsoft, NVIDIA, Meta, Amazon
    Healthcare: Johnson & Johnson, Pfizer, UnitedHealth Group, Merck & Co., AbbieVie
    Finance: JPMorgan Chase, Bank of America, Wells Fargo, American Express, Goldman Sachs
    Energy: ExxonMobil, Chevron, ConocoPhillips, Schlumberger, NextEra Energy
    Consumer Discretionary: Tesla, Home Depot, Nike, McDonald's, Disney

    For above, when you output in the companies list make sure you include it in ticker format: e.g. NVDA for Nvidia. 

    I am going to give you the contents of a news article. Give me a two sentence summary of the article, along with which industries and companies whose stocks may be affected by the news in the following format:
    {
        "summary": "",
        "industries": [],
        "companies": []
    }
    Make sure the output is formatted as a pure JSON, as we plan on calling json.loads() directly after.
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

def get_response2(text):
    prompt = """
    I will give you a company in question. Please convert it into the ticker format, e.g. NVDA for Nvidia, and return in the same JSON format.
    For example:
    {
        "Company": "NVDA"
    }
    Make sure the output is formatted as a pure JSON, as we plan on calling json.loads() directly after.
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

def delete_data(dynamodb):

    table = dynamodb.Table('DataLake')  # Replace with your table name

    response = table.scan()
    items = response.get('Items', [])

    for item in items:
        table.delete_item(
            Key={
                'ArticleID': item['ArticleID'],  # Replace with the actual partition key name
            }
        )


    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        items = response.get('Items', [])
        
        for item in items:
            table.delete_item(
                Key={
                    'ArticleID': item['ArticleID'],
                }
            )
            print(f"Deleted item with Partition Key: {item['ArticleID']}")
def decimal_to_float(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    elif isinstance(obj, dict):
        return {key: decimal_to_float(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [decimal_to_float(item) for item in obj]
    else:
        return obj

def main():

    lambda_client = boto3.client('lambda', region_name='us-east-1')
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

    table = dynamodb.Table('DataLake') 
    lambda_function_name = 'getNewsData'
    '''
    response = lambda_client.invoke(
        FunctionName=lambda_function_name,
        InvocationType='RequestResponse'
    )
    '''

    delete_data(dynamodb)
    # response_payload = json.loads(json.loads(response['Payload'].read())["body"])
    # articles = response_payload
    with open("Articles.json", "r") as file:
        articles = json.load(file)

    

        for article in articles:
            article['Timestamp'] = int(time.time())
            x = get_response(article["Summary"]) 
            y = get_response2(article["Company"])
            try:
                gpt_response = json.loads(extract_json(x))
                gpt_response2 = json.loads(extract_json(y))
            except Exception as e:
                print(x, e)
            article["AI Summary"] = gpt_response.get('summary')
            article["Industries"] = gpt_response.get('industries', [])
            article["Companies"] = gpt_response.get('companies', [])
            article["Company"] = gpt_response2.get("Company")
            table.put_item(Item=article)
    '''
    response = table.scan()
    for item in response['Items']:
        item = decimal_to_float(item)
        print(json.dumps(item, indent=4))  # Pretty print each item
    '''

if __name__ == "__main__":
    main()
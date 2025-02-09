import boto3
import json
import zipfile
import os
import time
from decimal import Decimal

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
    lambda_function_name = 'TestJsonFunction'

    response = lambda_client.invoke(
        FunctionName=lambda_function_name,
        InvocationType='RequestResponse'
    )

    response_payload = json.loads(json.loads(response['Payload'].read())["body"])
    articles = response_payload
    
    for article in articles:
        article['Timestamp'] = int(time.time()) 
        table.put_item(Item=article)

    response = table.scan()
    items = response['Items']

    items.sort(key=lambda x: x['Timestamp'])

    if len(items) > 20:
        items_to_delete = items[:len(items) - 20]  
        for item in items_to_delete:
            article_id = item['ArticleID']  
            table.delete_item(Key={'ArticleID': article_id}) 
            print(f"Deleted item with ArticleID: {article_id}")

    for item in response['Items']:
        item = decimal_to_float(item)
        print(json.dumps(item, indent=4))  # Pretty print each item

if __name__ == "__main__":
    main()
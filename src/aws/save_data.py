import boto3
import json
import zipfile
import os
import time
from decimal import Decimal
import subprocess


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
    lambda_function_name = 'TestJsonFunction'

    response = lambda_client.invoke(
        FunctionName=lambda_function_name,
        InvocationType='RequestResponse'
    )


    delete_data(dynamodb)

    response_payload = json.loads(json.loads(response['Payload'].read())["body"])
    articles = response_payload
    
    for article in articles:
        article['Timestamp'] = int(time.time()) 
        table.put_item(Item=article)
    '''
    response = table.scan()
    for item in response['Items']:
        item = decimal_to_float(item)
        print(json.dumps(item, indent=4))  # Pretty print each item
    '''

if __name__ == "__main__":
    main()
import boto3
import json
import zipfile
import os


def main():

    lambda_client = boto3.client('lambda', region_name='us-east-1')
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

    table = dynamodb.Table('DataLake') 
    lambda_function_name = 'TestJsonFunction'

    response = lambda_client.invoke(
        FunctionName=lambda_function_name,
        InvocationType='RequestResponse'
    )

    response_payload = json.loads(json.loads(response['Payload'].read())['body'])

    response_payload['ArticleID'] = response_payload.get('ArticleID')  

    table.put_item(Item=response_payload)

    response = table.scan()

    for item in response['Items']:
        print(json.dumps(item, indent=4))  # Pretty print each item

if __name__ == "__main__":
    main()
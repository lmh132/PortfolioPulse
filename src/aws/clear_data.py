import boto3

# Initialize the DynamoDB resource
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

# Reference your table
table = dynamodb.Table('DataLake')  # Replace with your table name

response = table.scan()
items = response.get('Items', [])

for item in items:
    table.delete_item(
        Key={
            'ArticleID': item['YourPartitionKey'],  # Replace with the actual partition key name
        }
    )

    print(f"Deleted item with Partition Key: {item['YourPartitionKey']}")

while 'LastEvaluatedKey' in response:
    response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
    items = response.get('Items', [])
    
    for item in items:
        table.delete_item(
            Key={
                'ArticleID': item['YourPartitionKey'],
            }
        )
        print(f"Deleted item with Partition Key: {item['YourPartitionKey']}")

import boto3
import json
import zipfile
import os

# Initialize AWS clients
lambda_client = boto3.client('lambda', region_name='us-east-1')
iam_client = boto3.client('iam', region_name='us-east-1')  # Ensure this line is present

# Step 1: Create an IAM Role for Lambda (if not created already)
role_name = 'LambdaExecutionRole'

try:
    # Create the IAM role with a trust policy that allows Lambda to assume it
    role = iam_client.create_role(
        RoleName=role_name,
        AssumeRolePolicyDocument=json.dumps({
            "Version": "2012-10-17",
            "Statement": [{
                "Effect": "Allow",
                "Principal": {
                    "Service": "lambda.amazonaws.com"  # Ensure this is correct for Lambda
                },
                "Action": "sts:AssumeRole"
            }]
        })
    )

    # Attach the necessary policies to the IAM role
    iam_client.attach_role_policy(
        RoleName=role_name,
        PolicyArn="arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
    )

    iam_client.attach_role_policy(
        RoleName=role_name,
        PolicyArn="arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
    )

except iam_client.exceptions.EntityAlreadyExistsException:
    print(f"Role {role_name} already exists.")
    role = iam_client.get_role(RoleName=role_name)

role_arn = role['Role']['Arn']


lambda_function_code = """
import json

article_id_counter = 1
def lambda_handler(event, context):
    global article_id_counter 

    article_id = str(article_id_counter)
    article_id_counter += 1  
    response = {
        "ArticleID" : article_id, 
        "Source" : "Bloomberg",
        "Title" : "Dummy Title", 
        "Author" : "Taein Kim", 
        "Description" : "ABC", 
        "URL" : "www.google.com",
        "Industry" : "Technology", 
        "Company" : "Google", 
        "TimePub" : "10:00"
    }
    
    return {
        'statusCode': 200,
        'body': json.dumps(response)
    }
"""

# Step 3: Create a ZIP file containing the Lambda function code
zip_file_name = '/tmp/lambda_function.zip'

with zipfile.ZipFile(zip_file_name, 'w') as zip_file:
    with open("/tmp/lambda_function.py", 'w') as file:
        file.write(lambda_function_code)
    zip_file.write('/tmp/lambda_function.py', 'lambda_function.py')

# Step 4: Create the Lambda function
lambda_function_name = 'TestJsonFunction'

try:
    response = lambda_client.create_function(
        FunctionName=lambda_function_name,
        Runtime='python3.8',
        Role=role_arn,
        Handler='lambda_function.lambda_handler',
        Code={
            'ZipFile': open(zip_file_name, 'rb').read()
        },
        Timeout=15,
    )
    print(f"Lambda function {lambda_function_name} created successfully!")
except lambda_client.exceptions.ResourceConflictException:
    print(f"Lambda function {lambda_function_name} already exists.")

# Clean up the temporary zip file
os.remove(zip_file_name)
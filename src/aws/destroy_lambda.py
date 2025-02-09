import boto3

# Initialize AWS services
lambda_client = boto3.client('lambda', region_name='us-east-1')

# Step 1: Delete the Lambda function
lambda_function_name = 'TestJsonFunction'  # The Lambda function name

try:
    lambda_client.delete_function(FunctionName=lambda_function_name)
except lambda_client.exceptions.ResourceNotFoundException:
    print(f"Lambda function {lambda_function_name} does not exist.")
import json
from alpha_vantage.timeseries import TimeSeries

def lambda_handler(event, context):
    params = event.get('queryStringParameters', {})
    ticker = list(params.get('ticker'))
    if isinstance(ticker, list):
        ticker = ticker[0]

    return {
        'statusCode': 200,
        'body': json.dumps(get_ticker_data(ticker))
    }

def get_ticker_data(sym):
    api_key = "1LA6X7ON9BMVZLYH"
    ts = TimeSeries(key=api_key, output_format='pandas')
    data, _ = ts.get_intraday(symbol='AAPL', interval = "5min", outputsize='full')
    print(data.head())

get_ticker_data("AAPL")
import requests

# NOTE: you must manually set API_KEY below using information retrieved from your IBM Cloud account (https://eu-gb.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-authentication.html?context=wx)
API_KEY = "api_key"
token_response = requests.post('https://iam.cloud.ibm.com/identity/token', data={"apikey": API_KEY, "grant_type": 'urn:ibm:params:oauth:grant-type:apikey'})
mltoken = token_response.json()["access_token"]

header = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mltoken}

payload_scoring = {
    "messages": [
        {
            "role": "system",
            "content": "You are LearnMate, an Agentic AI coach. Your purpose is to help students build personalized course roadmaps based on their interests and skills, and dynamically adjust them based on their progress. Respond as a helpful mentor."
        },
        {
            "role": "user",
            "content": "I want to get into Frontend Development. I have basic HTML and CSS skills, but no JavaScript. What should I learn first?"
        }
    ]
}

response_scoring = requests.post('https://eu-gb.ml.cloud.ibm.com/ml/v4/deployments/bbb10d7b-b104-497b-ab99-e0a1ac292a24/ai_service_stream?version=2021-05-01', json=payload_scoring,
 headers={'Authorization': 'Bearer ' + mltoken})

print("Scoring response")
try:
    print(response_scoring.json())
except ValueError:
    print(response_scoring.text)
except Exception as e:
    print(f"An unexpected error occurred: {e}")

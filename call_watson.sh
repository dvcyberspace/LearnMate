# NOTE: you must set $API_KEY below using information retrieved from your IBM Cloud account (https://eu-gb.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-authentication.html?context=wx)

export API_KEY=<api_key>

export IAM_TOKEN=$(curl --insecure -X POST --location "https://iam.cloud.ibm.com/identity/token" \
--header "Content-Type: application/x-www-form-urlencoded" \
--header "Accept: application/json" \
--data-urlencode "grant_type=urn:ibm:params:oauth:grant-type:apikey" \
--data-urlencode "apikey=$API_KEY" | jq -r '.access_token')

# TODO:  manually define and pass values to be scored below
curl --location "https://eu-gb.ml.cloud.ibm.com/ml/v4/deployments/bbb10d7b-b104-497b-ab99-e0a1ac292a24/ai_service_stream?version=2021-05-01" \
--header "Content-Type: application/json" \
--header "Accept: application/json" \
--header "Authorization: Bearer $IAM_TOKEN" \
--data "{\"messages\":[{\"role\":\"system\",\"content\":\"You are LearnMate, an Agentic AI coach. Your purpose is to help students build personalized course roadmaps based on their interests and skills, and dynamically adjust them based on their progress. Respond as a helpful mentor.\"},{\"role\":\"user\",\"content\":\"I want to get into Frontend Development. I have basic HTML and CSS skills, but no JavaScript. What should I learn first?\"}]}"


curl --location "https://eu-gb.ml.cloud.ibm.com/ml/v4/deployments/bbb10d7b-b104-497b-ab99-e0a1ac292a24/ai_service_stream?version=2021-05-01" \
--header "Content-Type: application/json" \
--header "Accept: application/json" \
--header "Authorization: Bearer $IAM_TOKEN" \
--data "`{"messages":[{"content":"","role":""}]}`"

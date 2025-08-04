import sttp.client4.quick.*
import scala.util.{Success, Failure}
import java.util.Base64
import java.nio.charset.StandardCharsets
import play.api.libs.json._

@main def main() = {
	// NOTE: you must manually set API_KEY below using information retrieved from your IBM Cloud account (https://eu-gb.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-authentication.html?context=wx)

	val API_KEY = "api_key"

	// Get IAM service token
	val iam_url = uri"https://iam.cloud.ibm.com/identity/token?grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=$API_KEY"
	val iam_response = quickRequest.post(iam_url).header("Content-Type", "application/x-www-form-urlencoded").header("Accept",
		"application/json").send()
	val iamtoken_json: JsValue = Json.parse(iam_response.body)

	val iamtoken = (iamtoken_json \ "access_token").asOpt[String] match {
		case Some(x) => x
		case None => ""
	}

	// TODO:  manually define and pass list of values to be scored
	val payload_scoring: JsValue = Json.parse(
		"""{
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
		}"""
	)

	val scoring_url = uri"https://eu-gb.ml.cloud.ibm.com/ml/v4/deployments/bbb10d7b-b104-497b-ab99-e0a1ac292a24/ai_service_stream?version=2021-05-01"

	val response_scoring = quickRequest.post(scoring_url).body(payload_scoring).header("Content-Type",
		"application/json").header("Authorization", "Bearer " + iamtoken).send()
	println("scoring response")
	println(response_scoring.body)
}

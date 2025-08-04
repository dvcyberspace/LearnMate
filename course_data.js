const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// NOTE: you must manually enter your API_KEY below using information retrieved from your IBM Cloud account (https://eu-gb.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-authentication.html?context=wx)
const API_KEY = "api_key";

const req = new XMLHttpRequest();
const oReq = new XMLHttpRequest();

function getToken(errorCallback, loadCallback) {
	req.addEventListener("load", loadCallback);
	req.addEventListener("error", errorCallback);
	req.open("POST", "https://iam.cloud.ibm.com/identity/token");
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.setRequestHeader("Accept", "application/json");
	req.send("grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=" + API_KEY);
}

function apiPost(scoring_url, token, payload, loadCallback, errorCallback) {
	oReq.addEventListener("load", loadCallback);
	oReq.addEventListener("error", errorCallback);
	oReq.open("POST", scoring_url);
	oReq.setRequestHeader("Accept", "application/json");
	oReq.setRequestHeader("Authorization", "Bearer " + token);
	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	oReq.send(payload);
}

getToken((err) => console.log("An error occurred submitting the request."), () => {
	let tokenResponse;
	try {
		tokenResponse = JSON.parse(req.responseText);
	} catch(ex) {
		console.log("An error occurred parsing the token response.");
		return;
	}
	// NOTE:  manually define and pass the array(s) of values to be scored in the next line
	const payload = JSON.stringify({
	    messages: [
	        {
	            role: "system",
	            content: "You are LearnMate, an Agentic AI coach. Your purpose is to help students build personalized course roadmaps based on their interests and skills, and dynamically adjust them based on their progress. Respond as a helpful mentor."
	        },
	        {
	            role: "user",
	            content: "I want to get into Frontend Development. I have basic HTML and CSS skills, but no JavaScript. What should I learn first?"
	        }
	    ]
	});

	const scoring_url = "https://eu-gb.ml.cloud.ibm.com/ml/v4/deployments/bbb10d7b-b104-497b-ab99-e0a1ac292a24/ai_service_stream?version=2021-05-01";
	apiPost(scoring_url, tokenResponse.access_token, payload, function (resp) {
		let parsedPostResponse;
		try {
			parsedPostResponse = JSON.parse(oReq.responseText);
		} catch (ex) {
			console.log("An error occurred parsing the scoring response.");
			return;
		}
		console.log("Scoring response");
		console.log(JSON.stringify(parsedPostResponse, null, "  "));
	}, function (error) {
		console.log(error);
	});
});

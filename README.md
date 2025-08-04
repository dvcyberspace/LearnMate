# LearnMate: Agentic AI for Personalized Course Pathways
Project Description <br> LearnMate is an Agentic AI coach designed to help students navigate the complex world of online education. By interacting with students, understanding their unique interests and skill levels, and leveraging the power of IBM watsonx.ai, LearnMate dynamically creates and adapts personalized course roadmaps. This project aims to provide the personalized guidance that students need to align their learning with their long-term career goals.

# The Challenge
Students often struggle to identify the right learning path that aligns with their interests and long-term goals due to the overwhelming number of online courses and a lack of personalized guidance.

# The Solution
LearnMate acts as an Agentic AI coach that:<br>
Interacts with Students: It engages in a conversational manner to understand the student's background and aspirations.<br>
Understands Interests & Skills: It identifies areas of interest such as Frontend Development, Cybersecurity, or UI/UX Design, and assesses the student's current skill level. <br>
Dynamically Builds Roadmaps: It constructs a personalized course roadmap on the fly, suggesting a logical sequence of courses and topics.<br>
Adapts Over Time: The roadmap is not static; it can be adjusted based on the student's progress, changing preferences, or new learning opportunities.

# Technology Stack
Platform: IBM Cloud<br>
AI Service: watsonx.ai Studio<br>
Framework: LangGraph<br>
Architecture: ReAct<br>
Authentication: IBM Cloud Identity and Access Management (IAM)<br>
Code Languages: Python, Java, JavaScript, Scala, cURL <br>

# Architecture
The project's architecture consists of a client-side application that communicates with a deployed model on IBM watsonx.ai.<br>
Authentication: The client-side code uses an IBM Cloud API key to obtain a temporary IAM access token.<br>
Request: The client sends an HTTP request to the watsonx.ai deployment endpoint. This request includes the IAM access token in the Authorization header and a JSON payload.<br>
Payload: The JSON payload contains the conversational history, including a system prompt that defines the agent's role (the "Agentic AI coach") and a user prompt with the student's query.<br>
Processing: The watsonx.ai deployment uses the IBM Granite foundation model to process the prompt and generate a helpful, multi-step response.<br>
Response: The client receives the personalized course roadmap or guidance from the watsonx.ai endpoint.<br>

# IBM Certifications
IBM Jourey to cloud<br>
IBM Getting started With AI<br>
IBM Lab: Retrieval Augmented Generation with LangChain<br>
 
# Author
Dhruvika Verma

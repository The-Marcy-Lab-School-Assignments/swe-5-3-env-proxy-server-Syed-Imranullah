# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use the exact terms and concepts from the lesson.

Your responses will each be evaluated out of 6 points. You can earn 3 points for writing quality and 3 points for the accuracy and precision of the technical content per question.

---

## Question 1:

Why is it unsafe to make requests to a third-party API (like Giphy) directly from frontend JavaScript code? What specific risk does this create, and how can a malicious user exploit it?

**Your answer here**:

It’s unsafe to make requests to a third-party API like Giphy directly from frontend JavaScript because the API key is exposed in the client-side code. Anyone who inspects the network requests or the code can see the key. A user could copy the key and make unauthorized requests, potentially exceeding rate limits or using the key in ways the API provider might block or charge. This creates a security risk because API keys are meant to be secret credentials, not public information.

## Question 2:

What is the proxy server strategy? How does it help avoid exposing API Keys in client-side code while still providing access to APIs that require keys?

**Your answer here**:

The proxy server strategy involves sending requests to the third-party API through a backend server instead of directly from the frontend. The frontend makes a request to the proxy server, which then attaches the API key and forwards the request to the external API. This keeps the API key hidden from the client and prevents users from seeing or misusing it. It also allows the backend to handle errors or add additional security checks before sending data back to the frontend.

## Question 3:

What is an environment variable, and why do we store API keys in a .env file instead of directly in source code? What role does .gitignore play in this setup, and what could go wrong if the .env file were accidentally committed to GitHub?

**Your answer here**:

An environment variable is a way to store sensitive information, like API keys, outside of the source code. We put API keys in a .env file so the keys aren’t hard-coded and visible to anyone who views the code. The .gitignore file tells Git not to track .env, preventing it from being committed to GitHub. If the .env file were accidentally committed, anyone could see the API keys, which could lead to unauthorized access, security breaches, or exceeding API usage limits.
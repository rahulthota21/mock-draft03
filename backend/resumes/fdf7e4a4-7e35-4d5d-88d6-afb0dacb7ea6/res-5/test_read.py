import openai
client = openai.OpenAI(api_key="ygsk_xS9XaDAYO4mtqllgnfBtWGdyb3FYspuBvYYsuaLXywveoqBLfyLGour_key", base_url="https://api.groq.com/openai/v1")
res = client.models.list()
print(res)

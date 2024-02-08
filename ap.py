from flask import Flask, request
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline, MarianMTModel, MarianTokenizer
import pyttsx3

app = Flask(__name__)

# Initialize Hugging Face summarization pipeline
summarizer = pipeline('summarization')

# Initialize Hugging Face translation pipeline for Hindi
translation_model_name = "Helsinki-NLP/opus-mt-en-hi"
translator = pipeline("translation", model=translation_model_name)

# Initialize text-to-speech engine
engine = pyttsx3.init()

@app.route('/summary', methods=['GET'])
def summary():
    url = request.args.get('url', '')
    video_id = url.split('=')[1]

    # Get the transcript using YouTubeTranscriptApi
    transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
    transcript = ' '.join([d['text'] for d in transcript_list])

    # Perform summarization using Hugging Face summarization pipeline
    summary = ''
    for i in range(0, (len(transcript) // 1000) + 1):
        summary_text = summarizer(transcript[i * 1000:(i + 1) * 1000])[0]['summary_text']
        summary += summary_text + ' '

    return summary, 200

@app.route('/translate', methods=['POST'])
def translate():
    text = request.form['text']
    translated_text = translator(text, max_length=500)[0]['translation_text']
    return translated_text, 200

@app.route('/listen', methods=['POST'])
def listen():
    text = request.form['text']
    engine.say(text)
    engine.runAndWait()
    return 'Voice generated', 200

if __name__ == '__main__':
   app.run(debug=True,port=9989,use_reloader=False)

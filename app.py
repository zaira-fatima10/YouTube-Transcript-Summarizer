

from flask import Flask, request, send_file
from flask_cors import CORS
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline, MarianMTModel, MarianTokenizer
from gtts import gTTS
import os

app = Flask(__name__)
CORS(app)

# Initialize Hugging Face summarization pipeline with PEGASUS
summarizer = pipeline('summarization', model='facebook/bart-large-xsum', tokenizer='facebook/bart-large-xsum')

# Initialize Hugging Face translation pipeline for Hindi
translation_model_name = "Helsinki-NLP/opus-mt-en-hi"
translator = pipeline("translation", model=translation_model_name)

# Initialize Hugging Face translation pipeline for Gujarati
translation_guj_model_name = "rooftopcoder/mT5_base_English_Gujrati"
translator_guj = pipeline("translation", model=translation_guj_model_name)

# Initialize Hugging Face translation pipeline for Urdu
translation_urdu_model_name = "HaiderSultanArc/t5-small-english-to-urdu"
translator_urdu = pipeline("translation", model=translation_urdu_model_name)

# Initialize text-to-speech engine

# Define route for summarization
@app.route('/summary', methods=['GET'])
def summary():
    url = request.args.get('url', '')
    video_id = url.split('=')[1]

    # Get the transcript using YouTubeTranscriptApi
    transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
    transcript = ' '.join([d['text'] for d in transcript_list])

    # Perform summarization using Hugging Face PEGASUS pipeline
    summary = summarizer(transcript, max_length=150, min_length=50, length_penalty=2.0, num_beams=4, early_stopping=True)[0]['summary_text']

    return summary, 200

# Define route for translation to Hindi
@app.route('/translate', methods=['POST'])
def translate():
    text = request.form['text']
    translated_text = translator(text, max_length=500)[0]['translation_text']
    return translated_text, 200

# Define route for translation to Gujarati
@app.route('/translate_guj', methods=['POST'])
def translate_guj():
    text = request.form['text']
    translated_text_guj = translator_guj(text, max_length=500)[0]['translation_text']
    return translated_text_guj, 200

# Define route for translation to Urdu
@app.route('/translate_urdu', methods=['POST'])
def translate_urdu():
    text = request.form['text']
    translated_text_urdu = translator_urdu(text, max_length=500)[0]['translation_text']
    return translated_text_urdu, 200

# Define route for text-to-speech (listen)
@app.route('/listen', methods=['POST'])
def listen():
    text = request.form['text']
    
    # Using gTTS to generate speech
    tts = gTTS(text=text, lang='en')
    
    # Save the speech as an audio file
    audio_file_path = 'audio.mp3'
    tts.save(audio_file_path)
    
    # Play the audio file
    os.system(f"start {audio_file_path}")  # This works on Windows
    
    return 'Voice generated', 200

# Define route for downloading transcript
@app.route('/download', methods=['POST'])
def download():
    text = request.form['text']
    
    # Save the transcript as a text file
    transcript_file_path = 'transcript.txt'
    with open(transcript_file_path, 'w') as file:
        file.write(text)
    
    return send_file(transcript_file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=9989)



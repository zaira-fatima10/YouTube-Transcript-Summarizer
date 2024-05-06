
YouTube Transcript Summariser
YouTube Transcript Summariser is a web application built using Flask and Hugging Face Transformers that allows users to summarize YouTube videos based on their transcripts. It also provides translation features to Hindi, Gujarati, and Urdu, as well as text-to-speech capabilities.

Features
•	Summarize YouTube videos based on their transcripts using Hugging Face Transformers.
•	Translate summarized content to Hindi, Gujarati, and Urdu using pre-trained translation models.
•	Generate speech from summarized content using the gTTS library.
•	Download the summarized transcript in text format.

Installation
1.Clone the repository:
 
 git clone git clone https://github.com/zaira-fatima10/YouTube-Transcript-Summarizer
 

2.Install the required Python packages:
 pip install -r requirements.txt


Usage
1.	Run the Flask application: python app.py
2.	Open a web browser and go to http://127.0.0.1:9989/.
3.	Enter a valid YouTube video URL and click the "Summarise" button to generate a summary.
4.	Use the translation buttons to translate the summary to Hindi, Gujarati, or Urdu.
5.	Click the "Listen" button to generate speech from the summary.
6.	Click the "Download Transcript" button to download the summarized transcript in text format.

Contributing
Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.


Acknowledgements
•	Flask
•	Hugging Face Transformers
•	YouTube Transcript API
•	gTTS



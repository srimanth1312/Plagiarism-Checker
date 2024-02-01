from numpy import vectorize 
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask,request,jsonify
from flask_cors import CORS
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from translate import Translator 
from langdetect import detect


app=Flask(__name__) 
cors = CORS(app)

# nltk.download('stopwords')
# nltk.download('wordnet')


def removeStopWords(text):
    lang=detect(text)
    translator= Translator(from_lang=lang,to_lang="en") 
    text = translator.translate(text)
    cachedStopWords = stopwords.words("english")
    text = ' '.join([word for word in text.split() if word not in cachedStopWords])
    return text

def stemmingWords(text):
    ps = PorterStemmer()
    text = ' '.join([ps.stem(word) for word in text.split()])
    print(text)   
    return text

def vectorize(t):
    return TfidfVectorizer().fit_transform(t).toarray()
     
def similarity(d1,d2):
    return cosine_similarity([d1,d2])

def check_plagiarism(t1,t2):
    t1,t2=removeStopWords(t1),removeStopWords(t2)  # removing stopwords
    if t1=="" or t2=="":
        return 0
    t1,t2=stemmingWords(t1),stemmingWords(t2)      # Stemming
    vectors = vectorize([t1,t2])                   # Vectorization
    score = similarity(vectors[0],vectors[1])      # Similarity Score
    return score[0][1]

@app.route("/",methods=["GET","POST"])
def home():
    if request.method == "POST":
        jsonData = request.get_json()
        return jsonify(check_plagiarism(jsonData['t1'],jsonData['t2']))

if(__name__=="__main__"):
    app.run(debug=True)
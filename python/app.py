from flask import Flask, request, send_file
from flask_cors import CORS  # To handle CORS
import requests
from bs4 import BeautifulSoup
import pandas as pd
import re
import os

app = Flask(__name__)

# CORS configuration to allow requests from the React app (localhost:3000)
CORS(app, origins=["http://localhost:3000"])  # Allow React app's frontend requests

# Your ScraperAPI key
api_key = 'f4cd663744c6f7fe0dc07d891bc15497'  # Replace with your actual API key

def fetch_data_with_scraperapi(search_query):
    target_url = f'https://www.google.com/search?q={search_query.replace(" ", "+")}'
    payload = {'api_key': api_key, 'url': target_url}
    response = requests.get('https://api.scraperapi.com/', params=payload)
    
    if response.status_code == 200:
        return response.text  # Return the HTML content of the page
    else:
        print(f"Failed to fetch the page. Status code: {response.status_code}")
        return None

def extract_phone_number(text):
    phone_pattern = re.compile(r'(\+?\d{1,4}?[\s-]?\(?\d{1,4}?\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9})')
    phone_numbers = phone_pattern.findall(text)
    return phone_numbers[0] if phone_numbers else "Phone number not found"

def scrape_website_for_phone(url):
    try:
        website_response = requests.get(url)
        if website_response.status_code == 200:
            website_soup = BeautifulSoup(website_response.text, 'html.parser')
            phone_number = extract_phone_number(website_soup.text)
            return phone_number
        else:
            return "Phone number not found"
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return "Phone number not found"

def parse_html(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    leads = []

    for result in soup.find_all(class_='tF2Cxc'):
        title = result.find('h3').text if result.find('h3') else None
        link = result.find('a')['href'] if result.find('a') else None
        description = result.find(class_='VwiC3b').text if result.find(class_='VwiC3b') else None
        phone_number = scrape_website_for_phone(link) if link else "Phone number not found"

        if title and link:
            leads.append({
                'Business Name': title,
                'Link': link,
                'Description': description,
                'Phone Number': phone_number
            })

    return leads

def save_to_csv(leads, filename):
    directory = os.path.dirname(filename)
    if not os.path.exists(directory):
        os.makedirs(directory)  # Create the directory if it doesn't exist
    if leads:
        df = pd.DataFrame(leads)
        df.to_csv(filename, index=False)
        print(f"Leads saved to {filename}")
    else:
        print("No leads found to save.")

@app.route('/')
def home():
    return "Business Leads Scraper API"

@app.route('/scrape', methods=['POST'])
def scrape():
    search_query = request.json['search_query']  # Use request.json to parse the JSON body
    csv_filename = os.path.join(os.getcwd(), 'backend', 'business_leads.csv')  # Filename for the CSV

    # Fetch HTML content using ScraperAPI
    html_content = fetch_data_with_scraperapi(search_query)

    if html_content:
        leads = parse_html(html_content)
        if leads:
            save_to_csv(leads, csv_filename)
            return send_file(csv_filename, as_attachment=True)
        else:
            return "No leads found."
    else:
        return "Failed to retrieve content from the target URL."

if __name__ == "__main__":
    app.run(debug=True, port=5000)

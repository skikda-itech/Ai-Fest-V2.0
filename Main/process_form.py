import qrcode
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
import smtplib
from email import encoders
from email.mime.base import MIMEBase

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/process_form', methods=['POST'])
def process_form():
    # Retrieve form data
    name = request.form['name']
    email = request.form['email']
    
    # Generate QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(f"Name: {name}\nEmail: {email}")
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="black", back_color="white")
    qr_img_path = 'qrcode.png'
    qr_img.save(qr_img_path)
    
    # Email sending
    msg = MIMEMultipart()
    msg['From'] = 'skikdaitechclub@gmail.com' # Replace with your email
    msg['To'] = email
    msg['Subject'] = 'Your QR Code'

    # Attach QR code image to the email
    with open(qr_img_path, 'rb') as f:
        attachment = MIMEImage(f.read())
        attachment.add_header('Content-Disposition', 'attachment', filename='qrcode.png')
        msg.attach(attachment)
    
    # SMTP configuration
    server = smtplib.SMTP('smtp.gmail.com', 587) # Use appropriate SMTP server and port
    server.starttls()
    server.login('skikdaitechclub@gmail.com', 'skikda_i-tech_club_2023-_2024') # Replace with your email and password
    server.send_message(msg)
    server.quit()
    
    # Return response
    return jsonify({'message': 'Email sent with QR code'})

if __name__ == '__main__':
    app.run(debug=True)

import smtplib,ssl
from email.message import EmailMessage
from email.utils import formataddr


PORT = 587
EMAIL_SERVER = 'smtp.gmail.com'

context = ssl.create_default_context()
# PORT =465
# EMAIL_SERVER ='mail.spacemonkeys.club'

sender_email = "SENDER@gmail.com"
password = "PASSWORD"

# sender_email = "hedwigmailshot@spacemonkeys.club"
# password = "PASS"

#Getting Email Headders
def send_mail(subject,reciver_email):
    msg = EmailMessage()
    msg["subject"]=subject
    msg["From"]= formataddr(("TN_GOV",f"{sender_email}"))
    msg["To"]=", ".join(reciver_email)
    msg["bcc"]= sender_email
    
    msg.set_content(f"""\
        Testing............. """)
    with smtplib.SMTP(EMAIL_SERVER,PORT) as server:
        try :
            server.connect(EMAIL_SERVER,PORT)
            server.ehlo()
            server.starttls(context=context) #secure connection
            server.login(sender_email,password)
            server.sendmail(sender_email,reciver_email,msg.as_string())
        
        except Exception as e:
            print(e)
        
        finally:
            server.quit()


if __name__ == "__main__":
    send_mail(
        subject="Test",
        reciver_email=['test1@gmail.com','test2@gmail.com']
        
    )        

from .models import Campaign, Recipients, User, MailTemplate
from .serializers import CampaignSerializer
def send_mail(id):
    campaign = Campaign.objects.filter(id=id)
    serializer = CampaignSerializer(data=campaign)
    serializer.is_valid()
    user = User.objects.filter(id=campaign[0].user_id)
    permission = user[0].permission
    template = campaign[0].template_id
    mail = MailTemplate.objects.filter(id=template)
    location = user[0].name
    subject = mail[0].subject
    content = mail[0].content
    if(permission == 'district'):
        recipients = Recipients.objects.filter(district=location)
    elif(permission == 'taluk'):
        recipients = Recipients.objects.filter(taluk=location)
    else:
        recipients = Recipients.objects.filter(state=location)
    
    names = []
    emails = []
    for recipient in recipients:
        names.append(recipient.name)
        emails.append(recipient.email)

    print(names)
    print(emails)
    for i in range(len(names)):
            name = names[i]
            subjt = subject
            message = content
            message = message.replace("{%name%}",name)
            subjt = subject.replace("{%name%}",name)
            reciever = emails[i]
            print(f'echo -e "Subject:{subjt} \n\n {message}\n" | sendmail {reciever}')
# Generated by Django 4.1.7 on 2023-03-26 16:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_campaign_campaignattachment_mailtemplate_recipients_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaign',
            name='total_mail',
            field=models.IntegerField(default=0),
        ),
    ]

# Generated by Django 3.0.1 on 2019-12-31 01:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_remove_accountinfo_nickname'),
    ]

    operations = [
        migrations.AddField(
            model_name='accountinfo',
            name='avatar',
            field=models.CharField(default='1.png', max_length=255),
        ),
        migrations.AddField(
            model_name='accountinfo',
            name='coin',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='accountinfo',
            name='level',
            field=models.IntegerField(default=1),
        ),
    ]

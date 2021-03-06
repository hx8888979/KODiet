# Generated by Django 3.0.1 on 2020-01-06 05:51

from django.db import migrations, models
import home.storage
import home.validators


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0009_auto_20200106_0544'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accountinfo',
            name='avatar',
            field=models.ImageField(default='default/23.png', storage=home.storage.OverwriteStorage(), upload_to='avatar/', validators=[home.validators.validate_image, home.validators.validate_image_size]),
        ),
    ]

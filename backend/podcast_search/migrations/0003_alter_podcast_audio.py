# Generated by Django 5.1.6 on 2025-03-21 14:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('podcast_search', '0002_podcast_thumbnail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='podcast',
            name='audio',
            field=models.FileField(blank=True, null=True, upload_to='audios/'),
        ),
    ]

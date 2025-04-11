# Generated by Django 5.1.6 on 2025-04-09 13:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('podcast_search', '0010_rename_episodenumber_podcast_episode_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='podcast',
            name='description',
            field=models.TextField(default='No description available.'),
        ),
        migrations.AlterField(
            model_name='podcast',
            name='transcript',
            field=models.TextField(default='No transcript available.'),
        ),
    ]

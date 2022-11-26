# Generated by Django 4.1.3 on 2022-11-19 08:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bridgeUS', '0019_merge_20221119_0806'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='image_url',
        ),
        migrations.RemoveField(
            model_name='shopitem',
            name='image_url',
        ),
        migrations.AddField(
            model_name='shopitem',
            name='image',
            field=models.ImageField(null=True, upload_to='images/'),
        ),
    ]

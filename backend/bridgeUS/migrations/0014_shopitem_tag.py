# Generated by Django 4.1.3 on 2022-11-19 02:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bridgeUS', '0013_userorder_color_userorder_ordered_amount_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='shopitem',
            name='tag',
            field=models.TextField(null=True),
        ),
    ]
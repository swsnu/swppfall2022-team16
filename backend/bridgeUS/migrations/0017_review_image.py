# Generated by Django 4.1.3 on 2022-11-19 07:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bridgeUS", "0016_alter_usershop_purchased_item"),
    ]

    operations = [
        migrations.AddField(
            model_name="review",
            name="image",
            field=models.ImageField(null=True, upload_to=""),
        ),
    ]

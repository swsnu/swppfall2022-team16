from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    height = models.IntegerField()
    weight = models.IntegerField()

    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

class UserShop(models.Model):
    user = models.ForeignKey(
        CustomUser,   
        on_delete = models.CASCADE,
    )

    favorite_clothes = models.TextField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

class ShopItem(models.Model):
    seller = models.ForeignKey(
        CustomUser,   
        on_delete = models.CASCADE,
    )   
    
    price = models.FloatField()
    rating = models.FloatField()
    star = models.TextField()
    type = models.TextField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

class ShopItemDetail(models.Model):
    mainItem = models.ForeignKey(
        CustomUser,   
        on_delete = models.CASCADE,
    )   
    
    color = models.TextField()
    size = models.TextField()
    left_amount = models.TextField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

class Review(models.Model):
    title = models.CharField(max_length=64)
    
    content = models.TextField()

    author = models.ForeignKey(
        CustomUser,   
        on_delete = models.CASCADE,
    )
    
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

class Comment(models.Model):
    review = models.ForeignKey(
        Review,   
        on_delete = models.CASCADE,
    )

    content = models.TextField()

    author = models.ForeignKey(
        CustomUser,   
        on_delete = models.CASCADE,
    )

    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
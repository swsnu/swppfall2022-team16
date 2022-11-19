from django.db import models
from django.contrib.auth.models import AbstractUser
from taggit.managers import TaggableManager

class CustomUser(AbstractUser):
    nickname = models.TextField(null=True)
    height = models.IntegerField(null=True)
    weight = models.IntegerField(null=True)
    gender = models.TextField(null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class UserShop(models.Model):
    user = models.ForeignKey(
        CustomUser,   
        on_delete = models.CASCADE,
    )

    credit = models.FloatField(null=True)
    cart = models.JSONField(null=True)
    purchased_item = models.JSONField(null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class ShopItem(models.Model):
    seller = models.ForeignKey(
        CustomUser,   
        on_delete = models.CASCADE,
    )   
    
    name = models.TextField(null=True)
    image = models.ImageField(upload_to='images/', null=True)
    price = models.FloatField(null=True)
    rating = models.FloatField(null=True)
    type = models.TextField(null=True)
    tags = TaggableManager()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class ShopItemDetail(models.Model):
    main_item = models.ForeignKey(
        ShopItem,   
        on_delete = models.CASCADE,
    )   
    
    color = models.TextField(null=True)
    size = models.TextField(null=True)
    left_amount = models.IntegerField(null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class UserOrder(models.Model):
    user = models.ForeignKey(
        CustomUser,
        on_delete = models.CASCADE,
    )

    ordered_item = models.ForeignKey(
        ShopItem,
        on_delete = models.CASCADE,
    )    

    color = models.TextField(null=True)
    size = models.TextField(null=True)

    fast_shipping = models.BooleanField(default=False)

    ordered_amount = models.IntegerField(null=True)

    order_status = models.IntegerField(null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Review(models.Model):
    title = models.CharField(null=True, max_length=64)

    content = models.TextField(null=True)

    author = models.ForeignKey(
        CustomUser,   
        on_delete = models.CASCADE,
    )

    review_item = models.ForeignKey(
        ShopItem,
        on_delete = models.CASCADE,
        null=True
    )

    image = models.ImageField(upload_to='images/', null=True)

    rating = models.IntegerField(null=True)
    likes = models.IntegerField(null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Comment(models.Model):
    """Comment class"""

    review = models.ForeignKey(
        Review,
        on_delete = models.CASCADE,
    )

    content = models.TextField(null=True)

    author = models.ForeignKey(
        CustomUser, on_delete = models.CASCADE,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

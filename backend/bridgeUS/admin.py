from django.contrib import admin

from bridgeUS.models import Review, Comment, CustomUser, ShopItem, ShopItemDetail, UserShop

# Register your models here.
admin.site.register(Review)
admin.site.register(Comment)
admin.site.register(CustomUser)
admin.site.register(ShopItem)
admin.site.register(ShopItemDetail)
admin.site.register(UserShop)
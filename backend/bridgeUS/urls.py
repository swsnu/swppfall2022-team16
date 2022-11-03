from django.urls import path
from bridgeUS import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('token/', views.token, name='token'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('usershop/<int:user_id>', views.usershop, name='usershop'),
    path('shopitem/', views.shopitemlist, name='shopitemlist'),
    path('shopitem/<int:item_id>/', views.shopitem, name='shopitem'),
    path('shopitem/<int:item_id>/shopitemdetail/', views.shopitemdetail, name='shopitem_detail'),
    path('review/', views.reviewlist, name='reviewlist'),
    path('review/<int:review_id>/', views.review, name='review'),
    path('review/<int:review_id>/comment/', views.reviewcomment, name='reviewcomment'),
    path('comment/<int:comment_id>/', views.comment, name='comment')
]

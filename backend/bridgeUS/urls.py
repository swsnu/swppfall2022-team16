from django.urls import path
from bridgeUS import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('token/', views.token, name='token'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('user/', views.userlist, name='userlist'),
    path('usershop/<int:user_id>/', views.usershop, name='usershop'),
    path('shopitem/', views.shopitemlist, name='shopitemlist'),
    path('shopitem/<int:item_id>/', views.shopitem, name='shopitem'),
    path('shopitem/<int:item_id>/shopitemdetail/', views.shopitemdetail_list, name='shopitem_detail_list'),
    path('shopitemdetail/<int:detail_id>/', views.shopitemdetail, name='shopitemdetail'),
    path('userorder/', views.userorderlist, name='userorderlist'),
    path('review/', views.reviewlist, name='reviewlist'),
    path('review/<int:review_id>/', views.review, name='review'),
    path('review/<int:review_id>/comment/', views.reviewcomment, name='reviewcomment'),
    path('comment/<int:comment_id>/', views.comment, name='comment'),
    path('purchase/', views.purchase, name='purchase'),
    path('search/', views.search, name='search'),
    path('recommend/<int:recommend_count>/', views.recommend_clothes, name='recommend'),
    path('usercomments/', views.usercomments, name='usercomments'),
    path('trendingposts/<int:post_count>/', views.trendingposts, name='trendingposts'),
    path('addlikes/<int:post_id>/', views.addlikes, name='addlikes')
]

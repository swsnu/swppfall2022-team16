from django.urls import path
from bridgeUS import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('token/', views.token, name='token'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('article/', views.article, name='article'),
    path('article/<int:article_id>/', views.article_detail, name='article_detail'),
    path('article/<int:article_id>/comment/', views.article_comments, name='article_comments'),
    path('comment/<int:comment_id>/', views.comment, name='comment'),
]

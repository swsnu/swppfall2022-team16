from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import  CustomUser, UserShop, ShopItem, ShopItemDetail, UserOrder, Review, Comment
from PIL import Image

import json


class BlogTestCase(TestCase):
    def test_csrf(self):
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        client = Client(enforce_csrf_checks=True)
        
        response = client.post('/api/signup/', json.dumps({'username': 'chris', 'password': 'chris', 'nickname': 'test'}),
                               content_type='application/json')

        self.assertEqual(response.status_code, 403)  # Request without csrf token returns 403 response

        response = client.get('/api/token/')

        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        # test empty user list

        response = client.get('/api/user/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 204)       

        # data init
        new_user = CustomUser(username='swpp', password='iluvswpp', nickname='user1')

        new_user.save()

        new_user2 = CustomUser(username='swpp2', password='iluvswpp2', nickname='user2')

        new_user2.save()

        response = client.post('/api/signup/', json.dumps({'username': 'chris', 'password': 'chris', 'nickname': 'test'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection

        response = client.post('/api/signup/', json.dumps({'username': 'chris2', 'password': 'chris2', 'nickname' : 'test2'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
    # test token, signup
        response = client.get('/api/token/')

        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/api/token/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        
        response = client.get('/api/signup/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    # test signin
        response = client.get('/api/signin/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        response = client.post('/api/signin/', json.dumps({'username': 'not_chris', 'password': 'not_chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)

    # test signout
        response = client.get('/api/token/')

        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.delete('/api/signout/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/signout/', {'username': 'chris2', 'password': 'chris2'},
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/signout/', {'username': 'chris2', 'password': 'chris2'},
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

    # test when signed out    
        response = client.get('/api/signout/', {'username': 'chris2', 'password': 'chris2'},
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value 

        response = client.get('/api/usershop/3/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/shopitem/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        
        self.assertEqual(response.status_code, 401)

        response = client.put('/api/shopitem/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 401)

        response = client.post('/api/shopitem/1/shopitemdetail/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 401)

        response = client.get('/api/shopitemdetail/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 401)

        response = client.get('/api/userorder/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 401)

        response = client.post('/api/review/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 401)

        response = client.put('/api/review/1/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 401)

        response = client.post('/api/review/1/comment/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 401)
                
        response = client.put('/api/comment/1/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 401)

    # test empty data
        response = client.post('/api/signin/', json.dumps({'username': 'chris', 'password': 'chris'}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/review/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 204)

        response = client.get('/api/shopitem/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 204)
    # add data
        new_shopitem1 = ShopItem(seller=new_user, name='item1')
        new_shopitem1.save()

        new_shopitem2 = ShopItem(seller=new_user, name='item2')
        new_shopitem2.save()
        
        new_shopitem3 = ShopItem(seller=new_user2, name='itme3')
        new_shopitem3.save()

        new_review = Review(title='I Love SWPP!',review_item=new_shopitem1 ,content='Believe it or not', author=new_user, rating=3)
        new_review.save()
        
        new_review2 = Review(title='I Love SWPP!2',review_item=new_shopitem2, content='Believe it or not2', author=new_user2, rating=1)
        new_review2.save()
        
        new_review3 = Review(title='I Love SWPP!3',review_item=new_shopitem3, content='Believe it or not3', author=new_user, rating=4)
        new_review3.save()

        new_review4 = Review(title='I Love SWPP!4',review_item=new_shopitem1, content='Believe it or not3', author=new_user, rating=2)
        new_review4.save()

        new_review5 = Review(title='I Love SWPP!5',review_item=new_shopitem2, content='Believe it or not3', author=new_user, rating=5)
        new_review5.save()

        new_review6 = Review(title='I Love SWPP!6',review_item=new_shopitem3, content='Believe it or not3', author=new_user, rating=3)
        new_review6.save()

        new_userorder = UserOrder()
        response = client.get('/api/review/1/comment/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 204)

        response = client.get('/api/shopitem/1/shopitemdetail/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 204)       

        new_comment = Comment(review=new_review, content='Comment!', author=new_user)
        new_comment.save()
        
        new_comment2 = Comment(review=new_review2, content='Comment!2', author=new_user2)
        new_comment2.save()

        new_shopitemdetail1 = ShopItemDetail(main_item=new_shopitem1)
        new_shopitemdetail1.save()

        new_shopitemdetail2 = ShopItemDetail(main_item=new_shopitem2)
        new_shopitemdetail2.save()

    # test recommend
        response = client.get('/api/recommend/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

    # test not author
        response = client.post('/api/signin/', json.dumps({'username': 'chris', 'password': 'chris'}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value 

        response = client.put('/api/review/1/', json.dumps({'title' : "test", 'content' : "test"}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 403)

        response = client.put('/api/comment/1/', json.dumps({'title' : "test", 'content' : "test"}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 403)
        
    # test usershop
        response = client.delete('/api/usershop/3/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 405)

        response = client.get('/api/usershop/3/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/usershop/99/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/usershop/1/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        
        self.assertEqual(response.status_code, 404)
    # test userlist
        response = client.delete('/api/user/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 405)        

        response = client.get('/api/user/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)     

    # test shopitemlist
        response = client.delete('/api/shopitem/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 405)

        response = client.get('/api/shopitem/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

        response = client.post('/api/shopitem/', json.dumps({'price' : "4000", 'type' : "test"}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 201)

    # test shopitem
        response = client.post('/api/shopitem/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 405)

        response = client.get('/api/shopitem/99/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 404)

        response = client.put('/api/shopitem/4/', json.dumps({'star' : "1", 'rating' : "1", 'type': "test4", 'price': "1"}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

        response = client.get('/api/shopitem/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

        response = client.delete('/api/shopitem/4/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)  

        response = client.delete('/api/shopitem/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 403)  

    # test shopitemdetail_list
        response = client.put('/api/shopitem/1/shopitemdetail/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 405)

        response = client.get('/api/shopitem/99/shopitemdetail/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 404)

        response = client.get('/api/shopitem/1/shopitemdetail/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

        response = client.post('/api/shopitem/1/shopitemdetail/', json.dumps({'color' : "test", 'size' : "test", 'left_amount': "1"}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 201)

    # test shopitemdetail
        response = client.post('/api/shopitemdetail/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 405)

        response = client.get('/api/shopitemdetail/99/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 404)

        response = client.put('/api/shopitemdetail/3/', json.dumps({'color' : "test", 'size' : "test", 'left_amount': "1"}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 403)

        shopitem1 = ShopItem.objects.first()
        shopitem1.seller = CustomUser.objects.all()[2]
        shopitem1.save()

        response = client.put('/api/shopitemdetail/3/', json.dumps({'color' : "test", 'size' : "test", 'left_amount': "1"}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

        response = client.get('/api/shopitemdetail/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

        response = client.delete('/api/shopitemdetail/3/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)    

    # test userorderlist
        response = client.delete('/api/userorder/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 405)

        response = client.get('/api/userorder/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

    # test review
        response = client.get('/api/signout/', {'username': 'chris2', 'password': 'chris2'},
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value     

        response = client.delete('/api/review/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 405)
                              
        response = client.post('/api/signin/', json.dumps({'username': 'chris', 'password': 'chris'}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value 

        response = client.get('/api/review/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

        test_file = Image.new('RGB',(100, 100))
        
        data = {'title' : "test", 'content' : "test", 'image': test_file, 'review_item' : 1}

        response = client.post('/api/review/', data, HTTP_X_CSRFTOKEN=csrftoken)
        
        self.assertEqual(response.status_code, 201)

        new_review4 = Review.objects.get(id=4)
        new_review4.review_item = new_shopitem3
        new_review4.save()

    # test review_detail
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value     

        response = client.post('/api/review/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 405)

        response = client.post('/api/signin/', json.dumps({'username': 'swpp', 'password': 'iluvswpp'}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value 

        response = client.get('/api/review/99/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 404)

        response = client.put('/api/review/7/', json.dumps({'title' : "test4", 'content' : "test4"}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

        response = client.get('/api/review/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

        response = client.delete('/api/review/7/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

    # test review_comments
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value     

        response = client.put('/api/review/1/comment/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 405)

        response = client.post('/api/signin/', json.dumps({'username': 'swpp', 'password': 'iluvswpp'}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value 

        response = client.get('/api/review/99/comment/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 404)

        response = client.get('/api/review/1/comment/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

        response = client.post('/api/review/1/comment/', json.dumps({'title' : "test", 'content' : "test"}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 201)

    # test comments
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value     
        response = client.post('/api/comment/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 405)

        response = client.post('/api/signin/', json.dumps({'username': 'swpp', 'password': 'iluvswpp'}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value 

        response = client.get('/api/comment/99/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 404)

        response = client.put('/api/comment/3/', json.dumps({'title' : "test", 'content' : "test"}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

        response = client.get('/api/comment/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

        response = client.delete('/api/comment/3/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)    

    # test recommmned function
        response = client.post('/api/recommend/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 405)

        response = client.get('/api/recommend/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

    # test user comments
        response = client.post('/api/usercomments/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 405)

        response = client.get('/api/usercomments/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

    # test trending posts
        response = client.post('/api/trendingposts/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 405)

        response = client.get('/api/trendingposts/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)        

        response = client.get('/api/trendingposts/100/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)   
        pass


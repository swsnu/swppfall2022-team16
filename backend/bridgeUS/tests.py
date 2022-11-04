from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import Review, Comment

import json


class BlogTestCase(TestCase):
    def test_csrf(self):
        # data init
        new_user = User.objects.create_user(username='swpp', password='iluvswpp')  # Django default user model
        new_user2 = User.objects.create_user(username='swpp2', password='iluvswpp2')
        
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/signup/', json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json')

        self.assertEqual(response.status_code, 403)  # Request without csrf token returns 403 response

        response = client.get('/api/token/')

        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/api/signup/', json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection

        response = client.post('/api/signup/', json.dumps({'username': 'chris2', 'password': 'chris2'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
    # test token, signup
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
        self.assertEqual(response.status_code, 204)

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

        response = client.get('/api/article/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 401)

        response = client.get('/api/article/1/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 401)

        response = client.get('/api/article/1/comment/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 401)
                
        response = client.get('/api/comment/1/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 401)

    # test empty data
        response = client.post('/api/signin/', json.dumps({'username': 'chris', 'password': 'chris'}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/article/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 204)

    # add data
        new_article = Review(title='I Love SWPP!', content='Believe it or not', author=new_user)
        new_article.save()
        
        response = client.get('/api/article/1/comment/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 204)

        new_article2 = Review(title='I Love SWPP!2', content='Believe it or not2', author=new_user2)
        new_article2.save()
        
        new_article3 = Review(title='I Love SWPP!3', content='Believe it or not3', author=new_user)
        new_article3.save()

        new_comment = Comment(article=new_article, content='Comment!', author=new_user)
        new_comment.save()
        
        new_comment2 = Comment(article=new_article2, content='Comment!2', author=new_user2)
        new_comment2.save()

    # test not author
        response = client.post('/api/signin/', json.dumps({'username': 'chris', 'password': 'chris'}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value 

        response = client.put('/api/article/1/', json.dumps({'title' : "test", 'content' : "test"}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 403)

        response = client.put('/api/comment/1/', json.dumps({'title' : "test", 'content' : "test"}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 403)
                
    # test article
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value     

        response = client.delete('/api/article/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 405)
                              
        response = client.post('/api/signin/', json.dumps({'username': 'chris', 'password': 'chris'}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value 

        response = client.get('/api/article/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

        response = client.post('/api/article/', json.dumps({'title' : "test", 'content' : "test"}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 201)
    # test article_detail
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value     
        response = client.post('/api/article/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 405)

        response = client.post('/api/signin/', json.dumps({'username': 'swpp', 'password': 'iluvswpp'}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value 

        response = client.get('/api/article/99/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 404)

        response = client.put('/api/article/1/', json.dumps({'title' : "test", 'content' : "test"}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

        response = client.get('/api/article/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

        response = client.delete('/api/article/3/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)
    # test article_comments
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value     

        response = client.put('/api/article/1/comment/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 405)

        response = client.post('/api/signin/', json.dumps({'username': 'swpp', 'password': 'iluvswpp'}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value 

        response = client.get('/api/article/99/comment/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 404)

        response = client.get('/api/article/1/comment/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

        response = client.post('/api/article/1/comment/', json.dumps({'title' : "test", 'content' : "test"}),
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

        response = client.put('/api/comment/1/', json.dumps({'title' : "test", 'content' : "test"}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

        response = client.get('/api/comment/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)

        response = client.delete('/api/comment/1/', HTTP_X_CSRFTOKEN=csrftoken)

        self.assertEqual(response.status_code, 200)    


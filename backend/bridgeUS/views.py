from django.http import HttpResponse, HttpResponseNotAllowed
from django.contrib.auth.models import User
from django.contrib.auth import logout, authenticate, login
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from json.decoder import JSONDecodeError
import json

from bridgeUS.models import Review, Comment

def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        User.objects.create_user(username=username, password=password)
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])

def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)            
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])    

def signout(request):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    logout(request)
    return HttpResponse(status=204)

def article(request):
    if request.method != 'GET' and request.method != 'POST':
        return HttpResponseNotAllowed(['GET', 'POST'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    if request.method == 'GET':
        if Article.objects.count() <= 0:
            return JsonResponse([{}], safe=False, status=204)

        article_all_list = [{ 'title' : article.title, 'content' : article.content, 'author': article.author.id } for article in Article.objects.all()]
        return JsonResponse(article_all_list, safe=False, status=200)
    else:
        body = request.body.decode()
        article_title = json.loads(body)['title']
        article_content = json.loads(body)['content']
        article_author = request.user

        article = Article(title=article_title, content=article_content, author=article_author)

        article.save()
        
        response_dict = {'id': article.id, 'title': article.title, 'content': article.content, 'author': article_author.id }
        return HttpResponse(json.dumps(response_dict), content_type="application/json", status=201)

def article_detail(request, article_id):
    if request.method != 'GET' and request.method != 'PUT' and request.method != 'DELETE':
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    if not Article.objects.filter(id=article_id).exists():
        return HttpResponse(status=404)

    article = Article.objects.get(id=article_id)

    if article.author.id != request.user.id and (request.method == 'PUT' or request.method == 'DELETE'):
        return HttpResponse(status=403)

    if request.method == 'GET':
        response_dict = { 'title': article.title, 'content': article.content, 'author': article.author.id }
        return JsonResponse(response_dict, status=200)
    elif request.method == 'PUT':
        body = request.body.decode()
        article_title = json.loads(body)['title']
        article_content = json.loads(body)['content']


        article.title = article_title
        article.content = article_content

        article.save()

        response_dict = {"id": article_id, "title": article.title, "content": article.content, "author" : article.author.id }
        return HttpResponse(json.dumps(response_dict), content_type="application/json", status=200)
    else:
        article.delete()
        return HttpResponse(status=200)

def article_comments(request, article_id):
    if request.method != 'GET' and request.method != 'POST':
        return HttpResponseNotAllowed(['GET', 'POST'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    if not Article.objects.filter(id=article_id).exists():
        return HttpResponse(status=404)

    article = Article.objects.get(id=article_id)

    if request.method == 'GET':
        comment_list = Comment.objects.filter(article=article)

        if comment_list.count() <= 0:
            return JsonResponse([{}], safe=False, status=204)

        comment_json_list = [{ 'article' : comment.article.id, 'content' : comment.content, 'author': comment.author.id } for comment in comment_list]
        return JsonResponse(comment_json_list, safe=False, status=200)
    else:
        body = request.body.decode()
        comment_content = json.loads(body)['content']
        comment_author = request.user

        comment = Comment(article=article, content=comment_content, author=comment_author)

        comment.save()
        
        response_dict = {'id': comment.id, 'article': comment.article.id, 'content': comment.content, 'author': comment_author.id }
        return HttpResponse(json.dumps(response_dict), content_type="application/json", status=201)

def comment(request, comment_id):
    if request.method != 'GET' and request.method != 'PUT' and request.method != 'DELETE':
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    if not Comment.objects.filter(id=comment_id).exists():
        return HttpResponse(status=404)

    comment = Comment.objects.get(id=comment_id)

    if comment.author.id != request.user.id and (request.method == 'PUT' or request.method == 'DELETE'):
        return HttpResponse(status=403)

    if request.method == 'GET':
        response_dict = { 'article': comment.article.id, 'content': comment.content, 'author': comment.author.id }
        return JsonResponse(response_dict, status=200)
    elif request.method == 'PUT':
        body = request.body.decode()
        comment_content = json.loads(body)['content']

        comment.content = comment_content

        comment.save()

        response_dict = {"id": comment_id, "article": comment.article.id, "content": comment.content, "author" : comment.author.id }
        return HttpResponse(json.dumps(response_dict), content_type="application/json", status=200)
    else:
        comment.delete()
        return HttpResponse(status=200)


from django.http import HttpResponse, HttpResponseNotAllowed
from django.contrib.auth import logout, authenticate, login
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse

import json
import pandas as pd

from bridgeUS import constants

from ml.cloth_recommendation import find_similar_shopItems

from bridgeUS.models import CustomUser, UserShop, ShopItem, ShopItemDetail, Review, Comment, UserOrder

@ensure_csrf_cookie
def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        
        username = req_data['username']    
        nickname = req_data['nickname']
        password = req_data['password']

        created_user = CustomUser.objects.create_user(username=username, nickname=nickname, password=password)

        # create default usershopmodel
        usershop = UserShop(user=created_user)

        usershop.save()
        
        user = authenticate(request, username=username, password=password)

        login(request, user)  

        user_all_list = [ get_user_json(user) for user in CustomUser.objects.all()]

        return JsonResponse({'userlist': user_all_list, 'id' : user.id }, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])

@ensure_csrf_cookie
def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)            
            return JsonResponse( {'id' : user.id } , status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])    

@ensure_csrf_cookie
def signout(request):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    logout(request)
    return HttpResponse(status=204)

@ensure_csrf_cookie
def usershop(request, user_id):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    
    if not CustomUser.objects.filter(id=user_id).exists():
        return HttpResponse(status=404)

    user = CustomUser.objects.filter(id=user_id).first()    

    if not UserShop.objects.filter(user=user).exists():
        return HttpResponse(status=404)

    usershop = UserShop.objects.filter(user=user).first()    

    response_dict = get_usershop_json(usershop)

    return JsonResponse(response_dict, safe=False, status=200)

@ensure_csrf_cookie
def userlist(request):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])

    if CustomUser.objects.count() <= 0:
        return JsonResponse([{}], safe=False, status=204)

    user_all_list = [ get_user_json(user) for user in CustomUser.objects.all()]
    
    return JsonResponse(user_all_list, safe=False, status=200)

@ensure_csrf_cookie
def shopitemlist(request):
    if request.method != 'GET' and request.method != 'POST':
        return HttpResponseNotAllowed(['GET', 'POST'])

    if request.method != 'GET' and not request.user.is_authenticated:
        return HttpResponse(status=401)

    if request.method == 'GET':
        if ShopItem.objects.count() <= 0:
            return JsonResponse([{}], safe=False, status=204)

        shopitem_all_list = [ get_shopitem_json(shopitem) for shopitem in ShopItem.objects.all() ]
    
        return JsonResponse(shopitem_all_list, safe=False, status=200)
    else:
        body = request.body.decode()
        shopitem_price = json.loads(body)['price']
        shopitem_type = json.loads(body)['type']
        shopitem_seller = request.user

        shopitem = ShopItem(seller=shopitem_seller, price=shopitem_price, type=shopitem_type)

        shopitem.save()
        
        response_dict = get_shopitem_json(shopitem)
        return JsonResponse(response_dict, status=201)
    

@ensure_csrf_cookie
def shopitem(request, item_id):
    if request.method != 'GET' and request.method != 'PUT' and request.method != 'DELETE':
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

    if request.method != 'GET' and not request.user.is_authenticated:
        return HttpResponse(status=401)

    if not ShopItem.objects.filter(id=item_id).exists():
        return HttpResponse(status=404)

    shopitem = ShopItem.objects.get(id=item_id)

    if shopitem.seller.id != request.user.id and (request.method == 'PUT' or request.method == 'DELETE'):
        return HttpResponse(status=403)

    if request.method == 'GET':
        response_dict = get_shopitem_json(shopitem)
        return JsonResponse(response_dict, status=200)
    elif request.method == 'PUT':
        body = request.body.decode()

        shopitem_star = json.loads(body)['star']
        shopitem_rating = json.loads(body)['rating']
        shopitem_price = json.loads(body)['price']
        shopitem_type = json.loads(body)['type']

        shopitem.star = shopitem_star
        shopitem.rating = shopitem_rating
        shopitem.price = shopitem_price
        shopitem.type = shopitem_type

        shopitem.save()

        response_dict = get_shopitem_json(shopitem)
        return JsonResponse(response_dict, status=200)
    else:
        shopitem.delete()
        return HttpResponse(status=200)

@ensure_csrf_cookie
def shopitemdetail_list(request, item_id):
    if request.method != 'GET' and request.method != 'POST':
        return HttpResponseNotAllowed(['GET', 'POST'])

    if request.method != 'GET' and not request.user.is_authenticated:
        return HttpResponse(status=401)

    if not ShopItem.objects.filter(id=item_id).exists():
        return HttpResponse(status=404)

    shopitem = ShopItem.objects.filter(id=item_id).first()
    
    detail_list= ShopItemDetail.objects.filter(main_item=shopitem)

    if request.method == 'GET':
        if detail_list.count() <= 0:
            return JsonResponse([{}], safe=False, status=204)

        detail_all_list = [ get_shopitemdetail_json(detail)
        for detail in detail_list ]
    
        return JsonResponse(detail_all_list, safe=False, status=200)
    else:
        body = request.body.decode()
        detail_color = json.loads(body)['color']
        detail_size = json.loads(body)['size']
        detail_left_amount = json.loads(body)['left_amount']

        detail = ShopItemDetail(main_item=shopitem, color=detail_color, size=detail_size, left_amount=detail_left_amount)

        detail.save()
        
        response_dict = get_shopitemdetail_json(detail)
        return JsonResponse(response_dict, status=201)
    

@ensure_csrf_cookie
def shopitemdetail(request, detail_id):
    if request.method != 'GET' and request.method != 'PUT' and request.method != 'DELETE':
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    if not ShopItemDetail.objects.filter(id=detail_id).exists():
        return HttpResponse(status=404)

    detail = ShopItemDetail.objects.get(id=detail_id)

    if detail.main_item.seller.id != request.user.id and (request.method == 'PUT' or request.method == 'DELETE'):
        return HttpResponse(status=403)

    if request.method == 'GET':
        response_dict = get_shopitemdetail_json(detail)
        return JsonResponse(response_dict, status=200)
    elif request.method == 'PUT':
        body = request.body.decode()

        shopitemdetail_color = json.loads(body)['color']
        shopitemdetail_size = json.loads(body)['size']
        shopitemdetail_left_amount = json.loads(body)['left_amount']

        detail.color = shopitemdetail_color
        detail.size = shopitemdetail_size
        detail.left_amount = shopitemdetail_left_amount

        detail.save()

        response_dict = get_shopitemdetail_json(detail)
        return JsonResponse(response_dict, status=200)
    else:
        detail.delete()
        return HttpResponse(status=200)

@ensure_csrf_cookie
def userorderlist(request):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    if request.method == 'GET':
        userorder_all_list = [get_userorder_json(userorder) for userorder in UserOrder.objects.all()]
        return JsonResponse(userorder_all_list, safe=False, status=200)


@ensure_csrf_cookie
def reviewlist(request):
    if request.method != 'GET' and request.method != 'POST':
        return HttpResponseNotAllowed(['GET', 'POST'])

    if request.method != 'GET' and not request.user.is_authenticated:
        return HttpResponse(status=401)

    if request.method == 'GET':
        if Review.objects.count() <= 0:
            return JsonResponse([{}], safe=False, status=204)

        review_all_list = [ get_review_json(review) for review in Review.objects.all()]

        return JsonResponse(review_all_list, safe=False, status=200)
    else:
        body = request.body.decode()
        review_title = json.loads(body)['title']
        review_content = json.loads(body)['content']
        review_item = json.loads(body)['review_item']
        print(review_title, review_content, review_item)
        
        review_shopItem = ShopItem.objects.get(id=review_item)

        print(review_shopItem)

        review_author = request.user

        review = Review(title=review_title, content=review_content, author=review_author, review_item=review_shopItem)

        review.save()
        
        response_dict = get_review_json(review)

        return JsonResponse(response_dict, status=201)

@ensure_csrf_cookie
def review(request, review_id):
    if request.method != 'GET' and request.method != 'PUT' and request.method != 'DELETE':
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

    if request.method != 'GET' and not request.user.is_authenticated:
        return HttpResponse(status=401)

    if not Review.objects.filter(id=review_id).exists():
        return HttpResponse(status=404)

    review = Review.objects.get(id=review_id)

    if review.author.id != request.user.id and (request.method == 'PUT' or request.method == 'DELETE'):
        return HttpResponse(status=403)

    if request.method == 'GET':
        response_dict = get_review_json(review)

        return JsonResponse(response_dict, status=200)
    elif request.method == 'PUT':
        body = request.body.decode()
        review_title = json.loads(body)['title']
        review_content = json.loads(body)['content']


        review.title = review_title
        review.content = review_content

        review.save()

        response_dict = get_review_json(review)
        return JsonResponse(response_dict, status=200)
    else:
        review.delete()
        return HttpResponse(status=200)

@ensure_csrf_cookie
def reviewcomment(request, review_id):
    if request.method != 'GET' and request.method != 'POST':
        return HttpResponseNotAllowed(['GET', 'POST'])

    if request.method != 'GET' and not request.user.is_authenticated:
        return HttpResponse(status=401)

    if not Review.objects.filter(id=review_id).exists():
        return HttpResponse(status=404)

    review = Review.objects.get(id=review_id)

    if request.method == 'GET':
        comment_list = Comment.objects.filter(review=review)

        if comment_list.count() <= 0:
            return JsonResponse([{}], safe=False, status=204)

        comment_json_list = [get_comment_json(comment) for comment in comment_list]

        return JsonResponse(comment_json_list, safe=False, status=200)
    else:
        body = request.body.decode()
        comment_content = json.loads(body)['content']
        comment_author = request.user

        comment = Comment(review=review, content=comment_content, author=comment_author)

        comment.save()
        
        response_dict = get_comment_json(comment)
        return JsonResponse(response_dict, status=201)

@ensure_csrf_cookie
def comment(request, comment_id):
    if request.method != 'GET' and request.method != 'PUT' and request.method != 'DELETE':
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

    if request.method != 'GET' and not request.user.is_authenticated:
        return HttpResponse(status=401)

    if not Comment.objects.filter(id=comment_id).exists():
        return HttpResponse(status=404)

    comment = Comment.objects.get(id=comment_id)

    if comment.author.id != request.user.id and (request.method == 'PUT' or request.method == 'DELETE'):
        return HttpResponse(status=403)

    if request.method == 'GET':
        response_dict = get_comment_json(comment)
        return JsonResponse(response_dict, status=200)
    elif request.method == 'PUT':
        body = request.body.decode()
        comment_content = json.loads(body)['content']

        comment.content = comment_content

        comment.save()

        response_dict = get_comment_json(comment)
        return JsonResponse(response_dict, status=200)
    else:
        comment.delete()
        return HttpResponse(status=200)

@ensure_csrf_cookie
def recommend_clothes(request, recommend_count):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])

    data = []

    for review in Review.objects.all():
        data.append([review.author.id, review.review_item.id, review.rating])

    rating_dataframe = pd.DataFrame(data=data, columns=['user_id', 'shopitem_id', 'rating'])

    user_orders = UserOrder.objects.all().filter(user=request.user)

    recommended_clothes = []

    if user_orders.count > 0:
        recommended_clothes = find_similar_shopItems(user_orders[0].ordered_item.id, recommend_count, rating_dataframe)
    else:
        trending_review = Review.objects.all().order_by('likes')
        recommended_clothes = find_similar_shopItems(trending_review[0].review_item.id, recommend_count, rating_dataframe)

    response_dict = [get_shopitem_json(ShopItem.objects.first(id=int(recommended))) for recommended in recommended_clothes]

    return JsonResponse(response_dict, status=200, safe=False)

@ensure_csrf_cookie
def search(request):
    if request.method != 'POST':
        return HttpResponseNotAllowed(['POST']) 

    body = request.body.decode()

    text = json.loads(body)['text']
    tags = json.loads(body)['tags']

    if text is not None:
        matched_items = ShopItem.objects.filter(name__icontains=text)
        tag_matched = matched_items.filter(tags__name__in=tags)
        ordered_items = tag_matched.order_by('likes')[:constants.SEARCH_RESULT_COUNT]

        return JsonResponse([get_shopitem_json(ordered_item) for ordered_item in ordered_items ] , status=200)
    else:
        matched_items = ShopItem.objects.filter(tags__name__in=tags)
        ordered_items = matched_items.order_by('likes')[:constants.SEARCH_RESULT_COUNT]
        
        return JsonResponse([get_shopitem_json(ordered_item) for ordered_item in ordered_items ] , status=200)    


@ensure_csrf_cookie
def purchase(request):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])    

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    user_orders = UserOrder.objects.filter(user = request.user)

    pre_orders = user_orders.filter(order_status = constants.OrderStatus.PRE_ORDER)

    user_shop = UserShop.objects.first(user = request.user)
    
    user_credit = user_shop.credit

    needed_credit = 0

    for pre_order in pre_orders:
        needed_credit += pre_order.ordered_item.price * pre_order.ordered_amount

    if needed_credit > user_credit:
        return JsonResponse({'message' : 'not enough credit'}, status=200)

    user_credit -= needed_credit

    for pre_order in pre_orders:
        pre_order.order_status = constants.OrderStatus.PRE_SHIPPING
        pre_order.save()
    
    return JsonResponse([ get_userorder_json(pre_order) for pre_order in pre_orders ], status = 200)     

@ensure_csrf_cookie
def usercomments(request):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])   

    user_comments = Comment.objects.filter(author=request.user)    
    
    comment_json_list = [get_comment_json(comment) for comment in user_comments]
    
    return JsonResponse(comment_json_list, safe=False, status=200)

@ensure_csrf_cookie
def trendingposts(request, post_count):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])                 
    
    return_count = post_count
    
    if post_count > Review.objects.all().count:
        return_count = Review.objects.all().count

    trending_posts = Review.objects.all().order_by('likes')

    return_posts = []

    for i in range(return_count):
        return_posts.append(trending_posts[i])

    post_json_list = [get_review_json(review) for review in return_posts]
    
    return JsonResponse(post_json_list, safe=False, status=200)

def get_review_json(review):
    return { 'id' : review.id, 'rating' : review.rating, 'review_item' : review.review_item.id, 'title': review.title, 'content': review.content, 'author': review.author.id, 'likes' : review.likes, 'image_url': review.image_url }

def get_comment_json(comment):
    return { 'id' : comment.id, 'review' : comment.review.id, 'content' : comment.content, 'author': comment.author.id }

def get_userorder_json(userorder):
    return { 'id' : userorder.id,  'user_id' : userorder.user.id, 'item_id' : userorder.ordered_item.id, 'status': userorder.order_status, 'color' : userorder.color, 'ordered_amount' : userorder.ordered_amount, 'size' : userorder.size, 'purchased_at' : userorder.created_at }

def get_usershop_json(usershop):
    return { 'id' : usershop.id, 'credit' : usershop.credit, 'cart' : usershop.cart , 'purchased_item' : usershop.purchased_item }    

def get_shopitemdetail_json(detail):
    return { 'id' : detail.id, 'mainitem' : detail.main_item.id, 'color' : detail.color, 'size': detail.size, 'left_amount' : detail.left_amount }    

def get_shopitem_json(shopitem):
    return { 'id': shopitem.id, 'image_url' : shopitem.image_url, 'name': shopitem.name, 'seller' : shopitem.seller.id, 'price' : shopitem.price, 'rating': shopitem.rating, 'type': shopitem.type, 'tag': shopitem.tag }

def get_user_json(user):
    return { 'id' : user.id, 'username' : user.username, 'nickname' : user.nickname, 'gender' : user.gender, 'height' : user.height, 'weight': user.weight }     
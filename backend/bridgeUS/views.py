from django.http import HttpResponse, HttpResponseNotAllowed
from django.contrib.auth import logout, authenticate, login
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse

import json
import pandas as pd

from bridgeUS import constants

from ml.cloth_recommendation import find_similar_shopItems

from bridgeUS.models import CustomUser, UserShop, ShopItem, ShopItemDetail, Review, Comment, UserOrder


@ensure_csrf_cookie
@require_http_methods(['POST'])
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

        user_all_list = [get_user_json(user) for user in CustomUser.objects.all()]

        return JsonResponse({'userlist': user_all_list, 'id': user.id}, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
@require_http_methods(['POST'])
def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'id': user.id}, status=200)
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
def usershop(request):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    usershop = UserShop.objects.filter(user=request.user).first()

    response_dict = get_usershop_json(usershop)

    return JsonResponse(response_dict, safe=False, status=200)

@ensure_csrf_cookie
@require_http_methods(['GET', 'POST'])
def cart(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    
    if request.method == 'GET':    
        cart = UserOrder.objects.filter(user=request.user, order_status=int(constants.OrderStatus.PRE_ORDER))

        cart_all_list = [get_userorder_json(order) for order in cart]

        return JsonResponse(cart_all_list, safe=False, status=200)
    else: # 'POST'
        body = request.body.decode()
        userorder_user = request.user
        userorder_item = json.loads(body)['item_id']
        userorder_status = json.loads(body)['status']
        userorder_single_price = json.loads(body)['single_price']
        userorder_color = json.loads(body)['color']
        userorder_size = json.loads(body)['size']
        userorder_amount = json.loads(body)['ordered_amount']
        userorder_shipping = json.loads(body)['fast_shipping']
        userorder = UserOrder(user = userorder_user,
                  ordered_item_id = userorder_item,
                  single_price = userorder_single_price,
                  color = userorder_color,
                  size = userorder_size,
                  fast_shipping = userorder_shipping,
                  ordered_amount = userorder_amount,
                  order_status = userorder_status)
        userorder.save()

        cart = UserOrder.objects.filter(user=request.user, order_status=int(constants.OrderStatus.PRE_ORDER))

        cart_all_list = [get_userorder_json(order) for order in cart]

        return JsonResponse(cart_all_list, safe=False, status=200)

def cartitem(request, order_id):
    if request.method != 'DELETE':
        return HttpResponseNotAllowed(['DELETE'])
    
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    
    order = UserOrder.objects.get(id = order_id)

    order.delete()

    return HttpResponse(status=204)

@ensure_csrf_cookie
def userlist(request):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])

    if CustomUser.objects.count() <= 0:
        return JsonResponse([{}], safe=False, status=204)

    user_all_list = [get_user_json(user) for user in CustomUser.objects.all()]

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

        shopitem_all_list = [get_shopitem_json(shopitem) for shopitem in ShopItem.objects.all()]

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

    detail_list = ShopItemDetail.objects.filter(main_item=shopitem)

    if request.method == 'GET':
        if detail_list.count() <= 0:
            return JsonResponse([{}], safe=False, status=204)

        detail_all_list = [get_shopitemdetail_json(detail)
                           for detail in detail_list]

        return JsonResponse(detail_all_list, safe=False, status=200)
    else:
        body = request.body.decode()
        detail_color = json.loads(body)['color']
        detail_size = json.loads(body)['size']
        detail_left_amount = json.loads(body)['left_amount']

        detail = ShopItemDetail(main_item=shopitem, color=detail_color, size=detail_size,
                                left_amount=detail_left_amount)

        detail.save()

        response_dict = get_shopitemdetail_json(detail)
        return JsonResponse(response_dict, status=201)


@ensure_csrf_cookie
@require_http_methods(['GET', 'PUT'])
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
@require_http_methods(['GET'])
def userorderlist(request):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    if request.method == 'GET':
        userorder_all_list = [get_userorder_json(userorder) for userorder in UserOrder.objects.all()]
        return JsonResponse(userorder_all_list, safe=False, status=200)


@ensure_csrf_cookie
@require_http_methods(['GET', 'POST'])
def reviewlist(request):
    if request.method != 'GET' and request.method != 'POST':
        return HttpResponseNotAllowed(['GET', 'POST'])

    if request.method != 'GET' and not request.user.is_authenticated:
        return HttpResponse(status=401)

    if request.method == 'GET':
        if Review.objects.count() <= 0:
            return JsonResponse([{}], safe=False, status=204)

        review_all_list = [get_review_json(review) for review in Review.objects.all()]

        return JsonResponse(review_all_list, safe=False, status=200)
    else:
        body = request.POST
        review_title = body.get('title')
        review_content = body.get('content')
        review_item = body.get('review_item')
        review_rating = body.get('rating')
        review_image = request.FILES.getlist('image')[0] if len(request.FILES.getlist('image')) > 0 else None

        review_shopItem = ShopItem.objects.get(id=review_item)

        review_author = request.user

        review = Review(title=review_title, content=review_content, author=review_author, review_item=review_shopItem,
                        rating=review_rating, image=review_image)

        current_total_rate = review_shopItem.raters * review_shopItem.rating 
        changed_rating = (float(review_rating) + current_total_rate) / (review_shopItem.raters + 1)

        review_shopItem.raters = review_shopItem.raters + 1
        review_shopItem.rating = changed_rating

        review_shopItem.save()
        
        review.save()

        response_dict = get_review_json(review)

        return JsonResponse(response_dict, status=201)


@ensure_csrf_cookie
@require_http_methods(['GET', 'PUT', 'DELETE'])
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
@require_http_methods(['GET', 'POST'])
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
@require_http_methods(['GET', 'PUT', 'DELETE'])
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
@require_http_methods(['GET'])
def recommend_clothes(request, recommend_count):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])

    data = []

    for review in Review.objects.all():
        data.append([review.author.id, review.review_item.id, review.rating])

    rating_dataframe = pd.DataFrame(data=data, columns=['user_id', 'shopitem_id', 'rating'])

    recommended_clothes = []

    if request.user.is_authenticated and len(UserOrder.objects.filter(user=request.user)) > 0:
        recommended_clothes = find_similar_shopItems(UserOrder.objects.filter(user=request.user).last().ordered_item.id,
                                                     recommend_count, rating_dataframe)
    else:
        trending_review = Review.objects.all().order_by('likes')
        recommended_clothes = find_similar_shopItems(trending_review[0].review_item.id, recommend_count,
                                                     rating_dataframe)

    response_dict = [get_shopitem_json(ShopItem.objects.get(id=int(recommended))) for recommended in
                     recommended_clothes]

    return JsonResponse(response_dict, status=200, safe=False)


@ensure_csrf_cookie
@require_http_methods(['POST'])
def search(request):
    if request.method != 'POST':
        return HttpResponseNotAllowed(['POST'])

    body = request.body.decode()

    text = json.loads(body)['text']
    tags = json.loads(body)['tags']

    matched_items = ShopItem.objects

    if text is not None and text != "":
        matched_items = matched_items.filter(name__icontains=text)

    if tags is not None and len(tags) > 0:
        for tag in tags:
            matched_items = matched_items.filter(tags__name__in=[tag])

    ordered_items = matched_items.order_by('-rating')[:constants.SEARCH_RESULT_COUNT]

    return JsonResponse([get_shopitem_json(ordered_item) for ordered_item in ordered_items], safe=False, status=200)


@ensure_csrf_cookie
@require_http_methods(['GET'])
def purchase(request, shipping_fee):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    user_orders = UserOrder.objects.filter(user=request.user)

    pre_orders = user_orders.filter(order_status=int(constants.OrderStatus.PRE_ORDER))

    user_shop = UserShop.objects.get(user=request.user)

    user_credit = user_shop.credit

    needed_credit = shipping_fee

    for pre_order in pre_orders:
        needed_credit += pre_order.ordered_item.price * pre_order.ordered_amount

    if needed_credit > user_credit:
        return JsonResponse({'message': 'not enough credit'}, status=400)

    user_credit -= needed_credit
    user_shop.credit = user_credit
    user_shop.save()

    for pre_order in pre_orders:
        pre_order.order_status = int(constants.OrderStatus.PRE_SHIPPING)
        pre_order.save()

    return JsonResponse([get_userorder_json(pre_order) for pre_order in pre_orders], safe=False, status=200)


@ensure_csrf_cookie
@require_http_methods(['GET'])
def usercomments(request):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])

    user_comments = Comment.objects.filter(review__author=request.user)

    print(user_comments)

    comment_json_list = [get_comment_json(comment) for comment in user_comments]

    return JsonResponse(comment_json_list, safe=False, status=200)


@ensure_csrf_cookie
@require_http_methods(['GET'])
def trendingposts(request, post_count):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])

    return_count = post_count

    if post_count > Review.objects.all().count():
        return_count = Review.objects.all().count()

    trending_posts = Review.objects.all().order_by('-likes')

    return_posts = []

    for i in range(return_count):
        return_posts.append(trending_posts[i])

    post_json_list = [get_review_json(review) for review in return_posts]

    return JsonResponse(post_json_list, safe=False, status=200)

@ensure_csrf_cookie
@require_http_methods(['POST'])
def addlikes(request, post_id):
    if request.method != 'POST':
        return HttpResponseNotAllowed(['POST'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    customUser = CustomUser.objects.get(id=request.user.id)

    liked_posts_list = []

    if len(customUser.liked_posts) > 0:
        liked_posts_list = [int(num) for num in customUser.liked_posts.split(',')]
    
    if liked_posts_list.__contains__(int(post_id)):
        return HttpResponse(status=400)

    liked_posts_list.append(int(post_id))

    customUser.liked_posts = ','.join(str(item) for item in liked_posts_list)

    customUser.save()

    post = Review.objects.get(id=post_id)

    post.likes = post.likes + 1

    post.save()

    return JsonResponse(get_user_json(customUser), safe=False, status=200)

def get_review_json(review):
    return {'id': review.id, 'rating': review.rating, 'review_item': review.review_item.id, 'title': review.title,
            'content': review.content, 'author': review.author.id, 'likes': review.likes,
            'image_url': review.image.url if review.image else ''}


def get_comment_json(comment):
    return {'id': comment.id, 'review': comment.review.id, 'content': comment.content, 'author': comment.author.id, 'created_at': comment.created_at}


def get_userorder_json(userorder):
    return {'id': userorder.id, 'user_id': userorder.user.id, 'item_id': userorder.ordered_item.id, 'single_price': userorder.single_price,
            'status': userorder.order_status, 'color': userorder.color, 'ordered_amount': userorder.ordered_amount,
            'size': userorder.size, 'purchased_at': userorder.created_at}


def get_usershop_json(usershop):
    return {'id': usershop.id, 'credit': usershop.credit, 'cart': usershop.cart,
            'purchased_item': usershop.purchased_item}


def get_shopitemdetail_json(detail):
    return {'id': detail.id, 'mainitem': detail.main_item.id, 'color': detail.color, 'size': detail.size,
            'left_amount': detail.left_amount}


def get_shopitem_json(shopitem):
    return {'id': shopitem.id, 'image_url': shopitem.image.url if shopitem.image else '', 'name': shopitem.name,
            'seller': shopitem.seller.id, 'price': shopitem.price, 'rating': shopitem.rating, 'type': shopitem.type,
            'tags': list(shopitem.tags.names())}


def get_user_json(user):
    return {'id': user.id, 'username': user.username, 'nickname': user.nickname, 'gender': user.gender,
            'height': user.height, 'weight': user.weight, 'liked_posts': user.liked_posts}

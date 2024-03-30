from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .models import Users, Salas
from django.urls import reverse
import json
from django.views.decorators.http import require_http_methods
# Create your views here.
@require_http_methods(['GET'])
def form_login(request):
    return render(request, 'login.html')

@require_http_methods(['POST'])
def login(request):
    data = json.loads(request.body.decode())
    user = Users.objects.get_or_create(username=data['username'])
    request.session['user'] = user[0].id
    url = reverse('room_listing') # Retorna a url completa passando o name como param
    url_dict = {'url': url}
    return JsonResponse(url_dict)

@require_http_methods(['GET'])
def room_listing(request):
    user_session = request.session.get('user')
    if user_session:
        user = Users.objects.get(id=user_session)
        todas_salas = Salas.objects.all()
        images = ['img/rooms/PHP-Logo.png',
                        'img/rooms/C-Logo.png',
                        'img/rooms/Ruby-Logo.png',
                        'img/rooms/Go-Logo.png',
                        'img/rooms/C#-Logo.webp',
                        'img/rooms/JavaScript-Logo.png',
                        'img/rooms/Java-Logo.webp',
                        'img/rooms/Python-Logo.webp',]
        images_rooms = zip(todas_salas, images)
        return render(request, 'room_listing.html', context={'images_rooms': images_rooms,'list':True, 'locked':True, 'user':user})
    return redirect('login')
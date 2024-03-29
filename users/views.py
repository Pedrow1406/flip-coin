from django.shortcuts import render
from django.http import HttpResponse, QueryDict
from django.views.decorators.http import require_http_methods
# Create your views here.
@require_http_methods(['GET'])
def form_login(request):
    return render(request, 'login.html')

@require_http_methods(['POST'])
def login(request):
    data = request.body.decode()
    return HttpResponse(data)
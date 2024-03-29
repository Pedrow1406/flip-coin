from django.urls import path
from . import views
urlpatterns = [
    path('login/', views.login, name='login'),
    path('form_login/', views.form_login, name='form_login')
]
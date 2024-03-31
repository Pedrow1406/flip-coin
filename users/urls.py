from django.urls import path
from . import views
urlpatterns = [
    path('login/', views.login, name='login'),
    path('form_login/', views.form_login, name='form_login'),
    path('room_listing/', views.room_listing, name='room_listing'),
    path('room/<int:id>/', views.room, name="room"),
    path('get_data/<int:id>/', views.get_data, name='get_data'),
    path('update_balance/', views.update_balance, name="update_balance")
]

from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData),
    path('campaign/', views.campaign, name='campaign'),
    path('recipients/', views.recipient, name="recipients"),
    path('register/', views.RegisterView, name="register"),
    path('login/',views.LoginView, name='login')
    ]
from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView, CampaignView, GroupView, TemplateView, ApproveView, RecipientView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('campaign/', CampaignView.as_view()),
    path('campaign/approve/', ApproveView.as_view()),
    path('group', GroupView.as_view()),
    path('template', TemplateView.as_view()),
    path('recipients/', RecipientView.as_view())
]
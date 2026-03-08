from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('jobs/', views.jobs, name='jobs'),
    path('job/<int:pk>/', views.job_detail, name='job_detail'),
    path('companies/', views.companies, name='companies'),
    path('company/<int:pk>/', views.company_detail, name='company_detail'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('superadmin/', views.superadmin_dashboard, name='superadmin_dashboard'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('register/', views.register, name='register'),
]
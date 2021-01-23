from django.urls import path

from . import views

app_name = 'Home'

urlpatterns = [
	path('inicio/', views.HomeClass.as_view(), name = 'home'),
]
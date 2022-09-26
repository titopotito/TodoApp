from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add', views.add, name='add'),
    path('delete', views.delete, name='delete'),
    path('toggle', views.toggle, name='toggle'),
    path('filter/<str:filter_param>', views.filter, name='filter'),
]
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add_todo', views.add_todo, name='add_todo'),
    path('delete_todo', views.delete_todo, name='delete_todo'),
    path('complete_todo', views.complete_todo, name='complete_todo'),
    path('filter_all', views.filter_all, name='filter_all'),
    path('filter_completed', views.filter_completed, name='filter_completed'),
    path('filter_pending', views.filter_pending, name='filter_pending')
]
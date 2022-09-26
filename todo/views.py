from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core import serializers

from .models import Todo
import json

def index(request):
    todos = Todo.objects.all().order_by('pk')
    context = {
        'todos': todos
    }
    return render(request, 'todo.html', {'todos': todos})

def add(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        todo = Todo(text=data['text'])
        todo.save()

        context = {
            'id': todo.pk,
            'text': data['text'],
            'is_completed': todo.is_completed,
            'csrftoken': request.META['CSRF_COOKIE']
        }

    return JsonResponse(context, safe=False)

def delete(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        todo = Todo.objects.get(id=data['id'])
        todo.delete()
    return JsonResponse({}, safe=False)

def toggle(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        todo = Todo.objects.get(id=data['id'])
        if (data['is_completed']):
            todo.is_completed = False
        else:
            todo.is_completed = True
        
        todo.save()
    return JsonResponse({}, safe=False)


def filter(request, filter_param):
    if (filter_param == 'All'):
        todos = Todo.objects.all().order_by('pk')
    if (filter_param == 'Completed'):
        todos = Todo.objects.filter(is_completed=True).order_by('pk')
    if (filter_param == 'Pending'):
        todos = Todo.objects.filter(is_completed=False).order_by('pk')
    serialized = serializers.serialize('json', todos)
    todos_json = json.loads(serialized)

    context = {
        'todos': todos_json,
        'csrftoken': request.META['CSRF_COOKIE']
    }
    return JsonResponse(context, safe=False, content_type='application/json')

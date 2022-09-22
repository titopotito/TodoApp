from django.shortcuts import render, redirect
from django.http import JsonResponse

from .models import Todo
import json

def index(request):
    todos = Todo.objects.all()
    context = {
        'todos': todos
    }
    return render(request, 'todo.html', {'todos': todos})

def add_todo(request):
    if request.method == 'POST':
        data = request.body
        json_object = json.loads(data)
        text = json_object['text']
        todo = Todo(text=text)
        todo.save()
        todo_id = todo.pk

    return JsonResponse({'id': todo_id, 'text': text, 'csrftoken': request.META['CSRF_COOKIE']}, safe=False)

def delete_todo(request):
    if request.method == 'POST':
        data = request.body
        json_object = json.loads(data)
        todo_id = json_object['id']
        todo = Todo.objects.get(id=todo_id)
        todo.delete()
    return JsonResponse({}, safe=False)
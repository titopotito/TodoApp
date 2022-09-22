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

def addTodo(request):
    if request.method == 'POST':
        data = request.body
        json_object = json.loads(data)
        text = json_object['text']
        todo = Todo(text=text)
        todo.save()
        todo_id = todo.pk

    return JsonResponse({'id': todo_id, 'text': text}, safe=False)
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

def add_todo(request):
    if request.method == 'POST':
        data = request.body
        todoJson = json.loads(data)
        text = todoJson['text']
        todo = Todo(text=text)
        todo.save()
        todo_id = todo.pk

    return JsonResponse({'id': todo_id, 'text': text, 'is_completed': todo.is_completed, 'csrftoken': request.META['CSRF_COOKIE']}, safe=False)

def delete_todo(request):
    if request.method == 'POST':
        data = request.body
        todoJson = json.loads(data)
        todo_id = todoJson['id']
        todo = Todo.objects.get(id=todo_id)
        todo.delete()
    return JsonResponse({}, safe=False)

def complete_todo(request):
    if request.method == 'POST':
        data = request.body
        todoJson = json.loads(data)
        todo_id = todoJson['id']
        todo = Todo.objects.get(id=todo_id)
        if (todoJson['is_completed']):
            todo.is_completed = False
        else:
            todo.is_completed = True
        
        todo.save()
    return JsonResponse({}, safe=False)

def filter_all(request):
    todos = Todo.objects.all().order_by('pk')
    todos_json = serializers.serialize('json', todos)
    todos_object = json.loads(todos_json)
    print(todos_object)
    return JsonResponse({'todos':todos_object, 'csrftoken': request.META['CSRF_COOKIE']}, safe=False, content_type='application/json')

def filter_completed(request):
    todos = Todo.objects.filter(is_completed=True).order_by('pk')
    todos_json = serializers.serialize('json', todos)
    todos_object = json.loads(todos_json)
    print(todos_object)
    return JsonResponse({'todos':todos_object, 'csrftoken': request.META['CSRF_COOKIE']}, safe=False, content_type='application/json')

def filter_pending(request):
    todos = Todo.objects.filter(is_completed=False).order_by('pk')
    todos_json = serializers.serialize('json', todos)
    todos_object = json.loads(todos_json)
    return JsonResponse({'todos':todos_object, 'csrftoken': request.META['CSRF_COOKIE']}, safe=False, content_type='application/json')
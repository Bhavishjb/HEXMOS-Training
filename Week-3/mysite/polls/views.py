from typing import Any
#from django.db import models
from django.shortcuts import render
from django.urls import reverse

from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.template import loader
from .models import Question, Choice, Tags
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.views import generic
from django.utils import timezone
from django.http import JsonResponse
from json import loads

import json
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .models import Tags


from rest_framework import viewsets
from . import models
from .serializers import QuestionSerializer
from django.views.decorators.csrf import csrf_exempt


def get_tags(request):
    if request.method == "GET":
        tags = list(set([tagObject.tag for tagObject in Tags.objects.all()]))
        return JsonResponse({"Tags": tags})
    return JsonResponse({"error": "Request not found."}, status=400)


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context = {'latest_question_list': latest_question_list}
    return render(request, 'polls/index.html', context)
    #output = ', '.join([q.question_text for q in latest_question_list])
    #return HttpResponse(output)
    #return HttpResponse(template.render(context, request))
    

def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/detail.html', {'question': question})


def results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/results.html', {'question': question})


def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form with an error message
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Redirect to the results page after successful vote
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))


class IndexView(generic.ListView):
    template_name = "polls/index.html"
    context_object_name = "latest_question_list"

    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.filter(pub_date__lte=timezone.now()).order_by("-pub_date")[:5]
    
class DetailView(generic.DetailView):
    model = Question
    template_name = "polls/detail.html"
    def get_queryset(self):
        return Question.objects.filter(pub_date__lte=timezone.now())
    
class ResultsView(generic.DetailView):
    model = Question
    template_name = "polls/results.html"


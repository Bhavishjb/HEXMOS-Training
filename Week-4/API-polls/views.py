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


@csrf_exempt
def get_or_post_polls(request):
    if request.method == "GET":
        tags = request.GET.get("tags")
        tags_list = tags.split(",") if tags else None
        questions = Question.objects.all()
        if tags_list:
            questions = Question.objects.filter(Tags__tag__in=tags_list).distinct()
        response_data = []
        for question in questions:
            choices = {choiceObject.choice_text:choiceObject.votes for choiceObject in Choice.objects.filter(question=question)}
            tags = [tagObject.tag for tagObject in Tags.objects.filter(question=question)]
            response_data.append({"id": question.id, "Question": question.question_text, "OptionVote": choices, "Tags": tags})
        return JsonResponse(response_data, status=200, safe=False)
    elif request.method == "POST":
        data = loads(request.body)
        question_text, option_votes, tags = [data[s] for s in ["Question", "OptionVote", "Tags"]]
        question = Question.objects.create(question_text=question_text, pub_date=timezone.now())
        for option_text, votes in option_votes.items():
            Choice.objects.create(question=question, choice_text=option_text, votes=int(votes))
        for tag in tags:
            Tags.objects.create(question=question, tag=tag)
        response_data = {"Question": question.question_text, "OptionVote": option_votes, "Tags": tags}
        return JsonResponse(response_data, status=200, safe=False)
    else:
        return JsonResponse({"error": "Request not found"}, status=400)


@csrf_exempt
def get_or_put_inc(request,id):
    if request.method=="GET":
        questionObj=get_object_or_404(Question,pk=id)
        choices = {choiceObj.choice_text:choiceObj.votes for choiceObj in Choice.objects.filter(question=questionObj)}
        tags = [tagObj.tag for tagObj in Tags.objects.filter(question=questionObj)]
        d={
            "Question":questionObj.question_text,
            "Choice":choices,
            "Tags":tags
        }
        return JsonResponse(d,safe=True)
    if request.method == "PUT":
        questionObj=get_object_or_404(Question,pk=id)
        Object= loads(request.body)
        incrementOption = Object['incrementOption'] if "incrementOption" in Object else None
        choiceObj = get_object_or_404(Choice, question=questionObj, choice_text=incrementOption)
        choiceObj.votes+=1
        choiceObj.save()
        return JsonResponse({"Success":"Voted successfully!"},safe=200)
    else:
        return JsonResponse({"error": "Request not found."}, status=400)

@csrf_exempt
def filter_by_tags(request, tag):
    if request.method == "GET":
        tagObj = get_object_or_404(Tags, tag=tag)
        choices = {choiceObj.choice_text: choiceObj.votes for choiceObj in Choice.objects.filter(question__tags=tagObj)}
        questionObj = [questionObj.question_text for questionObj in Question.objects.filter(tags=tagObj)]
        d = {
            "Question": questionObj,
            "Choice": choices,
            "Tags": tagObj.tag,
        }
        return JsonResponse(d, safe=True)
    return JsonResponse({"error": "Request not found."}, status=400)

def get_polls_by_tags(request):
    listOfDictionaries = []
    tagsList = request.GET.get('tags').split(",")
    for questionObject in Question.objects.all():
        questionTags = [tagObject.tag for tagObject in Tags.objects.filter(question=questionObject)]
        if(any(item in questionTags for item in tagsList)):
            choices = {choiceObject.choice_text:choiceObject.votes for choiceObject in Choice.objects.filter(question=questionObject)}
            d = {
                "id":questionObject.id,
                "Question":questionObject.question_text,
                "OptionVote":choices,
                "Tags":questionTags
            }
            listOfDictionaries.append(d)

    return JsonResponse(listOfDictionaries,safe=False)


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


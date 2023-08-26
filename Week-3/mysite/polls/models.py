from django.db import models
import datetime

from django.utils import timezone

# Create your models here.

#Creating three models Question, Choice, Tags


# Question and choice inherit from models.Model

# Question will have Question text and pub_date

#choice will have foreign key question and
# attributes choice_text and votes



class Question(models.Model):
    def __str__(self):
        return self.question_text
    

    def was_published_recently(self):
        now = timezone.now()
        # return self.pub_date >= timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <=now

    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField("date published")

datetime.timedelta(days=1)
class Choice(models.Model):
    def __str__(self):
        return self.choice_text
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)


class Tags(models.Model):

    def __str__(self):
        return self.tag
    question = models.ForeignKey(Question, related_name="Tags", on_delete=models.CASCADE)
    tag = models.CharField(max_length=200)

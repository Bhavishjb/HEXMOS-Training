from django.contrib import admin

from .models import Question,Choice, Tags
# Register your models here.

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3

class TagInline(admin.TabularInline):
    model = Tags
    extra = 2



class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['question_text']}),
        ('Date information', {'fields': ['pub_date'], 'classes': ['collapse']}),
    ]
    inlines = [ChoiceInline,TagInline]

admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)

admin.site.register(Tags)


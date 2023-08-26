from django.urls import path,re_path
from . import views

#from .views import QuestionViewSet
from rest_framework.routers import DefaultRouter
app_name ="polls"

# router = DefaultRouter()

# router.register('',QuestionViewSet, basename="questions")
# print("router urls", router.urls)

urlpatterns = [
    path("", views.index, name = "index"),
    path("specifics/<int:question_id>/", views.detail, name="detail"),
    path("<int:question_id>/", views.detail, name="detail"),
    path("<int:question_id>/results/", views.results, name="results"),
    path("<int:question_id>/vote/", views.vote, name="vote"),
]
    
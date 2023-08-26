from django.urls import path,re_path
from . import views

#from .views import QuestionViewSet
from rest_framework.routers import DefaultRouter
app_name ="polls"

# router = DefaultRouter()

# router.register('',QuestionViewSet, basename="questions")
# print("router urls", router.urls)

# urlpatterns = router.urls


    # path("", views.index, name = "index"),
    # path("specifics/<int:question_id>/", views.detail, name="detail"),
    # path("<int:question_id>/", views.detail, name="detail"),
    # path("<int:question_id>/results/", views.results, name="results"),
    # path("<int:question_id>/vote/", views.vote, name="vote")
    

urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("<int:pk>/", views.DetailView.as_view(), name="detail"),
    path("<int:pk>/results/",views.ResultsView.as_view(), name="results"),
    path("<int:question_id>/vote/", views.vote, name="vote"),
    path("get_or_post_polls/", views.get_or_post_polls,name="get_or_post_polls"),
    path("get_or_put_inc/<int:id>/", views.get_or_put_inc, name="get_or_put_inc"),
    path("get_polls_by_tags/",views.get_polls_by_tags,name="get_polls_by_tags"),
    path("tags/", views.get_tags, name="get_tags"),
]

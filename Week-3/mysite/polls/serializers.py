from rest_framework import serializers
from .models import Question,Choice, Tags

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = [
            # 'id',
            'choice_text',
            'votes'
        ]
        model = Choice
class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        fields = [
            # 'id', 
            'tag'
        ]
        model = Tags
class QuestionSerializer(serializers.ModelSerializer):
    OptionVote = ChoiceSerializer(many=True)
    Tags = TagsSerializer(many=True)
    class Meta:
        fields = [
            # 'id',
            'question_text',
            # 'pub_date',
            'OptionVote',
            'Tags'

        ]
        model = Question


QS = QuestionSerializer
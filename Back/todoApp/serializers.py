from rest_framework import serializers # type: ignore
from .models import Todo #type: ignore

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
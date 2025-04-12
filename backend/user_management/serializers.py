from rest_framework import serializers
from .models import UserModel, CreatorModel, ListenerModel


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = "__all__"
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = UserModel.objects.create_user(**validated_data)

        role = validated_data.get("role")
        if role == "creatorUser":
            CreatorModel.objects.create(creator_id=user)

        return user


class CreatorSerializer(serializers.ModelSerializer): 
    creator_id = UserSerializer() 

    class Meta:
        model = CreatorModel
        fields = "__all__"

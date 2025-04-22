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

    def create(self, validated_data):
        user_data = validated_data.pop("user")

        user_serializer = UserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        creator = CreatorModel.objects.create(creator_id=user, **validated_data)

        return creator

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user")

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if user_data:
            user_serializer = UserSerializer(
                instance=instance.user, data=user_data, partial=self.partial
            )
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()

        return instance


class ListenerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListenerModel
        fields = "__all__"

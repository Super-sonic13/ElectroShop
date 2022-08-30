from django.db import models
from django.contrib.auth.models import User


class Theme(models.Model):
    name = models.CharField(max_length=100, unique=True, null=False)

    def __str__(self) -> str:
        return str(self.name)


class Comment(models.Model):
    content = models.CharField(max_length=500, null=False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return str(self.content)


class Article(models.Model):

    title = models.CharField(max_length=100, unique=True, null=False)
    content = models.CharField(max_length=2000, null=False)
    about = models.CharField(max_length=200, null=False)

    theme = models.ForeignKey(Theme, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return str(self.title)
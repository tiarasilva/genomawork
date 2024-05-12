# Generated by Django 5.0.6 on 2024-05-12 04:08

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="FoodReviews",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=200)),
                ("location", models.CharField(max_length=200)),
                ("type", models.IntegerField()),
                ("rank", models.IntegerField(null=True)),
                ("country", models.CharField(max_length=200)),
                ("visited", models.BooleanField(default=False)),
                ("updatedAt", models.DateTimeField(auto_now=True)),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="TypeRestaurants",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=200)),
                ("updatedAt", models.DateTimeField(auto_now=True)),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
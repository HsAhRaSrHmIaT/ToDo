# Generated by Django 5.1.4 on 2024-12-30 06:25

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("todoApp", "0002_todo_description"),
    ]

    operations = [
        migrations.AlterField(
            model_name="todo",
            name="title",
            field=models.CharField(max_length=50),
        ),
    ]

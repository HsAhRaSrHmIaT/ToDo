# Generated by Django 5.1.4 on 2025-01-03 05:04

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("todoApp", "0004_todo_priority"),
    ]

    operations = [
        migrations.AddField(
            model_name="todo",
            name="expired",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="todo",
            name="reminder_time",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
# Generated by Django 3.1.2 on 2020-10-31 16:06

from django.db import migrations
import randomslugfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_note_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='slug',
            field=randomslugfield.fields.RandomSlugField(blank=True, editable=False, length=15, max_length=15, null=True, unique=True),
        ),
    ]

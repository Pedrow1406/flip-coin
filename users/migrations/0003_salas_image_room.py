# Generated by Django 5.0.3 on 2024-03-29 22:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_resultados_sala_salas_nome_sala'),
    ]

    operations = [
        migrations.AddField(
            model_name='salas',
            name='image_room',
            field=models.ImageField(default=1, upload_to=''),
            preserve_default=False,
        ),
    ]
from django.db import models

# Create your models here.
class Users(models.Model):
    username = models.CharField(max_length=30, unique=True)
    saldo = models.FloatField(default=0)
    data_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.username
    

class Salas(models.Model):
    nome_sala = models.CharField(max_length=30)
    valor_sala = models.FloatField()
    user = models.ForeignKey(Users, on_delete=models.SET_NULL, blank=True, null=True, default=None)

    def __str__(self) -> str:
        return f'{self.nome_sala} | {self.valor_sala}'
    
class Resultados(models.Model):
    win = models.BooleanField(default=False)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    sala = models.ForeignKey(Salas, on_delete=models.DO_NOTHING)
    bot_choice = models.CharField(max_length=5)
    user_choice = models.CharField(max_length=5)

    def __str__(self) -> str:
        return f"User: {self.user}, Sala: {self.sala.nome_sala} => {'Win' if self.win else 'Lose'}"

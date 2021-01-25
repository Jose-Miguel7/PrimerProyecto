from django.db import models

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from .managers import UserManager

class User(AbstractBaseUser, PermissionsMixin):
	usuario = models.CharField(max_length = 20, unique = True)

	is_staff = models.BooleanField(default = False)

	USERNAME_FIELD = 'usuario'

	objects = UserManager()

	def get_short_name(self):
		return self.usuario
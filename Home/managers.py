from django.db import models

from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager, models.Manager):

	def _create_user(self, usuario, password, is_staff, is_superuser, **kwargs):
		user = self.model(
			usuario = usuario,
			is_staff = is_staff,
			is_superuser = is_superuser,
			**kwargs
		)

		user.set_password(password)
		user.save(using = self.db)
		return user

	def create_user(self, usuario, password = None, **kwargs):
		return self._create_user(usuario, password, False, False, **kwargs)

	def create_superuser(self, usuario, password = None, **kwargs):
		return self._create_user(usuario, password, True, True, **kwargs)
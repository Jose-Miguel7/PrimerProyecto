from django.shortcuts import render

from django.views.generic import TemplateView
from .juego import recepcion

class HomeClass(TemplateView):
	template_name = 'Home/inicio.html'

	def get(self, request):
		return render(request, self.template_name)

	def post(self, request):
		nombre = request.POST['nombre']
		email = request.POST['email']

		contexto = {
			'nombre': nombre,
			'email': email,
			'juego': recepcion(nombre, email)
		}

		return render(request, self.template_name, contexto)

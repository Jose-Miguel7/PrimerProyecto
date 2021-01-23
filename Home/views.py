from django.shortcuts import render

from django.views.generic import TemplateView

class HomeClass(TemplateView):
	template_name = 'Home/inicio.html'

	def get_context_data(self, **kwargs):
	    context = super(HomeClass, self).get_context_data(**kwargs)

	    context['numeros'] = '1278409712'

	    return context
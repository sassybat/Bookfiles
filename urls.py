from django.conf.urls.defaults import patterns, include, url
from django.views.generic.simple import direct_to_template, redirect_to
from django.core.urlresolvers import reverse
from django.shortcuts import HttpResponseRedirect

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', lambda x: HttpResponseRedirect('/books'), name='home'),
    url(r'^books/', include('books.urls')),
    url(r'^users/', include('users.urls')),
)

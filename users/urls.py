from django.conf.urls.defaults import patterns, include, url
from django.contrib.auth.views import login, logout

urlpatterns = patterns('users.views',
    #url(r'^login$', login, {'template_name':'login.html'}, name='login'),
    url(r'^login/$','login', name='login'),
    url(r'^logout$', 'logout', name='logout'),
    url(r'^register$', 'register', name='register'),
    url(r'^(?P<u_name>\w+)/bookpile$', 'show_bookpile', name='show_bookpile'),
)

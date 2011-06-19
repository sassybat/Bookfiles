from django.conf.urls.defaults import patterns, include, url
from django.views.generic.simple import direct_to_template

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('books.views',
    url(r'^$','list_all', name='show_books'),
    url(r'^new/$', 'create', name='create_book'),
    url(r'^(?P<b_id>\d+)$', 'show', name='show_book'),
    url(r'^(?P<b_id>\d+)/add/read$', 'add', {'read':True}, name='add_read_book'),
    url(r'^(?P<b_id>\d+)/add/unread$', 'add', {'read':False}, name='add_unread_book'),
    url(r'^(?P<b_id>\d+)/change/read$', 'change', name='change_read_book'),
    url(r'^(?P<b_id>\d+)/delete$', 'delete', name='delete_book'),
    url(r'^(?P<b_id>\d+)/add/vote$', 'vote', name='vote_book'),
    url(r'^(?P<b_id>\d+)/edit$', 'edit', name='edit_book'),
)

from django.shortcuts import render_to_response, redirect
from users.forms import  UserForm
from django.contrib.auth import authenticate, login
from django.template import RequestContext
from books.models import Book, Bookpile
from django.contrib import auth
from django.contrib.auth.models import User

def register(request):    
    if request.method == 'POST':
        msj = {}
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)
        confirmation = request.POST.get('Confirmar', None)
        if  password==confirmation:
            form = UserForm(request.POST)
            existente=User.objects.filter(username=username)
            if not existente:
                if form.is_valid():
                    user = User.objects.create_user(username =username, email='None', password = password)
                    user.save()
                    return redirect('show_books')
            else:
                request.session['username']=username
                msj['msj'] = '<center>The username already exists</center>'
                msj['id']='error'
                return render_to_response('register.html', {'form':form, 'msj':msj}, context_instance = RequestContext(request))  
        else:
            return render_to_response('register.html', {'form':form}, context_instance = RequestContext(request))  
           
    return render_to_response('register.html', context_instance = RequestContext(request))
    
def show_bookpile(request, u_name):
    username_p = u_name + '\'' if u_name[-1] == 's' else u_name + '\'s'
    readbooks = Bookpile.objects.filter(user__username=u_name, already_read=True)
    notreadbooks = Bookpile.objects.filter(user__username=u_name, already_read=False)
    u = request.user 
    own_bookpile = False
    last_read_book = None
    if u.is_authenticated() and u.username == unicode(u_name):
        own_bookpile = True
        if request.COOKIES.has_key('last_read'):
            last_read = request.COOKIES['last_read']
            have_read_book = Book.objects.filter(pk=last_read)
            last_read_book = have_read_book[0] if have_read_book else None
    return render_to_response('show_bookpile.html', {'own_bookpile':own_bookpile,'username_p': username_p, 'readbooks': readbooks, 'notreadbooks': notreadbooks, 'last_read_book': last_read_book}, context_instance = RequestContext(request))

def login(request):
    if request.method == 'POST':
        username = request.POST.get('usuario', None)
        password = request.POST.get('clave', None)
        user = authenticate(username=username, password=password)
        msj = {}
        if user is not None and user.is_active:
            request.session['username']=username
            auth.login(request, user)
            return redirect('show_books')
        else:
            books = Book.objects.all()
            msj['msj'] = '<center>The username or the password is not correct</center>'
            msj['id']='error'
            return render_to_response('all_books.html', {'msj':msj, 'books':sorted(books, key=lambda x: x.get_average(), reverse=True)}, context_instance = RequestContext(request))
            
def logout(request):
    auth.logout(request)
    try:
        del request.session['username']
    except KeyError:
        pass
    return redirect("home")           

    

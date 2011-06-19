from django.shortcuts import render_to_response, get_object_or_404, redirect, HttpResponse
from books.models import Book, Bookpile
from books.forms import BookForm
from django.template import RequestContext
from django.contrib.auth.decorators import login_required

# Create your views here.
def list_all(request):
    if request.method == 'POST':
        form = BookForm(request.POST)
        if form.is_valid():
            book = form.save()
            return redirect(book)
        else:
            return render_to_response('create_book.html', {'form':form}, context_instance = RequestContext(request))
            
    books = Book.objects.all()
    
    #sorted(submissions, key = lambda x: x.calculate_popularity(), reverse=True)
    return render_to_response('all_books.html', {'books':sorted(books, key=lambda x: x.get_average(), reverse=True)}, context_instance =  RequestContext(request))

@login_required        
def create(request):
    return render_to_response('create_book.html', {'form':BookForm()}, context_instance =  RequestContext(request))
    
def show(request, b_id):
    book = get_object_or_404(Book, pk=b_id)
    cant_stars = 0
    u = request.user
    star_vote = str('0')
    already_voted=False
    already_read = False
    users_read = Bookpile.objects.filter(book=book)
    bookpile = None
    if u.is_authenticated():
        bookpile = users_read.filter(user=u)
        if bookpile:
            b =Bookpile.objects.get(user=u, book=book)
            star_vote = b.votes
            already_voted = b.already_voted
            already_read = b.already_read
            cant_stars=int(star_vote)
            
    return render_to_response('show_book.html',
                              {'inbookpile':True if bookpile else False,
                              'book':book, 
                              'users_read':users_read,
                              'stars': Bookpile.STAR_CHOICES, 
                              'star_vote': star_vote, 
                              'already_voted': already_voted, 
                              'already_read':already_read, 
                              'no_summary':bool(book.summary),
                              'cantidad':cant_stars,
                              'listaestrellitas':range(cant_stars)},
                              context_instance = RequestContext(request))

@login_required
def edit(request, b_id):
    book = get_object_or_404(Book, pk=b_id)
    
    if request.method == 'POST':
        form = BookForm(request.POST, instance=book)
        if form.is_valid():
            b=form.save()
            return redirect('show_books')
        else:
            return render_to_response('edit_book.html',{'form':form, 'book':book}, context_instance = RequestContext(request))
            
    return render_to_response('edit_book.html',{'form':BookForm(instance=book), 'book':book}, context_instance = RequestContext(request))
    
@login_required    
def add(request, b_id, read):
    u = request.user
    b = get_object_or_404(Book, pk=b_id)
    bookpile = Bookpile(book = b, user = u, already_read = read)
    bookpile.save()
    response = redirect(bookpile, u.username)
    response.set_cookie('last_read', b_id)
    return response

@login_required    
def change(request, b_id):
    u = request.user
    b = get_object_or_404(Book, pk=b_id)
    bookpile = Bookpile.objects.get(book = b, user = u)
    bookpile.save_read_book()
    response = redirect(bookpile, u.username)
    response.set_cookie('last_read', b_id)
    return response

@login_required    
def vote(request, b_id):
    book = get_object_or_404(Book, pk=b_id)
    bookpile = get_object_or_404(Bookpile, user=request.user, book=book)
    stars = request.GET.get('votes')
    bookpile.save_vote(str(stars))
    return redirect('show_bookpile', request.user.username)

@login_required    
def delete(request, b_id):
    u = request.user
    b = get_object_or_404(Book, pk=b_id)
    bookpile = Bookpile.objects.get(book = b, user = u)
    bookpile.delete()
    return redirect(bookpile, u.username)

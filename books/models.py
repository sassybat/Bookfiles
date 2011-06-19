from __future__ import division
from django.db import models
from django.contrib.auth.models import User

# Create your models here.    
class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=50)
    summary = models.TextField(blank=True, default="")
    total_votes = models.IntegerField(default=0)
    total_users = models.IntegerField(default=0)
    already_voted = models.BooleanField(default=False)
    
    def get_average(self):
        return self.total_votes/self.total_users if self.already_voted and self.total_users else 0
        
    @models.permalink
    def get_absolute_url(self):
        return ('show_book', [self.pk])
            
    def __unicode__(self):
        return self.title   
    
    class Meta:
        unique_together = ('title', 'author')     

class Bookpile(models.Model):
    STAR_CHOICES = (
        ('0', '0 stars'),
        ('1', '1 star'),
        ('2', '2 stars'),
        ('3', '3 stars'),
        ('4', '4 stars'),
        ('5', '5 stars'),
    )

    book = models.ForeignKey(Book)
    user = models.ForeignKey(User)
    votes = models.CharField(max_length=1, choices=STAR_CHOICES, default='0')
    already_read = models.BooleanField(default=False)
    already_voted = models.BooleanField(default=False)
    
    def get_vote(self):
        return int(self.votes)
    
    def __unicode__(self):
        return self.user.username
        
    def save_vote(self, stars):
        if self.already_voted:
            self.book.total_votes -= int(self.votes)
        else:
            self.book.total_users += 1
            self.already_voted = True
            self.book.already_voted = True
        self.votes = stars
        self.book.total_votes += int(stars)
        self.book.save()
        self.save()
    
    def save_read_book(self):
        self.already_read = True    
        self.save()
        
    def delete(self):
        self.book.total_votes -= int(self.votes)
        self.book.total_users -= 1
        if self.book.total_users == 0:
            self.book.already_voted = False
        self.book.save()
        super(Bookpile, self).delete()
        
    def save(self):
        self.book.save()
        super(Bookpile, self).save()
    
    @models.permalink    
    def get_absolute_url(self):
        return ('show_bookpile', [self.user.username])
        
    class Meta:
        unique_together = ('book', 'user')
        ordering = ['-votes']

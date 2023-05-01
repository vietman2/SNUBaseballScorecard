from django.contrib import admin

from .models import User


admin.site.site_header = 'SNUBaseballScorecard Admin'
admin.site.site_title = 'SNUBaseballScorecard Admin'
admin.site.index_title = 'SNUBaseballScorecard Admin'

admin.site.register(User)
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import JsonResponse, HttpResponse
from django.db.models import Count, Q
from django.utils import timezone
from datetime import datetime, timedelta
import json
from .models import *
from .forms import *

def home(request):
    context = {
        'jobs': Job.objects.filter(is_active=True)[:6],
        'companies': Company.objects.all()[:6],
    }
    return render(request, 'home.html', context)

def is_superuser(user):
    return user.is_superuser

@login_required
@user_passes_test(is_superuser)
def superadmin_dashboard(request):
    # Get basic counts
    total_companies = Company.objects.count()
    total_recruiters = User.objects.filter(is_recruiter=True).count()
    total_candidates = User.objects.filter(is_candidate=True).count()
    total_jobs = Job.objects.count()
    
    # Get registration data for the last 30 days
    end_date = timezone.now()
    start_date = end_date - timedelta(days=30)
    
    registration_labels = []
    registration_data = []
    
    for i in range(30):
        date = start_date + timedelta(days=i)
        label = date.strftime('%m/%d')
        count = User.objects.filter(
            date_joined__date=date.date()
        ).count()
        registration_labels.append(label)
        registration_data.append(count)
    
    # Get application data for the last 7 days
    application_labels = []
    application_data = []
    
    for i in range(7):
        date = end_date - timedelta(days=6-i)
        label = date.strftime('%m/%d')
        # Assuming you have an Application model
        try:
            count = Application.objects.filter(
                applied_date__date=date.date()
            ).count()
        except:
            count = 0
        application_labels.append(label)
        application_data.append(count)
    
    # Get companies with additional stats
    companies = Company.objects.annotate(
        recruiters_count=Count('user', filter=Q(user__is_recruiter=True)),
        active_jobs=Count('job', filter=Q(job__is_active=True)),
        total_applications=Count('job__application')
    )[:10]
    
    context = {
        'total_companies': total_companies,
        'total_recruiters': total_recruiters,
        'total_candidates': total_candidates,
        'total_jobs': total_jobs,
        'registration_labels': json.dumps(registration_labels),
        'registration_data': json.dumps(registration_data),
        'application_labels': json.dumps(application_labels),
        'application_data': json.dumps(application_data),
        'companies': companies,
    }
    
    return render(request, 'superadmin/dashboard.html', context)

# Your existing views continue here...
def about(request):
    return render(request, 'about.html')

def contact(request):
    return render(request, 'contact.html')

def jobs(request):
    jobs = Job.objects.filter(is_active=True)
    context = {'jobs': jobs}
    return render(request, 'jobs.html', context)

def job_detail(request, pk):
    job = get_object_or_404(Job, pk=pk)
    context = {'job': job}
    return render(request, 'job_detail.html', context)

def companies(request):
    companies = Company.objects.all()
    context = {'companies': companies}
    return render(request, 'companies.html', context)

def company_detail(request, pk):
    company = get_object_or_404(Company, pk=pk)
    jobs = Job.objects.filter(company=company, is_active=True)
    context = {'company': company, 'jobs': jobs}
    return render(request, 'company_detail.html', context)

@login_required
def dashboard(request):
    if request.user.is_superuser:
        return redirect('superadmin_dashboard')
    elif request.user.is_recruiter:
        return render(request, 'recruiter_dashboard.html')
    else:
        return render(request, 'candidate_dashboard.html')

def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.error(request, 'Invalid credentials')
    return render(request, 'registration/login.html')

def user_logout(request):
    logout(request)
    return redirect('home')

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            messages.success(request, 'Account created successfully')
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'registration/register.html', {'form': form})
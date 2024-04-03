from django.shortcuts import render, redirect
from .forms import *
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import login_required
from .models import Medication, Order,UserProfile
from django.core.exceptions import ObjectDoesNotExist
from .serializers import *
from rest_framework import generics
from .serializers import MedicationSerializer,UserLoginSerializer,UserRegistrationSerializer, UserProfileSerializer,OrderSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.middleware.csrf import get_token
from django.contrib.auth import get_user_model

def csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})


def Index(request):
    return render(request, 'index.html')



def Home(request):
    user = request.user
    medications = Medication.objects.all()
    orders = Order.objects.all()
    
    # Serialize data
    medication_serializer = MedicationSerializer(medications, many=True)
    order_serializer = OrderSerializer(orders, many=True)
    
    # Pass data to template context
    context = {
        'medications': medications,
        'orders': orders,
        'user': user,
        'session': request.session.session_key
    }
    
    return render(request, 'home.html', context)


@api_view(['GET'])
def homeApi(request):
    user = request.user
    medications = Medication.objects.all()
    orders = Order.objects.all()
    
    # Serialize data
    medication_serializer = MedicationSerializer(medications, many=True)
    order_serializer = OrderSerializer(orders, many=True)
    
    # Prepare response data
    data = {
        'medications': medication_serializer.data,
        'orders': order_serializer.data,
        'user': user.email,
        'session': request.session.session_key
    }
    
    return Response(data)


class UserProfileListView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer



def PatientHome(request):
    user = request.user
    return render(request, 'patient_home.html', {'user': user})

def UsersView(request):
    users = UserProfile.objects.filter(role='patient')
    return render(request, 'users.html', {'users': users})

def OrdersView(request):
    orders = Order.objects.all()
    return render(request, 'orders.html', {'orders': orders})

def InvoicesView(request):
    invoices = Invoice.objects.all()
    return render(request, 'invoices.html', {'invoices': invoices})


def RegisterView(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST, request.FILES)
        if form.is_valid():
            password = form.cleaned_data['password']

            user = UserProfile.objects.create_user(
                email=form.cleaned_data['email'],
                password=password,  
                first_name=form.cleaned_data['first_name'],
                last_name=form.cleaned_data['last_name'],
                role=form.cleaned_data['role'],
            )

            if user:
                return redirect('admin_login')
    else:
        form = UserRegistrationForm()

    return render(request, 'register.html', {'form': form})


@api_view(['POST'])
def registerApi(request):
    if request.method == 'POST':
        serializer = PatientRegistrationSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    print(serializer.errors)


def AddPatientView(request):
    if request.method == 'POST':
        form = PatientRegistrationForm(request.POST, request.FILES)
        if form.is_valid():
            password = form.cleaned_data['password']

            user = UserProfile.objects.create_user(
                email=form.cleaned_data['email'],
                password=password,
                first_name=form.cleaned_data['first_name'],
                last_name=form.cleaned_data['last_name'],
                role=form.cleaned_data['role'],
            )

            if user:
                return redirect('login')
    else:
        form = PatientRegistrationForm()

    return render(request, 'patient_register.html', {'form': form})


@api_view(['POST'])
def PatientRegisterView(request):
    if request.method == 'POST':
        serializer = PatientRegistrationSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            user = serializer.save()

            if user:
                return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    print(serializer.errors)



@api_view(['POST'])
def LoginView(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        # username = serializer.validated_data.get('username')
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')

        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)
            # Check the user's role and redirect accordingly
            if user.role == 'admin':
                return Response({'redirect_url': '/api/admin/home/'}, status=status.HTTP_200_OK)
            else:
                return Response({'redirect_url': '/patient/home/'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def AdminLoginView(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)

            # Check the user's role and redirect accordingly
            if user.role == 'admin':
                return redirect('home')
            elif user.role == 'patient':
                return redirect('patient')
            else:
                return render(request, 'login.html', {'form': form, 'error': 'Invalid credentials'})
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})




@api_view(['GET'])
def user_profile(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


    
@api_view(['GET', 'POST'])
def medication_list(request):
    if request.method == 'GET':
        medications = Medication.objects.all()
        serializer = MedicationSerializer(medications, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = MedicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET', 'POST'])
def medication_details(request, medication_id):
    if request.method == 'GET':
        try:
            medication = Medication.objects.get(pk=medication_id)
            serializer = MedicationSerializer(medication)
            return Response(serializer.data)
        except Medication.DoesNotExist:
            return Response({"error": "Medication does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'POST':
        try:
            medication_instance = Medication.objects.get(id=medication_id)
            
            # Get the quantity from the request body
            quantity = request.data.get('quantity')
            totalPrice = request.data.get('totalPrice')
            print('Quantity:', quantity)
            
            # Create the order
            order = Order.objects.create(
                medication=medication_instance,
                user=request.user,
                quantity=quantity, 
                totalPrice=totalPrice
            )
            print('Order:', order)
            
            

            total_amount = totalPrice
            print('Total Amount:', total_amount)

            
            # Create invoice
            invoice = Invoice.objects.create(order=order, total_amount=total_amount)
            invoice_serializer = InvoiceSerializer(invoice)

            data = {
                'order': OrderSerializer(order).data,
                'invoice': invoice_serializer.data
            }
            
            return Response(data, status=status.HTTP_201_CREATED)
        except Medication.DoesNotExist:
            error_message = f"Medication with ID '{medication_id}' not found."
            return JsonResponse({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print('Error:', e)  # Log the error
            return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    
    # elif request.method == 'POST':
    #     try:
    #         medication_id = medication_id
    #         medication_instance = Medication.objects.get(id=medication_id)
    #         order = Order.objects.create(medication=medication_instance, user=request.user)
    #         serializer = OrderSerializer(order)
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    #     except Medication.DoesNotExist:
    #         error_message = f"Medication with ID '{medication_id}' not found."
    #         return JsonResponse({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        
    #     except Exception as e:
    #         return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        

def MedicationsView(request):
    if request.method == 'GET':
        medications = Medication.objects.all()
        form = MedicationForm()
        return render(request, 'medications.html', {'medications': medications, 'form': form})
    elif request.method == 'POST':
        form = MedicationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('medication_list') 
        else:
            medications = Medication.objects.all()
            return render(request, 'medications.html', {'medications': medications, 'form': form})

@api_view(['GET', 'POST'])
def order_list(request):
    if request.method == 'GET':
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return HttpResponse(serializer.data)
    elif request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

def LogoutView(request):
    logout(request)
    return redirect('index')

class LogoutAPI(APIView):
    def get(self, request):
        logout(request)
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)

    
@csrf_exempt
@api_view(['POST'])
def submit_orderApi(request):
    if request.method == 'POST':
        try:
            medication_id = request.data.get('medication')
            quantity = request.data.get('quantity') 
            totalPrice = request.data.get('totalPrice')

            if not medication_id or not quantity:
                raise ValueError("These fields are required")

            medication_instance = Medication.objects.get(id=medication_id)
            # save
            # order = Order.objects.create(
            #     medication=medication_instance,
            #     user=request.user,
            #     quantity=quantity,
            # )
            # Create the order
            order = Order.objects.create(
                medication=medication_instance,
                user=request.user,
                quantity=quantity, 
                totalPrice=totalPrice
            )
            print('Order:', order)

            # Serialize the order instance
            # Create invoice
            invoice = Invoice.objects.create(order=order, total_amount=total_amount)
            invoice_serializer = InvoiceSerializer(invoice)

            data = {
                'order': OrderSerializer(order).data,
                'invoice': invoice_serializer.data
            }
            
            return Response(data, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            error_message = f"Medication with ID '{medication_id}' not found."
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
@login_required
def add_medication(request):
    if request.method == 'POST':
        form = MedicationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home') 
    else:
        form = MedicationForm()
    return render(request, 'add_medication.html', {'form': form})



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_orders(request):
    orders = Order.objects.filter(user=request.user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def generate_invoice(request, order_id):
    if request.method == 'POST':
        try:
            order = get_object_or_404(Order, id=order_id)
            
            # Calculate total amount based on order details, you need to implement this
            total_amount = calculate_total_amount(order)

            # Create the invoice
            invoice = Invoice.objects.create(order=order, total_amount=total_amount)

            # Serialize the invoice instance
            serializer = InvoiceSerializer(invoice)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Order.DoesNotExist:
            return Response({"error": f"Order with ID '{order_id}' not found."}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

def calculate_total_amount(order):
    total_amount = sum(item.medication.price * item.quantity for item in order.order_items.all())
    return total_amount

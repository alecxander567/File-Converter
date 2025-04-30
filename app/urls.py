from django.urls import path
from . import views

urlpatterns = [
    path('', views.main, name='main'),
    path('main/', views.main, name='main'),
    path('convert-docx-to-pdf/', views.convert_to_pdf, name='convert_to_pdf'),
    path('convert-pdf-to-docx/', views.convert_to_docx, name='convert_to_docx'),
    path('convert-docx-to-txt/', views.convert_to_txt, name='convert_to_txt'),
    path('convert-txt-to-pdf/', views.convert_txt_to_pdf, name='convert_txt_to_pdf'),
    path('convert-txt-to-docx/', views.convert_txt_to_docx, name='convert_txt_to_docx'),
    path('convert-pdf-to-txt/', views.convert_pdf_to_txt, name='convert_pdf_to_txt'),
    path('convert-pdf-to-img/', views.convert_pdf_to_images, name='convert_pdf_to_img'),
    path('upload-images-to-pdf/', views.upload_images_to_pdf, name='upload_jmages_to_pdf'),
    path('convert-pptx-to-pdf/', views.convert_pptx_to_pdf, name='comvert_pptx_to_pdf'),
    path('convert-xlsx-to-pdf/', views.convert_xlsx_to_pdf, name='convert_xlsx_to_pdf'),
]
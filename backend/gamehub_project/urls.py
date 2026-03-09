from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')),

    # ============================================================
    # API Documentation
    # /api/schema/  → Download raw OpenAPI 3.0 YAML schema
    # /api/docs/    → Swagger UI (interactive playground)
    # /api/redoc/   → Redoc (clean, readable reference docs)
    # ============================================================
    path('api/schema/', SpectacularAPIView.as_view(), name='api-schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='api-schema'), name='api-swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='api-schema'), name='api-redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])

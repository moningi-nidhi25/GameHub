import os

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'APP': {
            'client_id': os.getenv("GOOGLE_CLIENT_ID"),
            'secret': os.getenv("GOOGLE_CLIENT_SECRET"),
        }
    }
}

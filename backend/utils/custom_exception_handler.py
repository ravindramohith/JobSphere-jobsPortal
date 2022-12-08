from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    exception_class = exc.__class__.__name__
    if exception_class == "AuthenticationFailed":
        response.data = {"error": "Invalid Credentials.Please try again."}
    elif exception_class == "NotAuthenticated":
        response.data = {"error": "Login first to access the resource."}
    elif exception_class == "InvalidToken":
        response.data = {"error": "Your Session has expired. Please login again."}
    return response

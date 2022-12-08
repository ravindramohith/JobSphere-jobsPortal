import os


def validate_file_extension(name):
    isValid = True
    extension = os.path.splitext(name)[1]
    validate_file_extensions = [".pdf"]

    if not extension.lower() in validate_file_extensions:
        isValid = False

    return isValid

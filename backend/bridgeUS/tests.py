from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import Review, Comment

import json


class BlogTestCase(TestCase):
    def test_csrf(self):
        pass


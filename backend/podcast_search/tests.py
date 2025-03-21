from django.test import TestCase
from .models import Podcast

# Create your tests here.
class ChuckleSandwichTest(TestCase):
    def setUp(self):
        Podcast.objects.create(
            title="Chuckle Sandwich",
            transcript="some transcript",
            description="Chuckle Sandwich was a comedy podcast hosted by Ted Nivison, jschlatt, Slimecicle, and Tucker Keane",
            is_featured=True,
            category="comedy"
            )

    def test_texts(self):
        podcast = Podcast.objects.get(title="Chuckle Sandwich")
        self.assertEqual(podcast.transcript, "some transcript")
        self.assertEqual(podcast.description, "Chuckle Sandwich was a comedy podcast hosted by Ted Nivison, jschlatt, Slimecicle, and Tucker Keane")
        self.assertEqual(podcast.category, "comedy")
        self.assertEqual(podcast.is_featured, True)
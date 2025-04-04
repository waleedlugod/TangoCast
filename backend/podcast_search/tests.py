from django.test import TestCase, override_settings, Client
from django.core.files.uploadedfile import SimpleUploadedFile
from .models import Podcast
import shutil
from django.conf import settings


# Create your tests here.
class ChuckleSandwichTest(TestCase):
    @override_settings(MEDIA_ROOT=(settings.TEST_DIR + "/media"))
    def setUp(self):
        Podcast.objects.create(
            title="Chuckle Sandwich",
            transcript="some transcript",
            description="Chuckle Sandwich was a comedy podcast hosted by Ted Nivison, jschlatt, Slimecicle, and Tucker Keane",
            audio = SimpleUploadedFile(name="Episode_1.mp3", content=b"this is some audio", content_type="audio/mpeg"),
            video = SimpleUploadedFile(name="Episode_1.mp4", content=b"this is some video", content_type="video/mp4"),
            thumbnail = SimpleUploadedFile(name="Episode_1.png", content=b"this is some thumbnail", content_type="image/png"),
            is_featured=True,
            category="comedy"
            )

    def test_api_texts(self):
        c = Client()
        podcasts = c.get("/search/").json()
        self.assertEqual(len(podcasts) , 1)

        podcast = podcasts[0]
        self.assertEqual(podcast["transcript"], "some transcript")
        self.assertEqual(podcast["description"], "Chuckle Sandwich was a comedy podcast hosted by Ted Nivison, jschlatt, Slimecicle, and Tucker Keane")
        self.assertEqual(podcast["category"], "comedy")
        self.assertEqual(podcast["is_featured"], True)
        self.assertTrue(podcast["is_featured"])

    def tearDown(self):
        shutil.rmtree(settings.TEST_DIR, ignore_errors=True)

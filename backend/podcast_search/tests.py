from django.test import TestCase, override_settings
from django.core.files.uploadedfile import SimpleUploadedFile
from .models import Podcast
import shutil

TEST_DIR = "test_data"

# Create your tests here.
class ChuckleSandwichTest(TestCase):
    @override_settings(MEDIA_ROOT=(TEST_DIR + "/media"))
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

    def test_texts(self):
        podcast = Podcast.objects.get(title="Chuckle Sandwich")
        self.assertEqual(podcast.transcript, "some transcript")
        self.assertEqual(podcast.description, "Chuckle Sandwich was a comedy podcast hosted by Ted Nivison, jschlatt, Slimecicle, and Tucker Keane")
        self.assertEqual(podcast.category, "comedy")
        self.assertEqual(podcast.is_featured, True)
        self.assertEqual(podcast.audio.name, "audios/Episode_1.mp3")
        self.assertEqual(podcast.video.name, "videos/Episode_1.mp4")
        self.assertEqual(podcast.thumbnail.name, "photos/Episode_1.png")
        self.assertTrue(podcast.is_featured)

    def tearDown(self):
        shutil.rmtree(TEST_DIR, ignore_errors=True)
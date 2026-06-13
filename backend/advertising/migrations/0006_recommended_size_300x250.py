from django.db import migrations

# The category ad boxes now render as 300×250 medium rectangles (two side by
# side) instead of the old 728×90 leaderboard strip. Update existing slots that
# still carry the old recommended size so the Advertise page shows the new one.
OLD = '728×90'
NEW = '300×250'


def forwards(apps, schema_editor):
    AdSlot = apps.get_model('advertising', 'AdSlot')
    AdSlot.objects.filter(recommended_size=OLD).update(recommended_size=NEW)


def backwards(apps, schema_editor):
    AdSlot = apps.get_model('advertising', 'AdSlot')
    AdSlot.objects.filter(recommended_size=NEW).update(recommended_size=OLD)


class Migration(migrations.Migration):

    dependencies = [
        ('advertising', '0005_advertisement_dodo_session_id'),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]

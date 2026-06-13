from django.db import migrations

# The category ad boxes render as 636×212 (3:1) banners, two side by side. The
# 636px upload is shown at roughly half width (~330px) so it stays retina-sharp.
# Move slots off the interim 300×250 (and any stragglers on the old 728×90).
NEW = '636×212'
OLD_SIZES = ['728×90', '300×250']


def forwards(apps, schema_editor):
    AdSlot = apps.get_model('advertising', 'AdSlot')
    AdSlot.objects.filter(recommended_size__in=OLD_SIZES).update(recommended_size=NEW)


def backwards(apps, schema_editor):
    AdSlot = apps.get_model('advertising', 'AdSlot')
    AdSlot.objects.filter(recommended_size=NEW).update(recommended_size='300×250')


class Migration(migrations.Migration):

    dependencies = [
        ('advertising', '0006_recommended_size_300x250'),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]

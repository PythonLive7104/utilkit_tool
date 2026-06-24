from django.db import migrations

# Tool-page ad rows now render three banners across (Nairaland-style) in a ~2:1
# box that's taller than the old 3:1 strip, so compact creatives stay legible.
# Switch the recommended upload to 600×300 (2:1) and let each slot sell three
# spots so a full row can be three real adverts.
NEW_SIZE = '600×300'
OLD_SIZE = '636×212'
NEW_CAPACITY = 3
OLD_CAPACITY = 2


def forwards(apps, schema_editor):
    AdSlot = apps.get_model('advertising', 'AdSlot')
    AdSlot.objects.filter(recommended_size=OLD_SIZE).update(recommended_size=NEW_SIZE)
    # Only widen capacity for slots still on the old default; leave any slot an
    # admin has hand-tuned alone.
    AdSlot.objects.filter(capacity=OLD_CAPACITY).update(capacity=NEW_CAPACITY)
    AdSlot.objects.filter(capacity=1).update(capacity=NEW_CAPACITY)


def backwards(apps, schema_editor):
    AdSlot = apps.get_model('advertising', 'AdSlot')
    AdSlot.objects.filter(recommended_size=NEW_SIZE).update(recommended_size=OLD_SIZE)
    AdSlot.objects.filter(capacity=NEW_CAPACITY).update(capacity=OLD_CAPACITY)


class Migration(migrations.Migration):

    dependencies = [
        ('advertising', '0011_remove_adslot_dodo_monthly_product_id_and_more'),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]

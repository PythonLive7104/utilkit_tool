from django.db import migrations

# (Superseded by 0013.) This briefly switched the ad boxes to a 3-across 2:1
# layout: recommended upload 600×300 and three sellable spots per slot. It's
# kept only so migration history stays consistent on environments that already
# applied it; 0013 reverts the values for the final full-width 3:1 layout.
NEW_SIZE = '600×300'
OLD_SIZE = '636×212'
NEW_CAPACITY = 3


def forwards(apps, schema_editor):
    AdSlot = apps.get_model('advertising', 'AdSlot')
    AdSlot.objects.filter(recommended_size=OLD_SIZE).update(recommended_size=NEW_SIZE)
    AdSlot.objects.filter(capacity__in=[1, 2]).update(capacity=NEW_CAPACITY)


def backwards(apps, schema_editor):
    AdSlot = apps.get_model('advertising', 'AdSlot')
    AdSlot.objects.filter(recommended_size=NEW_SIZE).update(recommended_size=OLD_SIZE)
    AdSlot.objects.filter(capacity=NEW_CAPACITY).update(capacity=2)


class Migration(migrations.Migration):

    dependencies = [
        ('advertising', '0011_remove_adslot_dodo_monthly_product_id_and_more'),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]

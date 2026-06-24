from django.db import migrations

# Final layout: one full-width 3:1 banner per row. Recommend a 3:1 upload again
# (636×212) so creatives fill the box without cropping, and cap each slot at two
# spots — the layout shows one banner in the top row and one in the bottom, so a
# third sold spot would never be displayed. Reverts 0012's interim 2:1 values.
SIZE_3_1 = '636×212'
SIZE_2_1 = '600×300'
CAPACITY = 2


def forwards(apps, schema_editor):
    AdSlot = apps.get_model('advertising', 'AdSlot')
    AdSlot.objects.filter(recommended_size=SIZE_2_1).update(recommended_size=SIZE_3_1)
    AdSlot.objects.filter(capacity__gt=CAPACITY).update(capacity=CAPACITY)


def backwards(apps, schema_editor):
    AdSlot = apps.get_model('advertising', 'AdSlot')
    AdSlot.objects.filter(recommended_size=SIZE_3_1).update(recommended_size=SIZE_2_1)
    AdSlot.objects.filter(capacity=CAPACITY).update(capacity=3)


class Migration(migrations.Migration):

    dependencies = [
        ('advertising', '0012_recommended_size_600x300_capacity_3'),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]

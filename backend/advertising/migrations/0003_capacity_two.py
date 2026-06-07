from django.db import migrations

# Each category page now shows two banners side by side, so two different
# advertisers can run in the same category at once.
CATEGORY_CODES = ['ai', 'pdf', 'image', 'generator', 'developer', 'text', 'calculator', 'viral']


def set_capacity_two(apps, schema_editor):
    AdSlot = apps.get_model('advertising', 'AdSlot')
    AdSlot.objects.filter(code__in=CATEGORY_CODES, capacity__lt=2).update(capacity=2)


def set_capacity_one(apps, schema_editor):
    AdSlot = apps.get_model('advertising', 'AdSlot')
    AdSlot.objects.filter(code__in=CATEGORY_CODES).update(capacity=1)


class Migration(migrations.Migration):

    dependencies = [
        ('advertising', '0002_seed_slots'),
    ]

    operations = [
        migrations.RunPython(set_capacity_two, set_capacity_one),
    ]

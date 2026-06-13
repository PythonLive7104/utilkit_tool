from django.db import migrations

# One bookable slot per tool category. The slot ``code`` matches the category
# id used by the frontend (see frontend/src/data/tools.js), so an advert booked
# for e.g. 'pdf' shows on all PDF tool pages. Capacity 1 = one advertiser per
# category at a time; the other categories stay open for other advertisers.
CATEGORY_SLOTS = [
    ('ai',         'AI Tools'),
    ('pdf',        'PDF Tools'),
    ('image',      'Image Tools'),
    ('generator',  'Generator Tools'),
    ('developer',  'Developer Tools'),
    ('text',       'Text Tools'),
    ('calculator', 'Calculators'),
    ('viral',      'Viral Tools'),
]

WEEKLY_PRICE = 20  # USD per week; adjust per category in the admin.


def seed_slots(apps, schema_editor):
    AdSlot = apps.get_model('advertising', 'AdSlot')
    for code, name in CATEGORY_SLOTS:
        AdSlot.objects.update_or_create(
            code=code,
            defaults={
                'name': name,
                'description': f'Banner shown on all {name} pages.',
                'recommended_size': '636×212',
                'price_usd': WEEKLY_PRICE,
                'duration_days': 7,
                'capacity': 2,
                'is_active': True,
            },
        )


def unseed_slots(apps, schema_editor):
    AdSlot = apps.get_model('advertising', 'AdSlot')
    AdSlot.objects.filter(code__in=[c for c, _ in CATEGORY_SLOTS]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('advertising', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_slots, unseed_slots),
    ]

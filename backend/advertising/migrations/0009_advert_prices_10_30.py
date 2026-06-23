from django.db import migrations

# New flat pricing across every category slot: $10/week, $30/month (30 days).
# Per-slot overrides can still be set afterwards in the admin.
WEEKLY_PRICE = 10
MONTHLY_PRICE = 30


def set_prices(apps, schema_editor):
    AdSlot = apps.get_model('advertising', 'AdSlot')
    AdSlot.objects.all().update(
        price_usd=WEEKLY_PRICE,
        price_monthly_usd=MONTHLY_PRICE,
    )


def noop(apps, schema_editor):
    # No clean reverse — earlier prices varied per slot. Leave values in place.
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('advertising', '0008_adslot_dodo_monthly_product_id_and_more'),
    ]

    operations = [
        migrations.RunPython(set_prices, noop),
    ]

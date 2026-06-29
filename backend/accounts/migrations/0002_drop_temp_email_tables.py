from django.db import migrations


class Migration(migrations.Migration):
    """
    Teardown for the removed `temp_email` app.

    The disposable-email tool was removed from UtilKit (AdSense flagged disposable
    email as abuse-associated). The app, its routes, and its code are gone, so its
    tables are now orphaned. This migration drops them and cleans the migration
    history. It lives in `accounts` because `temp_email` is no longer an installed
    app and therefore can't own a migration of its own.

    Raw SQL keeps it portable across Postgres (production) and SQLite (dev):
    `DROP TABLE IF EXISTS` is supported by both, and we avoid CASCADE (unsupported
    by SQLite) by dropping the child table (FK holder) before its parent.
    """

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RunSQL(
            sql=[
                'DROP TABLE IF EXISTS temp_email_emailmessage;',
                'DROP TABLE IF EXISTS temp_email_tempemailaddress;',
                "DELETE FROM django_migrations WHERE app = 'temp_email';",
            ],
            reverse_sql=migrations.RunSQL.noop,
        ),
    ]
